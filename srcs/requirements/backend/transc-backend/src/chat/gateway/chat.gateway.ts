import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../chat.service';
import { CreateChatDto } from '../dto/create-chat.dto';
import { ConnectedClientsService } from 'src/connected-clients.service';
import { PrismaService } from 'prisma/prisma.service';
import { AppGateway } from 'src/app.gateway';
import { UsersService } from 'src/users/users.service';
@WebSocketGateway( {
  namespace: 'chatGateway',
  cors: { 
    origin: `${process.env.APP_URI}:5173/chat`,
  },
})

export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  constructor(private readonly chatService: ChatService,
    private readonly connectedClientsService: ConnectedClientsService,
    private readonly usersService: UsersService,
    private prisma: PrismaService,
    private appGateway: AppGateway) {}


  @WebSocketServer()
  server: Server ;

  private logger: Logger = new Logger('CHAT Gateway Log');

  afterInit(server: Server) {
    this.logger.log('Chat Server Initialized!');
  }

  handleConnection(client: Socket): void {
    this.connectedClientsService.addClientInchat(client);
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
    const blockedUser = await this.usersService.findOneBlockedUser(payload.recieverId, payload.senderId);
    if(!blockedUser){
      const hasshedRoomName = await this.chatService.generateHashedRommId(payload.senderId, payload.recieverId);  
      if (!socket.rooms.has(hasshedRoomName)){
        socket.join(hasshedRoomName);
        this.logger.log(`joinRoom: ${socket.id} joined ${hasshedRoomName}`);
      }
      this.server.to(hasshedRoomName).emit('getMessage',{ senderId: payload.senderId, receiverId: payload.recieverId, text: payload.content, room: hasshedRoomName});
      await this.chatService.createChat(payload);
  
      for (const [key, val] of this.connectedClientsService.getAllClientsFromChat()) {
        if (val === payload.recieverId) {
          this.server.to(key).emit('refresh');
        }
      };
      
      for (const [key, val] of this.connectedClientsService.getAllClients()) {
        if (val === payload.recieverId) {
          this.appGateway.server.to(key).emit('notifMessage', payload);
        }
      };
    }
  }
  
  handleDisconnect(client: Socket): void {
    this.connectedClientsService.removeClientFromChat(client);
    this.logger.log(`Client disconnected from Chat server: ${client.id}`);
  }
}
