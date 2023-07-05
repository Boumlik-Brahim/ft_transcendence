import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChannelService } from '../channel.service';
import { Server, Socket } from 'socket.io';
import { CreateChannelDto } from '../dto/create-channel.dto';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173'
  },
})

export class ChannelGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly channelService: ChannelService) {}

  @WebSocketServer()
  server: Server;

  channelId: string;

  private logger: Logger = new Logger('Channel Gateway Log');

  afterInit(server: any) {
    this.logger.log('Channel Socket Server Initialized!');
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected to channel server: ${client.id}`);
  }

  @SubscribeMessage('createChannel')
  async handleCreateRoom(@MessageBody() payload: CreateChannelDto, @ConnectedSocket() socket: Socket): Promise<void> {
    const channel = await this.channelService.createChannel(payload);
    this.channelId = channel.id;
    socket.join(channel.id);
    this.server.to(channel.id).emit('onMessage', `${socket.id} has joined ${channel.channelName}`);
  }
  
  @SubscribeMessage('joinChannel')
  handleJoinRoom(@MessageBody() payload, @ConnectedSocket() socket: Socket): void {

  }

  @SubscribeMessage('messageChannel')
  handleMessage(@MessageBody() payload: string): void {
    this.server.to(this.channelId).emit('onMessage', payload);
  }

  @SubscribeMessage('leaveChannel')
  handleLeaveRoom(@ConnectedSocket() socket: Socket): void {
    socket.leave(this.channelId);
    this.server.to(this.channelId).emit('onMessage', `${socket.id} has leaved the channel`);
    
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected from channel server: ${client.id}`);
  }
}
