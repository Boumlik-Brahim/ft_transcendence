import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from "socket.io";
import { CreateGameDto } from './dto/game-create.dto';
import { JoinGameDto } from './dto/join-game.dto';
import { Logger, UsePipes } from '@nestjs/common';
import { GameService } from './game.service';
import { subscribe } from 'diagnostics_channel';
import { ConnectedClientsService } from 'src/connected-clients.service';
import { InvitationGameDto } from './dto/game-invitation.dto';
import { JWT_SECRET } from 'src/utils/constants';
import * as jwt from 'jsonwebtoken'


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
    const token = client.handshake.auth.token;
    if (token) {
      try {
        const user = jwt.verify(token, JWT_SECRET) as {id : string, email : string, iat: number}
        const { id } = user;
        if (user.id)
        this.gameService.addUser(id, client, this.server);
      }
      catch {
        return false
      }
    }
    else {
      return false
    }
  };
  
  @SubscribeMessage('createGame')
  createGame(@MessageBody() data: CreateGameDto, @ConnectedSocket() client: Socket) {
    if (!this.gameService.isConneted(data.creatorID, client)) {
      client.emit("error", "Permission denied")
      return;
    }
    this.gameService.createGame(data, client);
  }

  @SubscribeMessage('rejectInvitation')
  rejectInvitaion(@MessageBody() data: InvitationGameDto, @ConnectedSocket() client: Socket) {
    if (!this.gameService.isConneted(data.userId, client)) {
      client.emit("error", "Permission denied")
      return;
    }
    const { invitationId , userId } = data;
    this.gameService.rejectInvitation(client, invitationId, userId);
  }

  @SubscribeMessage('acceptInvitation')
  acceptInvitaion(@MessageBody() data: InvitationGameDto, @ConnectedSocket() client: Socket) {
    if (!this.gameService.isConneted(data.userId, client)) {
      client.emit("error", "Permission denied")
      return;
    }
    const { invitationId , userId } = data;
    this.gameService.AcceptInvitation(client, invitationId, userId);
  }

  @SubscribeMessage('joinGame')
  async joinGame(@MessageBody() data: JoinGameDto, @ConnectedSocket() client: Socket) {
    if (!this.gameService.isConneted(data.userId, client)) {
      client.emit("error", "Permission denied")
      return;
    }
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
  paddleMoveUp(@MessageBody() data: JoinGameDto, @ConnectedSocket() client: Socket) {
    if (!this.gameService.isConneted(data.userId, client)) {
      client.emit("error", "Permission denied")
      return;
    }
    if (!data) return; 
    const { gameId, userId } = data;
    if (gameId && userId) 
    {
      this.gameService.paddleMoveUp(gameId, userId, client);
    }
  }

  @SubscribeMessage('keyup')
  paddleStopMove(@MessageBody() data: JoinGameDto, @ConnectedSocket() client: Socket) {
    if (!this.gameService.isConneted(data.userId, client)) {
      client.emit("error", "Permission denied")
      return;
    }
    if (!data) return; 
    const { gameId, userId } = data;
    if (gameId && userId) 
    {
      this.gameService.paddleStopMove(gameId, userId, client);
    }
  }

  @SubscribeMessage('ArrowLeft')
  paddleMoveDown(@MessageBody() data: JoinGameDto, @ConnectedSocket() client: Socket) {
    if (!this.gameService.isConneted(data.userId, client)) {
      client.emit("error", "Permission denied")
      return;
    }
    if (!data) return; 
    const { gameId, userId } = data;
    if (gameId && userId) 
    {
      this.gameService.paddleMoveDown(gameId, userId, client);
    }
  }

  @SubscribeMessage('quiteGame')
  quitGame(@MessageBody() data: JoinGameDto, @ConnectedSocket() client: Socket) {
    if (!this.gameService.isConneted(data.userId, client)) {
      client.emit("error", "Permission denied")
      return;
    }
    
    if (!data) return; 
    const { gameId, userId } = data;
    if (gameId && userId) 
    {
      this.gameService.quiteGame(userId, gameId, client, 'ONLINE');
    }
  }
  
  handleDisconnect(client : Socket) {
    this.gameService.deleteUser(client);
  }

}
