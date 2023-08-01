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
        this.logger.log(`Client connected to APP server: ${client.id}`);
    }

    @SubscribeMessage('friendRequest')
    handleFriendRequest(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        console.log("From AppGateway: Data ====> " , data)
        this.server.emit('friendRequest', data);
    }
    @SubscribeMessage('friendCancel')
    handleFriendCancel(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        this.server.emit('friendCancel', data);
    }
    @SubscribeMessage('friendDeletion')
    handleFriendDelete(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        this.server.emit('friendDeletion', data);
    }
    
    @SubscribeMessage('friendCreation')
    handleFriendCreate(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        this.server.emit('friendCreation', data);
    }
    
    @SubscribeMessage('blockfriend')
    handleBlockfriend(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        this.server.emit('blockfriend', data);
    }
    
    @SubscribeMessage('unblockfriend')
    handleUnblockfriend(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        this.server.emit('unblockfriend', data);
    }
    
    @SubscribeMessage('gameInvitation')
    handleGameInvitation(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        this.server.emit('gameInvitation', data);
    }

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
        this.logger.log(`Client disconnected from APP server: ${client.id}`);
    }
}