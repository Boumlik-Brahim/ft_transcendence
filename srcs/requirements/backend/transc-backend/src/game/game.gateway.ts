import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'dgram';

@WebSocketGateway()
export class GameGateway {
  @SubscribeMessage('createGame')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket
  ) {

    }
}
