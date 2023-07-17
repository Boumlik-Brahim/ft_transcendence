import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChannelService } from '../channel.service';
import { Server, Socket } from 'socket.io';
import { CreateChannelDto } from '../dto/create-channel.dto';
import { CreateChannelMessageDto } from '../dto/create-channelMessage.dto';
import { CreateKickedMemberDto } from '../dto/create-kickedMember.dto';

@WebSocketGateway({
  cors: {
    origin: '*'
  },
})

export class ChannelGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly channelService: ChannelService) {}

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('Channel Gateway Log');

  afterInit(server: any) {
    this.logger.log('Channel Socket Server Initialized!');
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected to channel server: ${client.id}`);
  }

  @SubscribeMessage('createChannel')
  async handleCreateChannel(@MessageBody() payload: CreateChannelDto, @ConnectedSocket() socket: Socket): Promise<void> {
    const channel = await this.channelService.createChannel(payload);
    await this.channelService.createChannelOwner(channel.channelOwnerId, channel.id);
    socket.join(channel.id);
    this.server.to(channel.id).emit('onMessage', `${socket.id} has joined ${channel.channelName}`);
  }

  @SubscribeMessage('joinPublicChannel')
  async joinPublicChannel(@MessageBody() payload: { userID: string, channelID: string }, @ConnectedSocket() socket: Socket) : Promise<void> {
    const channel = await this.channelService.findOneChannel(payload.channelID);
    await this.channelService.createChannelMember({"userId": payload.userID, "channelId": payload.channelID, "role": 'MEMBER', "bannedTime": new Date(0), "mutedTime": new Date(0)});
    socket.join(payload.channelID);
    this.server.to(payload.channelID).emit('onMessage', `${socket.id} has joined ${payload.channelID}`);
  }

  @SubscribeMessage('joinProtectedChannel')
  async joinProtectedChannel(@MessageBody() payload: { userID: string, channelID: string, channelPasword: string }, @ConnectedSocket() socket: Socket): Promise<void> {
    const channel = await this.channelService.findOneChannel(payload.channelID);
    if (channel.channelType === 'PROTECTED'){
      if (channel.channelPassword === payload.channelPasword){
        await this.channelService.createChannelMember({"userId": payload.userID, "channelId": payload.channelID, "role": 'MEMBER', "bannedTime": new Date(0), "mutedTime": new Date(0)});
        socket.join(payload.channelID);
        this.server.to(payload.channelID).emit('onMessage', `${socket.id} has joined ${payload.channelID}`);
      }
      else{
        console.log(`Invalid password ${payload.channelPasword}`);
      }
    }
  }

  @SubscribeMessage('messageChannel')
  async handleMessage(@MessageBody() payload: CreateChannelMessageDto): Promise<void> {
    this.server.to(payload.channelId).emit('onMessage', payload);
    await this.channelService.createChannelMessage(payload);
  }

  @SubscribeMessage('kickMember')
  async handleKickMember(@MessageBody() payload: CreateKickedMemberDto , @ConnectedSocket() socket: Socket): Promise<void> {
    await this.channelService.createKickedMember(payload);
    await this.channelService.removeChannelMember(payload.channelId, payload.userId);
    this.server.to(payload.channelId).emit('onMessage', `${socket.id} is kicked from ${payload.channelId}`);
  }

  @SubscribeMessage('banMember')
  async handleBanMember(@MessageBody() payload: { channelId: string, memberId: string }, @ConnectedSocket() socket: Socket): Promise<void> {
    const member = await this.channelService.findOneChannelMember(payload.channelId, payload.memberId);
    member.role = 'BANNED_MEMBER';
    await this.channelService.updateChannelMember(payload.channelId, payload.memberId, member);
    this.server.to(payload.channelId).emit('onMessage', `${socket.id} is banned from ${payload.channelId}`);
  }

  @SubscribeMessage('muteMember')
  async handleMuteMember(@MessageBody() payload: { channelId: string, memberId: string }, @ConnectedSocket() socket: Socket): Promise<void> {
    const member = await this.channelService.findOneChannelMember(payload.channelId, payload.memberId);
    member.role = 'MUTED_MEMBER'
    await this.channelService.updateChannelMember(payload.channelId, payload.memberId, member);
    this.server.to(payload.channelId).emit('onMessage', `${socket.id} is muted from ${payload.channelId}`);
  }

  @SubscribeMessage('leaveChannel')
  async handleLeaveChannel(@MessageBody() payload: { channelId: string, memberId: string }, @ConnectedSocket() socket: Socket): Promise<void> {
    await this.channelService.removeChannelMember(payload.channelId, payload.memberId);
    socket.leave(payload.channelId);
    this.server.to(payload.channelId).emit('onMessage', `${socket.id} has leaved the channel`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected from channel server: ${client.id}`);
  }
}
