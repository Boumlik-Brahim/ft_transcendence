/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../chat.service';
import { CreateChatDto } from '../dto/create-chat.dto';
// import { connectedClients } from 'src/app.gateway';

@WebSocketGateway( {
  cors: { 
    origin: '*',
  },
})

export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server ;

  private logger: Logger = new Logger('CHAT Gateway Log');

  // isUserConnected(userId: string): boolean {
  //   return connectedClients.has(userId);
  // }
  
  // async getSocketIdByUserId(userId: string): Promise<string> {
  //   if (this.isUserConnected(userId)){
  //     return connectedClients.get(userId);
  //   }
  // }

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleConnection(client: Socket, ...args: any[]): void {
    // this.logger.log(`Client connected: ${client.id}`);
    console.log(" ----------- Client connected: --------------", client.id);
    this.server.emit("test", "this is a socketIo test from nestJs to nextJs");
  }

  private users: { userId: string; socketId: string }[] = [];
  addUser(userId: string, socketId: string) {
    if (!(this.users.some((user) => user.userId === userId) ) ) {
      this.users.push({ userId, socketId });
    }
  }
  getUser(userId: string) {
    return this.users.find((user) => user.userId === userId);
  }

  @SubscribeMessage('addUser')
  handleAddUser(client: Socket, userId: string) {
    
    userId && this.addUser(userId, client.id);
    userId && this.server.emit('getUsers', this.users);
  }
  removeUser(socketId: string) {
    this.users = this.users.filter((user) => user.socketId !== socketId);
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(client: Socket, data: { senderId: string; receiverId: string; text: string }) {
    const user = this.getUser(data.receiverId);
    if (user) {
      console.log(" USER DATA : ",user, " | MESSAGE DATA : ",data)
      this.server.to(user.socketId).emit('getMessage', { senderId: data.senderId, text: data.text });
    }
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(@MessageBody() payload: { senderId: string, recieverId: string }, @ConnectedSocket() socket: Socket): Promise<void> {
    const hasshedRoomName = await this.chatService.generateHashedRommId(payload.senderId, payload.recieverId);

    Array.from(socket.rooms)
    .filter((id) => id !== socket.id)
    .forEach((id) => {
      socket.leave(id);
    });

    if (!socket.rooms.has(hasshedRoomName)){
      socket.join(hasshedRoomName);
      this.server.to(socket.id).emit('joined', {roomName: hasshedRoomName});
      this.logger.log(`joinRoom: ${socket.id} joined ${hasshedRoomName}`);
    }
  }
  
  @SubscribeMessage('message')
  async handleEvent(@MessageBody() payload: CreateChatDto, @ConnectedSocket() socket: Socket): Promise<void> {
    const hasshedRoomName = await this.chatService.generateHashedRommId(payload.senderId, payload.recieverId);
    Array.from(socket.rooms)
    .filter((id) => id !== socket.id)
    .forEach((id) => {
      socket.leave(id);
    });

    if (!socket.rooms.has(hasshedRoomName)){
      socket.join(hasshedRoomName);
      this.logger.log(`joinRoom: ${socket.id} joined ${hasshedRoomName}`);
    }

    this.server.to(hasshedRoomName).emit('getMessage',{ senderId: payload.senderId, receiverId: payload.recieverId, text: payload.content, room: hasshedRoomName});
    // const receiverSocketId = this.getSocketIdByUserId(payload.recieverId);
    // const sender = await this.
    // this.server.to(receiverSocketId).emit('messageNotif', );
    await this.chatService.createChat(payload);
  }
  
  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
