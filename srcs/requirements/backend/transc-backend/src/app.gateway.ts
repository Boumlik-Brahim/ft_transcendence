import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private server: Server;

    afterInit(server: Server) {
        this.server = server;
    }

    handleConnection(client: Socket) {
        console.log("From AppGateway: Client Connect")
    }

    handleDisconnect(client: Socket) {
        console.log("From AppGateway: Client Disconnect")
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
}