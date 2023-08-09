import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from "socket.io";
import { CreateGameDto } from './dto/game-create.dto';
import { JoinGameDto } from './dto/join-game.dto';
import { Logger, UsePipes } from '@nestjs/common';
import { GameService } from './game.service';
import { subscribe } from 'diagnostics_channel';
import { ConnectedClientsService } from 'src/connected-clients.service';


@WebSocketGateway({
  namespace : "game",
  cors : {
    origin : 'http://localhost:5173/game'
  }
})

export class GameGateway {

  constructor(private gameService : GameService,
    private readonly connectedClientsService: ConnectedClientsService) {}

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('GAME Gateway Log');
  
  afterInit(server : Server) {
    this.logger.log('Game Server Initialized!');
  }

  handleConnection(client : Socket) {
    // this.connectedClientsService.addClient(client);
    this.logger.log(`Client connected to Game server: ${client.id}`);
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
      this.gameService.ArrowDown(gameId, userId, client);
    }
  }

  @SubscribeMessage('ArrowLeft')
  keyUp(@MessageBody() data: JoinGameDto, @ConnectedSocket() client: Socket) {
    if (!data) return; 
    const { gameId, userId } = data;
    if (gameId && userId) 
    {
      this.gameService.ArrowUp(gameId, userId, client);
    }
  }

  @SubscribeMessage('quiteGame')
  quitGame(@MessageBody() data: JoinGameDto, @ConnectedSocket() client: Socket) {
    if (!data) return; 
    const { gameId, userId } = data;
    if (gameId && userId) 
    {
      this.gameService.quiteGame(userId, gameId, client);
    }
  }

  @SubscribeMessage('cancelGame')
  cancelGame(@MessageBody() data: JoinGameDto, @ConnectedSocket() client: Socket) {
    if (!data) return; 
    const { gameId, userId } = data;
    if (gameId && userId) 
    {
      this.gameService.cancelGame(userId, gameId, client);
    }
  }

  @SubscribeMessage('pauseOrStart')
  pauseOrSart(@MessageBody() data: JoinGameDto, @ConnectedSocket() client: Socket) {
    console.log(data)
    if (!data) return; 
    const { gameId, userId } = data;
    if (gameId && userId) 
    {
      this.gameService.pauseOrSart(userId, gameId, client);
    }
  }

  handleDisconnect(client : Socket) {
    // this.connectedClientsService.removeClient(client);
    this.logger.log(`Client disconnected from Game server: ${client.id}`);
  }

}
