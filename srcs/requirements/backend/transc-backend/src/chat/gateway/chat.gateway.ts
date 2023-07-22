import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../chat.service';
import { createHash } from 'crypto';
import { CreateChatDto } from '../dto/create-chat.dto';

@WebSocketGateway( {
  cors: { 
    origin: 'http://localhost:5173/chat',
  },
})

export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  // constructor(private readonly chatService: ChatService, private readonly usersService: UsersService) {}
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server ;

  private logger: Logger = new Logger('Gateway Log');

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleConnection(client: Socket, ...args: any[]): void {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() payload: { senderId: string, recieverId: string }, @ConnectedSocket() socket: Socket): void {
    const { senderId, recieverId } = payload;
    const roomID = `${senderId}-${recieverId}`;
    const hasshedRoomName = createHash('sha256').update(roomID).digest('hex');
    console.log(`hashedRoomName===> ${hasshedRoomName}`);
    
    Array.from(socket.rooms)
    .filter((id) => id !== socket.id)
    .forEach((id) => {
      socket.leave(id);
    });
    
    if (!socket.rooms.has(hasshedRoomName)){
      socket.join(hasshedRoomName);
    }
    
    console.log('Array from');
    console.log(Array.from(socket.rooms));
    this.logger.log(`joinRoom: ${socket.id} joined ${hasshedRoomName}`);
    this.server.to(hasshedRoomName).emit('joined', 'khuna joina');
    // await this.chatService.createChat(payload);
  }
  
  @SubscribeMessage('message')
  async handleEvent(@MessageBody() payload: CreateChatDto, @ConnectedSocket() socket: Socket): Promise<void> {
    // const roomID = [payload.senderId, payload.recieverId].sort().join('-');
    // const hasshedRoomName = createHash('sha256').update(roomID).digest('hex');
    const hasshedRoomName = await this.chatService.generateHashedRommId(payload.senderId, payload.recieverId);
    console.log(`hashedRoomName===> ${hasshedRoomName}`);

    console.log(Array.from(socket.rooms));
    
    if (!socket.rooms.has(hasshedRoomName)){
      socket.join(hasshedRoomName);
      this.logger.log(`joinRoom: ${socket.id} joined ${hasshedRoomName}`);
    }

    this.server.to(hasshedRoomName).emit('sendmessage', payload.content);
    await this.chatService.createChat(payload);
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
