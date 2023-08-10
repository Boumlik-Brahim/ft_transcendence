import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../chat.service';
import { CreateChatDto } from '../dto/create-chat.dto';
import { UsersService } from 'src/users/users.service';
import { ConnectedClientsService } from 'src/connected-clients.service';
import { PrismaService } from 'prisma/prisma.service';

@WebSocketGateway( {
  // namespace: 'chatGateway',
  cors: { 
    origin: 'http://localhost:5173/chat',
  },
})

export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  constructor(private readonly chatService: ChatService, 
    private readonly usersService: UsersService, 
    private readonly connectedClientsService: ConnectedClientsService,
    private prisma: PrismaService) {}
  
  private connectedClientsInChat: Map<string, string> = new Map();

  @WebSocketServer()
  server: Server ;

  private logger: Logger = new Logger('CHAT Gateway Log');

  afterInit(server: Server) {
    this.logger.log('Chat Server Initialized!');
  }

  handleConnection(client: Socket): void {
    const userId = client.handshake.auth.userId as string;
    if (userId && client.id){
        if(!this.connectedClientsInChat.has(client.id))
        {
          this.connectedClientsInChat.set(client.id, userId);
        }
    }
    this.connectedClientsInChat.forEach((value, key) => {
      console.log(`Socket ID: ${key}, User: ${value} is connected on Chat gateway`);
    });
    this.logger.log(`Client connected to Chat server: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(@MessageBody() payload: { senderId: string, recieverId: string }, @ConnectedSocket() socket: Socket): Promise<void> {
    const hasshedRoomName = await this.chatService.generateHashedRommId(payload.senderId, payload.recieverId);
    const messages = await this.chatService.findAllChats(hasshedRoomName);
    if (messages.length === 0){
      await this.prisma.directMessage.create({ data: {
        content: "",
        senderId: payload.senderId,
        recieverId: payload.recieverId,
        roomId: hasshedRoomName,
        seen: true
      }});
    }

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
    await this.chatService.createChat(payload);
    for (const [key, val] of this.connectedClientsService.getAllClients()) {
      if (val === payload.recieverId) {
          this.server.to(key).emit('refresh');
      }
    };

    const sender = await this.usersService.findOne(payload.senderId)
    for (const [key, val] of this.connectedClientsService.getAllClients()) {
      if (val === payload.recieverId) {
        this.server.to(key).emit('notifMessage', payload);  
      }
    };
    // if (!this.connectedClientsService.isUserConnected(socket))
    // {
    // }
  }
  
  handleDisconnect(client: Socket): void {
    this.connectedClientsInChat.delete(client.id);
    this.connectedClientsInChat.forEach((value, key) => {
      console.log(`Socket ID: ${key}, User: ${value} is disconnected from Chat gateway`);
    });
    this.logger.log(`Client disconnected from Chat server: ${client.id}`);
  }
}
