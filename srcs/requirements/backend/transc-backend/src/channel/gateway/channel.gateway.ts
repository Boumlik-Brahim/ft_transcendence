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
  async handleJoinRoom(@MessageBody() payload: { channelID: string, channelPasword: string }, @ConnectedSocket() socket: Socket): Promise<void> {
    const channel = await this.channelService.findOneChannel(payload.channelID);
    console.log(`channelID==>  ${channel.id} channel name==> ${channel.channelName} channelType==> ${channel.channelType} channelpaswd==> ${channel.channelPassword} channelOwner==> ${channel.channelOwnerId}`);
    if (channel.channelType === 'protected'){
      if (channel.channelPassword === payload.channelPasword){
        socket.join(payload.channelID);
        this.server.to(payload.channelID).emit('onMessage', `${socket.id} has joined ${payload.channelID}`);
      }
      else{
        console.log(`Invalid password ${payload.channelPasword}`);
      }
    }
    else{
      socket.join(payload.channelID);
      this.server.to(payload.channelID).emit('onMessage', `${socket.id} has joined ${payload.channelID}`);
    }
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
