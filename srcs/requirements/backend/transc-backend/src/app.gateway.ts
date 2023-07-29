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
    
    @SubscribeMessage('RequestFriendShip')
    handleFriendRequest(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        console.log("From AppGateway: Data ====> " , data)
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
}