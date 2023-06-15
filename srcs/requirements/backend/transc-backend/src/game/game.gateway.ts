import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from "socket.io";
import { Client } from 'socket.io/dist/client';
import { CreateGameDto } from './dto/game-create.dto';
import { JoinGameDto } from './dto/join-game.dto';
import { UsePipes } from '@nestjs/common';
import { GameService } from './game.service';


@WebSocketGateway({
  cors : {
    origin : '*'
  }
})
export class GameGateway {

  constructor(private gameService : GameService) {}

  @WebSocketServer()
  server: Server;
  
  @SubscribeMessage('createGame')
  createGame(@MessageBody() data: CreateGameDto, @ConnectedSocket() client: Socket) {
    const { creatorID, invitedName } = data;
    this.gameService.createGame(creatorID, invitedName, client);
  }

  joinAQue(@MessageBody() data: JoinGameDto, @ConnectedSocket() client: Socket) {

  }

  @SubscribeMessage('joinGame')
  joinGame(@MessageBody() data: JoinGameDto, @ConnectedSocket() client: Socket) {
    const { gameID, userId } = data;
    if (gameID && userId ) {
      this.gameService.joinGame(userId, gameID);
    }
    else {
      client.emit('error', "Bad request");
    }
  }

  @SubscribeMessage('keyDown')
  keyDown(@ConnectedSocket() client: Socket) {
    
  }

  @SubscribeMessage('keyUp')
  keyUp(@ConnectedSocket() client: Socket) {

  }

  @SubscribeMessage('keyPress')
  keyPress(@ConnectedSocket() client: Socket) {

  }

  @SubscribeMessage('quitGame')
  quitGame(@ConnectedSocket() client: Socket) {

  }

}
