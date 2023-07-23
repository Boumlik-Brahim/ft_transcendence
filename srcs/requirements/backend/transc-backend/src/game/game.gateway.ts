import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from "socket.io";
import { Client } from 'socket.io/dist/client';
import { CreateGameDto } from './dto/game-create.dto';
import { JoinGameDto } from './dto/join-game.dto';
import { UsePipes } from '@nestjs/common';
import { GameService } from './game.service';
import { subscribe } from 'diagnostics_channel';


@WebSocketGateway({
  namespace : "game",
  cors : {
    origin : 'http://localhost:5173'
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

  @SubscribeMessage('joinGame')
  async joinGame(@MessageBody() data: JoinGameDto, @ConnectedSocket() client: Socket) {
    if (!data) return;
    const { gameId, userId } = data;
    if (gameId && userId ) {
       this.gameService.joinGame(userId, gameId, client, this.server);
    }
    else {
      client.emit('error', "Bad request");
    }
  }

  @SubscribeMessage('ArrowRight')
  keyDown(@MessageBody() data: JoinGameDto, @ConnectedSocket() client: Socket) {
    if (!data) return; 
    const { gameId, userId } = data;
    if (gameId && userId) 
    {
      this.gameService.ArrowDown(gameId, userId);
    }
  }

  @SubscribeMessage('ArrowLeft')
  keyUp(@MessageBody() data: JoinGameDto, @ConnectedSocket() client: Socket) {
    if (!data) return; 
    const { gameId, userId } = data;
    if (gameId && userId) 
    {
      this.gameService.ArrowUp(gameId, userId);
    }
  }

  @SubscribeMessage('quitGame')
  quitGame(@ConnectedSocket() client: Socket) {

  }

  handleDisconnect(client : Socket) {
    console.log(client.id, "Client disconnected");
  }

}
