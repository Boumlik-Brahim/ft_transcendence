import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from "socket.io";
import { CreateGameDto } from './dto/game-create.dto';
import { JoinGameDto } from './dto/join-game.dto';
import { Logger, UsePipes } from '@nestjs/common';
import { GameService } from './game.service';
import { subscribe } from 'diagnostics_channel';
import { ConnectedClientsService } from 'src/connected-clients.service';
import { InvitationGameDto } from './dto/game-invitation.dto';


@WebSocketGateway({
  namespace : "game",
  cors : {
    origin : `${process.env.APP_URI}:5173/game`
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
    const userId = client.handshake.auth.userId as string;
    console.log(`Socket ID: ${client.id}, User: ${userId} is connected on Game gateway`);
    if (userId) {
      this.gameService.addUser(userId, client);
    }
  };
  
  @SubscribeMessage('createGame')
  createGame(@MessageBody() data: CreateGameDto, @ConnectedSocket() client: Socket) {
    console.log(data);
    this.gameService.createGame(data, client);
  }

  @SubscribeMessage('rejectInvitation')
  rejectInvitaion(@MessageBody() data: InvitationGameDto, @ConnectedSocket() client: Socket) {
    const { invitationId , userId } = data;
    this.gameService.rejectInvitation(client, invitationId, userId);
  }

  @SubscribeMessage('acceptInvitation')
  acceptInvitaion(@MessageBody() data: InvitationGameDto, @ConnectedSocket() client: Socket) {
    const { invitationId , userId } = data;
    this.gameService.AcceptInvitation(client, invitationId, userId);
  }

  @SubscribeMessage('joinGame')
  async joinGame(@MessageBody() data: JoinGameDto, @ConnectedSocket() client: Socket) {
    console.log(data, "Join 5");
    if (!data) return;
    console.log(data, "Join");
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
    this.gameService.deleteUser(client);
  }

}
