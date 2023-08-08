import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UsersService } from './users/users.service';
import { Logger } from '@nestjs/common';
import { ConnectedClientsService } from './connected-clients.service';
import { CreateFriendDto } from './users/dto/create-friend.dto';

@WebSocketGateway({
  cors: { 
    origin: 'http://localhost:5173',
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
        this.connectedClientsService.getAllClients().forEach((value, key) => {
            console.log(`Socket ID: ${key}, User: ${value} is connected on app gateway`);
        });
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

    // @SubscribeMessage('gameInvitation')
    // handleGameInvitation(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    //     this.server.emit('gameInvitation', data);
    // }


    /*user invitation notification*/
    // @SubscribeMessage('inviteUser')
    // async handleInviteUser(@MessageBody() payload: CreateFriendDto, @ConnectedSocket() socket: Socket): Promise<void> {
    //     const user = await this.usersService.findOne(payload.userId);
    //     for (const [key, val] of this.connectedClientsService.getAllClients()) {
    //         if (val === payload.friendId) {
    //             this.server.to(key).emit('invitation', `${user.name} send you a friend request`);
    //         }
    //     };
    //     await this.usersService.createFriend(payload);
    // }

    // @SubscribeMessage('accept')
    // async handleInvitationAccepted(@MessageBody() payload: {senderId: string, receiverId: string}, @ConnectedSocket() socket: Socket): Promise<void> {
    //     const user = await this.usersService.findOne(payload.receiverId);
    //     for (const [key, val] of this.connectedClientsService.getAllClients()) {
    //         if (val === payload.senderId) {  
    //             this.server.to(key).emit('yourInvitationAccepted', `${user.name} accept your friend request`);
    //         }
    //     };
    //     await this.usersService.updateFriend(payload.senderId, payload.receiverId);
    // }
    
    /*game invitation notification*/
    // @SubscribeMessage('inviteUserToGame')
    // async handleInviteUserToGame(@MessageBody() payload: {senderId: string, receiverId: string}, @ConnectedSocket() socket: Socket): Promise<void> {
    //     const user = await this.usersService.findOne(payload.senderId);
    //     for (const [key, val] of this.connectedClientsService.getAllClients()) {
    //         if (val === payload.receiverId) {
    //             this.server.to(key).emit('gameInvitation', `${user.name} invite you to play a PING PONG GAME`);
    //         }
    //     };
    // }

    // @SubscribeMessage('rejectGameInvitation')
    // async handleRejectGameInvitation(@MessageBody() payload: {senderId: string, receiverId: string}, @ConnectedSocket() socket: Socket): Promise<void> {
    //     const user = await this.usersService.findOne(payload.receiverId);
    //     for (const [key, val] of this.connectedClientsService.getAllClients()) {
    //         if (val === payload.senderId) {
    //             this.server.to(key).emit('gameInvitationRejected', `${user.name} reject your invitation to play a PING PONG GAME`);
    //         }
    //     };
    // }

    handleDisconnect(client: Socket) {
        this.connectedClientsService.removeClient(client);
        this.connectedClientsService.getAllClients().forEach((value, key) => {
            console.log(`Socket ID: ${key}, User: ${value} is disconnected from app gateway`);
        });
        this.logger.log(`Client disconnected from APP server: ${client.id}`);
    }
}