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
    handleFriendCancel(@ConnectedSocket() client: Socket) {
        this.server.emit('friendCancel');
    }

    @SubscribeMessage('gameInvitation')
    handleGameInvitation(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        this.server.emit('gameInvitation', data);
    }
}