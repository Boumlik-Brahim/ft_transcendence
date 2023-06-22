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
    console.log(data)
    const { creatorID, invitedName } = data;
    this.gameService.createGame(creatorID, invitedName, client);
  }

  joinAQue(@MessageBody() data: JoinGameDto, @ConnectedSocket() client: Socket) {

  }

  @SubscribeMessage('joinGame')
  async joinGame(@MessageBody() data: JoinGameDto, @ConnectedSocket() client: Socket) {
    const { gameID, userId } = data;
    if (gameID && userId ) {
      await this.gameService.joinGame(userId, gameID, client, this.server);
      console.log("sorti")
    }
    else {
      client.emit('error', "Bad request");
    }
  }

  // @SubscribeMessage('isPlaying')
  // isPlaying(@ConnectedSocket() client: Socket) {
  //   this.gameService.gameLoop(client);
  // }

  @SubscribeMessage('keyDown')
  keyDown(@MessageBody() data: JoinGameDto, @ConnectedSocket() client: Socket) {
    console.log(data, "ok");
    const { gameID, userId } = data;
    if (gameID && userId) 
    {
      this.gameService.keyDown(gameID, userId);
    }
  }
  

  @SubscribeMessage('keyUp')
  keyUp(@MessageBody() data: JoinGameDto, @ConnectedSocket() client: Socket) {
    const { gameID, userId } = data;
    if (gameID && userId) 
    {
      this.gameService.keyUp(gameID, userId);
    }
  }

  @SubscribeMessage('keyPress')
  keyPress(@ConnectedSocket() client: Socket) {

  }

  @SubscribeMessage('quitGame')
  quitGame(@ConnectedSocket() client: Socket) {

  }

}
