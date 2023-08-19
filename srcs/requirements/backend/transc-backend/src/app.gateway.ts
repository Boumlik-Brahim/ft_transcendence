import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UsersService } from './users/users.service';
import { Logger } from '@nestjs/common';
import { ConnectedClientsService } from './connected-clients.service';
import { CreateFriendDto } from './users/dto/create-friend.dto';

@WebSocketGateway({
  namespace : 'appGateway',
  cors: { 
    origin: `${process.env.APP_URI}:5173`,
  },
})

export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    
    constructor(private readonly usersService: UsersService,
        private readonly connectedClientsService: ConnectedClientsService) {}

    @WebSocketServer()
    server: Server ;

    private logger: Logger = new Logger('APP Gateway Log');
    
    afterInit(server: Server) {
        this.logger.log('APP server Initialized!');
    }

    handleConnection(client: Socket) {
        this.connectedClientsService.addClient(client);
        this.logger.log(`Client connected to APP server: ${client.id}`);
    }

    @SubscribeMessage('RequestFriendShip')
    handleFriendRequest(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        this.server.emit('RequestFriendShip', data);
    }
    @SubscribeMessage('CancelFriendShip')
    handleFriendCancel(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        this.server.emit('CancelFriendShip', data);
    }
    @SubscribeMessage('DeleteRequest')
    handleFriendDelete(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        this.server.emit('DeleteRequest', data);
    }
 
    @SubscribeMessage('AcceptRequest')
    handleFriendCreate(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        this.server.emit('AcceptRequest', data);
    }
  
    @SubscribeMessage('DeleteFriendShip')
    handleFriendShipDelete(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        this.server.emit('DeleteFriendShip', data);
    }

    @SubscribeMessage('BlockFriend')
    handleBlockfriend(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        this.server.emit('BlockFriend', data);
    }
   
    @SubscribeMessage('UnblockFriend')
    handleUnblockfriend(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        this.server.emit('UnblockFriend', data);
    }

    @SubscribeMessage('inviteUser')
    async handleInviteUser(@MessageBody() payload: CreateFriendDto, @ConnectedSocket() socket: Socket): Promise<void> {
        console.log(payload);
        const user = await this.usersService.findOne(payload.userId);
        for (const [key, val] of this.connectedClientsService.getAllClients()) {
            if (val === payload.friendId) {
                this.server.to(key).emit('invitation', `${user.name} send you a friend request`);
            }
        };
        await this.usersService.createFriend(payload);
    }

    handleDisconnect(client: Socket) {
        this.connectedClientsService.removeClient(client);
        this.logger.log(`Client disconnected from APP server: ${client.id}`);
    }
}