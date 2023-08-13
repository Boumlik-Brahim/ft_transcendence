import { Logger } from '@nestjs/common';
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
import { Cron, CronExpression } from '@nestjs/schedule';

@WebSocketGateway({
  namespace: 'channelGateway',
  cors: {
    origin: 'http://localhost:5173/channels',
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

  private clientId;

  //* ----------------------------------------------------------------Connection----------------------------------------------------------- *//
  afterInit(server: any) {
    this.logger.log('Channel Server Initialized!');
  }
  
  handleConnection(client: Socket) {
    this.clientId = client.id;
    this.logger.log(`Client connected to Channel server: ${client.id}`);
  }
  //* ----------------------------------------------------------------Connection----------------------------------------------------------- *//

  //* --------------------------------------------------------------CreateChannel---------------------------------------------------------- *//
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
      this.server.to(socket.id).emit('refrechCreateChannel');
    }catch(error){
      this.server.to(socket.id).emit('error', error);
    }
  }
  //* --------------------------------------------------------------CreateChannel---------------------------------------------------------- *//
  
  //* ---------------------------------------------------------------JoinChannel----------------------------------------------------------- *//
  @SubscribeMessage('joinChannel')
  async joinChannel(@MessageBody() payload: { userId: string, channelId: string, channelPasword: string }, @ConnectedSocket() socket: Socket) : Promise<void> {
    try{
      const channel = await this.channelService.findOneChannel(payload.channelId);
      const member = await this.prisma.channelMember.findUnique({
        where: {
          userAndChannel: {
            userId: payload.userId,
            channelId: payload.channelId
          },
        },
      });
      if (member){
        if (channel.channelType === 'PROTECTED' && payload.channelPasword){
          const hachedChannelPswd = createHash('sha256').update(payload.channelPasword).digest('hex');
          if (channel.channelPassword === hachedChannelPswd){
            socket.join(channel.id);
            this.server.to(socket.id).emit('joinedSuccessfully');
          }else{
            this.server.to(socket.id).emit('error', `Invalid password ${payload.channelPasword}`);
          }
        }else{
          socket.join(channel.id);
        }
      }else{
        const user = await this.usersService.findOne(payload.userId);
        if (channel.channelType === 'PUBLIC' || channel.channelType === 'PRIVATE'){
          await this.channelService.createChannelMember({"userId": payload.userId, "channelId": payload.channelId, "role": 'MEMBER'});
          socket.join(payload.channelId);
          this.server.to(payload.channelId).emit('onMessage', `${user.name} has joined channel: ${channel.channelName}`);
          this.server.to(socket.id).emit('refrechMember');
        }
        else if (channel.channelType === 'PROTECTED' && payload.channelPasword){
          console.log("channelpswd: ===> ", payload.channelPasword);
          const hachedChannelPswd = createHash('sha256').update(payload.channelPasword).digest('hex');
          if (channel.channelPassword === hachedChannelPswd){
            await this.channelService.createChannelMember({"userId": payload.userId, "channelId": payload.channelId, "role": 'MEMBER'});
            socket.join(payload.channelId);
            this.server.to(payload.channelId).emit('onMessage', `${user.name} has joined channel: ${channel.channelName}`);
            this.server.to(socket.id).emit('joinedSuccessfully');
            this.server.to(socket.id).emit('refrechMember');
          }else{
            this.server.to(socket.id).emit('error', `Invalid password ${payload.channelPasword}`);
          }
        }
      }
    }catch(error){
      this.server.to(socket.id).emit('error', error);
    }
  }
  //* ---------------------------------------------------------------JoinChannel----------------------------------------------------------- *//
  
  //* -------------------------------------------------------------ChannelMessage---------------------------------------------------------- *//
  @SubscribeMessage('messageChannel')
  async handleMessage(@MessageBody() payload: CreateChannelMessageDto, @ConnectedSocket() socket: Socket): Promise<void> {
    try{
      await this.channelService.createChannelMessage(payload);
      this.server.to(payload.channelId).emit('onMessage', payload);
    }catch(error){
      this.server.to(socket.id).emit('error', error);
    }
  }
  //* -------------------------------------------------------------ChannelMessage---------------------------------------------------------- *//
  
  //* --------------------------------------------------------------ChannelRoles---------------------------------------------------------- *//
  @SubscribeMessage('createAdmin')
  async handleCreateAdmin(@MessageBody() payload: { channelId: string, userId: string }, @ConnectedSocket() socket: Socket): Promise<void> {
    try{
      const member = await this.channelService.findOneChannelMember(payload.channelId, payload.userId);
      if (member && member.role === 'MEMBER')
      {
        const channel = await this.channelService.findOneChannel(payload.channelId);
        const user = await this.usersService.findOne(payload.userId);
        member.role = 'ADMIN';
        await this.channelService.updateChannelMember(payload.channelId, payload.userId, member);
        this.server.to(payload.channelId).emit('onMessage', `${user.name} is an Admin of channel: ${channel.channelName}`);
        this.server.to(socket.id).emit('refrechMember');
      }else{
        this.server.to(socket.id).emit('error', 'Is Not A Member');
      }
    }catch(error){
      this.server.to(socket.id).emit('error', error);
    }
  }
  
  @SubscribeMessage('createMember')
  async handleCreateMember(@MessageBody() payload: { channelId: string, userId: string }, @ConnectedSocket() socket: Socket): Promise<void> {
    try{
      const member = await this.channelService.findOneChannelMember(payload.channelId, payload.userId);
      if (member && member.role === 'ADMIN')
      {
        const channel = await this.channelService.findOneChannel(payload.channelId);
        const user = await this.usersService.findOne(payload.userId);
        member.role = 'MEMBER';
        await this.channelService.updateChannelMember(payload.channelId, payload.userId, member);
        this.server.to(payload.channelId).emit('onMessage', `${user.name} is become Memeber of ${channel.channelName}`);
        this.server.to(socket.id).emit('refrechMember');
      }else{
        this.server.to(socket.id).emit('error', 'Is Not An Admin');
      }
    }catch(error){
      this.server.to(socket.id).emit('error', error);
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
        this.server.to(socket.id).emit('refrechMember');
      }else{
        this.server.to(socket.id).emit('error', 'Invalid Member');
      }
    }catch(error){
      this.server.to(socket.id).emit('error', error);
    }
  }
  
  @SubscribeMessage('banMember')
  async handleBanMember(@MessageBody() payload: { channelId: string, userId: string, bannedTime: string }, @ConnectedSocket() socket: Socket): Promise<void> {
    try{
      const member = await this.channelService.findOneChannelMember(payload.channelId, payload.userId);
      if(member && (member.role === 'MEMBER' || member.role === 'ADMIN'))
      {
        const channel = await this.channelService.findOneChannel(payload.channelId);
        const user = await this.usersService.findOne(payload.userId);
        await this.channelService.updateChannelMemberBannedTime(payload.channelId, payload.userId, payload.bannedTime);
        this.server.to(payload.channelId).emit('onMessage', `${user.name} is banned from ${channel.channelName}`);
        this.server.to(socket.id).emit('refrechMember');
      }else{
        this.server.to(socket.id).emit('error', 'Invalid Member');
      }
    }catch(error){
      this.server.to(socket.id).emit('error', error);
    }
  }
  
  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleUnBanMember(): Promise<void> {
    const Count = await this.channelService.handleUnbanneMember();
    if (Count.count === 1){
      this.server.to(this.clientId).emit('refrechMember');
    }
  }
  
  @SubscribeMessage('muteMember')
  async handleMuteMember(@MessageBody() payload: { channelId: string, userId: string, mutedTime: string }, @ConnectedSocket() socket: Socket): Promise<void> {
    try{
      const member = await this.channelService.findOneChannelMember(payload.channelId, payload.userId);
      if(member && (member.role === 'MEMBER' || member.role === 'ADMIN'))
      {
        const channel = await this.channelService.findOneChannel(payload.channelId);
        const user = await this.usersService.findOne(payload.userId);
        await this.channelService.updateChannelMemberMutedTime(payload.channelId, payload.userId, payload.mutedTime);
        this.server.to(payload.channelId).emit('onMessage', `${user.name} is muted from ${channel.channelName}`);
        this.server.to(socket.id).emit('refrechMember');
      }else{
        this.server.to(socket.id).emit('error', 'Invalid Member');
      }
    }catch(error){
      this.server.to(socket.id).emit('error', error);
    }
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleUnMuteMember(): Promise<void> {
    const Count = await this.channelService.handleUnmuteMember();
    if (Count.count === 1){
      this.server.to(this.clientId).emit('refrechMember');
    }
  }
  //* --------------------------------------------------------------ChannelRoles---------------------------------------------------------- *//
  
  //* --------------------------------------------------------------LeaveChannel---------------------------------------------------------- *//
  @SubscribeMessage('leaveChannel')
  async handleLeaveChannel(@MessageBody() payload: { channelId: string, userId: string }, @ConnectedSocket() socket: Socket): Promise<void> {
    try{
      const member = await this.channelService.findOneChannelMember(payload.channelId, payload.userId);
      if(member && (member.role === 'MEMBER' || member.role === 'ADMIN'))
      {
        const channel = await this.channelService.findOneChannel(payload.channelId);
        const user = await this.usersService.findOne(payload.userId);
        await this.channelService.removeChannelMember(payload.channelId, payload.userId);
        socket.leave(payload.channelId);
        this.server.to(payload.channelId).emit('onMessage', `${user.name} has leaved the channel: ${channel.channelName}`);
        this.server.to(socket.id).emit('refrechMember');
      }else{
        this.server.to(socket.id).emit('error', 'Invalid Member');
      }
    }catch(error){
      this.server.to(socket.id).emit('error', error);
    }
  }
  //* --------------------------------------------------------------LeaveChannel---------------------------------------------------------- *//
  
  //* -------------------------------------------------------------RemoveChannel---------------------------------------------------------- *//
  @SubscribeMessage('removeChannel')
  async handleRemoveChannel(@MessageBody() payload: { channelId: string, userId: string }, @ConnectedSocket() socket: Socket): Promise<void> {
    try{
      const member = await this.channelService.findOneChannelMember(payload.channelId, payload.userId);
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
      }else{
        this.server.to(socket.id).emit('error', 'Invalid Owner');
      }
    }catch(error){
      this.server.to(socket.id).emit('error', error);
    }
  }
  //* -------------------------------------------------------------RemoveChannel---------------------------------------------------------- *//
  
  //* ---------------------------------------------------------------EditChannel---------------------------------------------------------- *//
  @SubscribeMessage('editChannelName')
  async handleEditChannelName(@MessageBody() payload: { channelId: string, userId: string, updatedChannelName: string }, @ConnectedSocket() socket: Socket): Promise<void> {
    try{
      const member = await this.channelService.findOneChannelMember(payload.channelId, payload.userId);
      const user = await this.usersService.findOne(payload.userId);
      if(member && member.role === 'OWNER')
      {
        const channel = await this.channelService.updateChannel(payload.channelId, {"channelName": payload.updatedChannelName });
        this.server.to(channel.id).emit('onMessage', `${user.name} update the channel name to: ${channel.channelName}`);
      }else{
        this.server.to(socket.id).emit('error', 'Invalid Owner');
      }
    }catch(error){
      this.server.to(socket.id).emit('error', error);
    }
  }
  //* ---------------------------------------------------------------EditChannel---------------------------------------------------------- *//
  
  //* --------------------------------------------------------------Disconection---------------------------------------------------------- *//
  handleDisconnect(client: Socket) {
    // this.connectedClientsService.removeClient(client);
    this.logger.log(`Client disconnected from Channel server: ${client.id}`);
  }
  //* --------------------------------------------------------------Disconection---------------------------------------------------------- *//
}
