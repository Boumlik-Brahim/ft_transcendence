import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from "socket.io";
import { Client } from 'socket.io/dist/client';
import { CreateGameDto } from './dto/game-create.dto';
import { JoinGameDto } from './dto/join-game.dto';
import { UsePipes } from '@nestjs/common';
import { GameService } from './game.service';
import { subscribe } from 'diagnostics_channel';


@WebSocketGateway({
  cors : {
    origin : '*'
  }
})
export class GameGateway {

  constructor(private gameService : GameService) {}

  @WebSocketServer()
  server: Server;

  afterInit(server : Server) {
    console.log('The server has started');
  }

  handleConnection(client : Socket) {
    console.log(client.id, "new User");
  }
  
  @SubscribeMessage('createGame')
  createGame(@MessageBody() data: CreateGameDto, @ConnectedSocket() client: Socket) {
    console.log(data);
    this.gameService.createGame(data, client);
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

  @SubscribeMessage('ArrowDown')
  keyDown(@MessageBody() data: JoinGameDto, @ConnectedSocket() client: Socket) {
    console.log("ArrowDown");
    const { gameID, userId } = data;
    if (gameID && userId) 
    {
      this.gameService.ArrowDown(gameID, userId);
    }
  }

  @SubscribeMessage('ArrowUp')
  keyUp(@MessageBody() data: JoinGameDto, @ConnectedSocket() client: Socket) {
    console.log("ArrowUp");
    const { gameID, userId } = data;
    if (gameID && userId) 
    {
      this.gameService.ArrowUp(gameID, userId);
    }
  }

  @SubscribeMessage('keyPress')
  keyPress(@ConnectedSocket() client: Socket) {

  }

  @SubscribeMessage('quitGame')
  quitGame(@ConnectedSocket() client: Socket) {

  }

  handleDisconnect(client : Socket) {
    console.log(client.id, "Client disconnected");
  }

}
