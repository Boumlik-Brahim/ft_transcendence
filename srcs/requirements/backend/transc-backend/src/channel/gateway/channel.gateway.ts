/* eslint-disable prettier/prettier */
import { HttpException, Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChannelService } from '../channel.service';
import { Server, Socket } from 'socket.io';
import { CreateChannelDto } from '../dto/create-channel.dto';
import { CreateChannelMessageDto } from '../dto/create-channelMessage.dto';
import { CreateKickedMemberDto } from '../dto/create-kickedMember.dto';
import { ConnectedClientsService } from 'src/connected-clients.service';
import { createHash } from 'crypto';
import { PrismaService } from 'prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173/channels'
  },
})

export class ChannelGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly channelService: ChannelService,
    private readonly usersService: UsersService,
    private readonly connectedClientsService: ConnectedClientsService,
    private prisma: PrismaService) {}

  @WebSocketServer()
  server: Server;
 
  private logger: Logger = new Logger('Channel Gateway Log');

  afterInit(server: any) {
    this.logger.log('Channel Server Initialized!');
  }

  handleConnection(client: Socket) {
    this.connectedClientsService.addClient(client);
    this.logger.log(`Client connected to Channel server: ${client.id}`);
  }

  @SubscribeMessage('createChannel')
  async handleCreateChannel(@MessageBody() payload: CreateChannelDto, @ConnectedSocket() socket: Socket): Promise<void> {
    try{
      if(payload.channelPassword)
      {
        const hachedChannelPswd = createHash('sha256').update(payload.channelPassword).digest('hex');
        const channelProtected = await this.prisma.channel.create({ data: {
          channelName: payload.channelName,
          channelType: payload.channelType,
          channelPassword: hachedChannelPswd,
          channelOwnerId: payload.channelOwnerId
        }});
        await this.channelService.createChannelOwner(channelProtected.channelOwnerId, channelProtected.id);
        socket.join(channelProtected.id);
        this.server.to(channelProtected.id).emit('onMessage', `${socket.id} has create ${channelProtected.channelName}`);
      }else{
        const channel = await this.channelService.createChannel(payload);
        await this.channelService.createChannelOwner(channel.channelOwnerId, channel.id);
        socket.join(channel.id);
        this.server.to(channel.id).emit('onMessage', `${socket.id} has create channel: ${channel.channelName}`);
      }
    }catch(error){
      throw error;
    }
  }
  
  @SubscribeMessage('joinChannel')
  async joinChannel(@MessageBody() payload: { userId: string, channelId: string }, @ConnectedSocket() socket: Socket) : Promise<void> {
    try{
      const channel = await this.channelService.findOneChannel(payload.channelId);
      socket.join(channel.id);
    }catch(error){
      throw error;
    }
  }

  @SubscribeMessage('joinPublicChannel')
  async joinPublicChannel(@MessageBody() payload: { userId: string, channelId: string }, @ConnectedSocket() socket: Socket) : Promise<void> {
    try{
      const channel = await this.channelService.findOneChannel(payload.channelId);
      if (channel.channelType === 'PUBLIC'){
        await this.channelService.createChannelMember({"userId": payload.userId, "channelId": payload.channelId, "role": 'MEMBER'});
        const user = await this.usersService.findOne(payload.userId);
        socket.join(payload.channelId);
        this.server.to(payload.channelId).emit('onMessage', `${user.name} has joined channel: ${channel.channelName}`);
      }
      else{
        console.log(`Invalid channel`);
      }
    }catch(error){
      throw error;
    }
  }
  
  @SubscribeMessage('joinProtectedChannel')
  async joinProtectedChannel(@MessageBody() payload: { userId: string, channelId: string, channelPasword: string }, @ConnectedSocket() socket: Socket): Promise<void> {
    try{
      const hachedChannelPswd = createHash('sha256').update(payload.channelPasword).digest('hex');
      const channel = await this.channelService.findOneChannel(payload.channelId);
      if (channel.channelType === 'PROTECTED'){
        if (channel.channelPassword === hachedChannelPswd){
          await this.channelService.createChannelMember({"userId": payload.userId, "channelId": payload.channelId, "role": 'MEMBER'});
          const user = await this.usersService.findOne(payload.userId);
          socket.join(payload.channelId);
          this.server.to(payload.channelId).emit('onMessage', `${user.name} has joined channel: ${channel.channelName}`);
        }
        else{
          console.log(`Invalid password ${payload.channelPasword}`);
        }
      }
    }catch(error){
      throw error;
    }
  }
  
  @SubscribeMessage('joinPrivateChannel')
  async joinPrivateChannel(@MessageBody() payload: { userId: string, channelId: string}, @ConnectedSocket() socket: Socket): Promise<void> {
    try{
      const channel = await this.channelService.findOneChannel(payload.channelId);
      if (channel.channelType === 'PRIVATE'){
        await this.channelService.createChannelMember({"userId": payload.userId, "channelId": payload.channelId, "role": 'MEMBER'});
        const user = await this.usersService.findOne(payload.userId);
        socket.join(payload.channelId);
        this.server.to(payload.channelId).emit('onMessage', `${user.name} has joined channel: ${channel.channelName}`);
      }
      else{
        console.log(`Invalid channel`);
      }
    }catch(error){
      throw error;
    }
  }
  
  @SubscribeMessage('messageChannel')
  async handleMessage(@MessageBody() payload: CreateChannelMessageDto): Promise<void> {
    try{
      await this.channelService.createChannelMessage(payload);
      this.server.to(payload.channelId).emit('onMessage', payload);
    }catch(error){
      throw error;
    }
  }
  
  @SubscribeMessage('kickMember')
  async handleKickMember(@MessageBody() payload: CreateKickedMemberDto , @ConnectedSocket() socket: Socket): Promise<void> {
    try{
      const member = await this.channelService.findOneChannelMember(payload.channelId, payload.userId);
      if (member)
      {
        const channel = await this.channelService.findOneChannel(payload.channelId);
        const user = await this.usersService.findOne(payload.userId);
        await this.channelService.createKickedMember(payload);
        await this.channelService.removeChannelMember(payload.channelId, payload.userId);
        this.server.to(payload.channelId).emit('onMessage', `${user.name} is kicked from channel: ${channel.channelName}`);
      }
    }catch(error){
      throw error;
    }
  }

  @SubscribeMessage('createAdmin')
  async handleCreateAdmin(@MessageBody() payload: { channelId: string, memberId: string }, @ConnectedSocket() socket: Socket): Promise<void> {
    try{
      const member = await this.channelService.findOneChannelMember(payload.channelId, payload.memberId);
      if (member && member.role === 'MEMBER')
      {
        const channel = await this.channelService.findOneChannel(payload.channelId);
        const user = await this.usersService.findOne(payload.memberId);
        member.role = 'ADMIN';
        await this.channelService.updateChannelMember(payload.channelId, payload.memberId, member);
        this.server.to(payload.channelId).emit('onMessage', `${user.name} is an Admin of channel: ${payload.channelId}`);
      }
    }catch(error){
      throw error;
    }
  }

  @SubscribeMessage('createMember')
  async handleCreateMember(@MessageBody() payload: { channelId: string, memberId: string }, @ConnectedSocket() socket: Socket): Promise<void> {
    try{
      const member = await this.channelService.findOneChannelMember(payload.channelId, payload.memberId);
      if (member && member.role === 'ADMIN')
      {
        member.role = 'MEMBER';
        await this.channelService.updateChannelMember(payload.channelId, payload.memberId, member);
        this.server.to(payload.channelId).emit('onMessage', `${socket.id} is Admin of ${payload.channelId}`);
      }
    }catch(error){
      throw error;
    }
  }
  
  @SubscribeMessage('banMember')
  async handleBanMember(@MessageBody() payload: { channelId: string, memberId: string, bannedTime: string }, @ConnectedSocket() socket: Socket): Promise<void> {
    try{
      const member = await this.channelService.findOneChannelMember(payload.channelId, payload.memberId);
      if(member && (member.role === 'MEMBER' || member.role === 'ADMIN'))
      {
        await this.channelService.updateChannelMemberBannedTime(payload.channelId, payload.memberId, payload.bannedTime);
        this.server.to(payload.channelId).emit('onMessage', `${socket.id} is banned from ${payload.channelId}`);
      }
    }catch(error){
      throw error;
    }
  }

  @SubscribeMessage('muteMember')
  async handleMuteMember(@MessageBody() payload: { channelId: string, memberId: string, mutedTime: string }, @ConnectedSocket() socket: Socket): Promise<void> {
    try{
      const member = await this.channelService.findOneChannelMember(payload.channelId, payload.memberId);
      if(member && (member.role === 'MEMBER' || member.role === 'ADMIN'))
      {
        await this.channelService.updateChannelMemberMutedTime(payload.channelId, payload.memberId, payload.mutedTime);
        this.server.to(payload.channelId).emit('onMessage', `${socket.id} is muted from ${payload.channelId}`);
      }
    }catch(error){
      throw error;
    }
  }

  @SubscribeMessage('leaveChannel')
  async handleLeaveChannel(@MessageBody() payload: { channelId: string, memberId: string }, @ConnectedSocket() socket: Socket): Promise<void> {
    try{
      const member = await this.channelService.findOneChannelMember(payload.channelId, payload.memberId);
      if(member && (member.role === 'MEMBER' || member.role === 'ADMIN'))
      {
        await this.channelService.removeChannelMember(payload.channelId, payload.memberId);
        socket.leave(payload.channelId);
        this.server.to(payload.channelId).emit('onMessage', `${socket.id} has leaved the channel`);
      }
    }catch(error){
      throw error;
    }
  }

  @SubscribeMessage('removeChannel')
  async handleRemoveChannel(@MessageBody() payload: { channelId: string, memberId: string }, @ConnectedSocket() socket: Socket): Promise<void> {
    try{
      const member = await this.channelService.findOneChannelMember(payload.channelId, payload.memberId);
      if(member && member.role === 'OWNER')
      {
        const kickedMemebers = await this.channelService.findAllKickedMembers(payload.channelId);
        if(kickedMemebers){
          await this.channelService.removeAllKickedMembers(payload.channelId);
        }
        const channelMessages = await this.channelService.findAllChannelMessages(payload.channelId);
        if(channelMessages){
          await this.channelService.removeAllChannelMessages(payload.channelId);
        }
        await this.channelService.removeAllChannelMembers(payload.channelId);
        await this.channelService.removeChannel(payload.channelId);
      }
    }catch(error){
      throw error;
    }
  }

  handleDisconnect(client: Socket) {
    this.connectedClientsService.removeClient(client);
    this.logger.log(`Client disconnected from Channel server: ${client.id}`);
  }
}
