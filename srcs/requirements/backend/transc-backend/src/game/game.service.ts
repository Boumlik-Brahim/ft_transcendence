import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Game, Prisma } from '@prisma/client';
import { GameEntity, Player} from './entity/game.entity';
import { emit } from 'process';

@Injectable()
export class GameService {
    private gameMap = new Map<String, GameEntity>();

    constructor(private prisma : PrismaService) {}
    async createGame(creatorID : string, invitedId : string, client : any)  {

        const gameType : string = "not solo";
        const status : string = "waiting";
        try {
            const user = await this.prisma.user.findUnique({
                where : {
                    id : invitedId
                }
            });
            if (!user) {
                client.emit("error", "openent not find");
                return; 
            }
            const game = await this.prisma.game.create( {
                data : {
                    gameType : gameType,
                    gameStatus : status,
                    created_at : new Date(),
                    creatorId : creatorID,
                    invitedId : user.id
                }
            });
            console.log(game)
            if (game)
                client.emit("newGame", game);
        }
        catch (error) {
            client.emit("error", error);
        }
    }

    async joinGame(userId : string, gameID : string, client : any, server : any) {
        try {
            const game = await this.prisma.game.findUnique({
                where : {
                    id : gameID
                }
            });
            if (!game) {
                client.emit("error", "This game does not exist");
                return;
            }
            if (userId !== game.creatorId && userId !== game.invitedId) {
                client.emit("error", "Permission denied");
                return;
            }
            client.join(gameID);
            const nbrClientRequire = 2;
            const rooms = server.sockets.adapter.rooms.get(gameID);
            if (rooms && rooms.size === nbrClientRequire) {
                this.gameLoop(game.id, game.creatorId, game.invitedId, server);
            }
        }
        catch (error) {
            console.log(error);
            client.emit("error", error);
        }
    }

    gameLogique(gameValue : GameEntity) {
        this.isLimit(gameValue)
        gameValue.ball_x += gameValue.vx;
        gameValue.ball_y += gameValue.vy;
    }

    // keyUp(gameValue : )

    isLimit(gameValue : GameEntity) {
        const  {
            W_screen,
            H_screen,
            ball_x,
            ball_y,
            player1,
            player2,
            h_paddle,
        } = gameValue;

        const paddle1_x = player1.paddleX;
        const paddle1_y = player1.paddleY;
        const paddle2_x = player2.paddleX;
        const paddle2_y = player2.paddleY;

        if (ball_y >= paddle1_y && ball_y <= paddle1_y + h_paddle && ball_x === paddle1_x)
            gameValue.vx *= -1;
        if (ball_y >= paddle2_y && ball_y <= paddle2_y + h_paddle && ball_x === paddle2_x)
            gameValue.vx *= -1;
        if (ball_x >= W_screen || ball_x <= 0)
            gameValue.vx *= -1;
        if (ball_y >= H_screen || ball_y <= 0)
            gameValue.vy *= -1;
    }
    
    gameLoop(gameId : String, player1Id : String, player2Id : String, server : any) {
        const gameValue : GameEntity = this.getGameInitValue(gameId, player1Id, player2Id);
        this.gameMap.set(gameId, gameValue);
        setInterval(() => {
            this.update(gameValue);
            this.gameLogique(gameValue);
            server.to(gameId).emit("value", gameValue);
        }, 160);
    }

    keyUp(gameId : String, playerId : String) {
        const game : GameEntity = this.gameMap.get(gameId);
        if (game) {
            if (playerId === game.player1.id) {
                if (game.player1.paddleY > 0)
                    game.player1.paddleY -= 1;
            }
            if (playerId === game.player2.id) {
                if (game.player2.paddleY > 0)
                    game.player2.paddleY -= 1;
            }
            this.gameMap.set(gameId, game)
        }
    }

    keyDown(gameId : String, playerId : String) {
        const game : GameEntity = this.gameMap.get(gameId);
        if (game) {
            if (playerId === game.player1.id) {
                if (game.player1.paddleY < game.h_paddle + game.player1.paddleY)
                    game.player1.paddleY += 1;
            }
            if (playerId === game.player2.id) {
                if (game.player2.paddleY < game.h_paddle + game.player1.paddleY)
                    game.player2.paddleY -= 1;
            }
            this.gameMap.set(gameId, game)
        }
    }

    update(currentGame : GameEntity) {
        const game : GameEntity = this.gameMap.get(currentGame.id);
        if (game)
        {
            currentGame.player1.paddleY = game.player1.paddleY;
            currentGame.player2.paddleY = game.player2.paddleX;
        }
    }


    getGameInitValue(gameId : String, player1Id : String, player2Id : String) : GameEntity {
        const newGameValue : GameEntity =  {
            id : gameId,
            W_screen : 160,
            H_screen : 80,
            ball_x : 80,
            ball_y : 40,
            vx : 5,
            vy : 5,
            player1 : {
                id : player1Id,
                paddleX : 2,
                paddleY : 38,
                score : 0
            },
            player2 : {
                id : player2Id,
                paddleX : 2,
                paddleY : 38,
                score : 0
            },
            w_paddle : 20,
            h_paddle : 20,
            playerSpeed : 2,
        }
        return newGameValue;
    }
}
