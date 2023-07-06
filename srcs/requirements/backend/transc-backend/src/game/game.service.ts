import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GameEntity } from './entity/game.entity';

@Injectable()
export class GameService {
    private gameMap = new Map<String, GameEntity>();

    constructor(private prisma : PrismaService) {}
    async createGame(data, client : any)  {
        const { invitedId, creatorID, isRamdomOponent } = data;

        const gameType : string = "not solo";
        const status : string = "waiting";
        console.log(invitedId, creatorID);
        if (!isRamdomOponent) {
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
        else {

        }
    }

    // async findGameInTheQueue(level : string) : string {

    // }

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
        this.collision(gameValue)
        gameValue.ball_x += gameValue.vx;
        gameValue.ball_y += gameValue.vy;
    }

    paddleCollisionAngle(ball_y : number, paddle_y : number, paddle_middle : number) : number {
        const collisionPoint = ball_y - (paddle_y + paddle_middle);
        const NormalisePoint = collisionPoint / paddle_middle;
        const maxBounceAngle = (Math.PI / 4);
        const angle = NormalisePoint * maxBounceAngle;
        return angle;
    }

    collision(gameValue : GameEntity) {
        const  {
            W_screen,
            H_screen,
            ball_x,
            radius,
            ball_y,
            player1,
            player2,
            h_paddle,
        } = gameValue;

        const paddle1_x = player1.paddleX;
        const paddle1_y = player1.paddleY;
        const paddle2_x = player2.paddleX;
        const paddle2_y = player2.paddleY;

        const ball_left = ball_x - radius;
        const ball_right = ball_x + radius;
        const ball_top = ball_y - radius;
        const ball_bottom = ball_y + radius;

        const paddle_middle = h_paddle / 2;
        const paddle1_surface = paddle1_x;
        const paddle2_surface = paddle2_x;
        const paddle1_bottom = paddle1_y + h_paddle;
        const paddle2_bottom = paddle2_y + h_paddle;
        const paddle1_top = paddle1_y;
        const paddle2_top = paddle2_y;

        if (ball_left <= paddle1_surface && ball_bottom > paddle1_top && ball_top < paddle1_bottom)
        {
            gameValue.ball_speed += 0.2;
            console.log(ball_left, paddle1_surface, ball_y, paddle1_top, ball_x);
            const angle = this.paddleCollisionAngle(ball_y, paddle1_y, paddle_middle);
            gameValue.vx = gameValue.ball_speed * Math.cos(angle);
            gameValue.vy = gameValue.ball_speed * Math.sin(angle);
            if (gameValue.vx < 0)
                gameValue.vx *= -1;
        }
        else if (ball_right >= paddle2_surface && ball_bottom > paddle2_top && ball_top < paddle2_bottom)
        {
            gameValue.ball_speed += 0.2;
            const angle = this.paddleCollisionAngle(ball_y, paddle2_y, paddle_middle);
            gameValue.vx = gameValue.ball_speed * Math.cos(angle);
            gameValue.vy = gameValue.ball_speed * Math.sin(angle);
            if (gameValue.vx > 0)
            gameValue.vx *= -1;
        }
        
        else if (ball_right > W_screen || ball_left < 0)
        {
            gameValue.vx *= -1;
            gameValue.vy *= -1;
            gameValue.ball_x = W_screen / 2;
            gameValue.ball_y = H_screen / 2;
            if (ball_right > W_screen) {
                gameValue.player1.score += 1;
                if (gameValue.player1.score === gameValue.scoreLimit)
                {
                    gameValue.gameStatus = 'finished';
                    gameValue.winner = gameValue.player1.id;
                }

            }
            else if (ball_left < 0) {
                gameValue.player2.score += 1;
                if (gameValue.player2.score === gameValue.scoreLimit)
                {
                    gameValue.gameStatus = 'finished';
                    gameValue.winner = gameValue.player2.id;
                }
            }
        }
        else if (ball_bottom > H_screen || ball_top < 0)
            gameValue.vy *= -1;
    }
    
    gameLoop(gameId : String, player1Id : String, player2Id : String, server : any) {
        const gameValue : GameEntity = this.getGameInitValue(gameId, player1Id, player2Id);
        this.gameMap.set(gameId, gameValue);
        const id = setInterval(() => {
            this.updatePaddle(gameValue);
            this.gameLogique(gameValue);
            this.istheGameEnd(gameValue, id);
            server.to(gameId).emit("value", gameValue);
        }, 160);
    }

    ArrowUp(gameId : String, playerId : String) {
        const game : GameEntity = this.gameMap.get(gameId);
        const speed = 1;
        if (game) {
            if (playerId === game.player1.id) {
                if (game.player1.paddleY > 0)
                    game.player1.paddleY -= speed;
                this.gameMap.set(gameId, game);
            }
            else if (playerId === game.player2.id) {
                if (game.player2.paddleY > 0)
                    game.player2.paddleY -= speed;
                this.gameMap.set(gameId, game);
            }
        }
    }

    ArrowDown(gameId : String, playerId : String) {
        const game : GameEntity = this.gameMap.get(gameId);
        if (game) {
            if (playerId === game.player1.id) {
                if (game.player1.paddleY + game.h_paddle < game.H_screen)
                game.player1.paddleY += 1;
                this.gameMap.set(gameId, game)   
            }
            if (playerId === game.player2.id) {
                if (game.player2.paddleY + game.h_paddle < game.H_screen)
                game.player2.paddleY += 1;
                this.gameMap.set(gameId, game)
            }
        }
        // console.log(game.player1.paddleY)
    }

    updatePaddle(currentGame : GameEntity) {
        const game : GameEntity = this.gameMap.get(currentGame.id);
        if (game)
        {
            currentGame.player1.paddleY = game.player1.paddleY;
            currentGame.player2.paddleY = game.player2.paddleY;
        }
    }

    getGameInitValue(gameId : String, player1Id : String, player2Id : String) : GameEntity {
        const newGameValue : GameEntity =  {
            id : gameId,
            W_screen : 860,
            H_screen : 400,
            ball_x : 430,
            ball_y : 200,
            radius : 10,
            vx : 20,
            vy : 40,
            player1 : {
                id : player1Id,
                paddleX : 20,
                paddleY : 40,
                score : 0
            },
            player2 : {
                id : player2Id,
                paddleX : 840,
                paddleY : 40,
                score : 0
            },
            w_paddle : 20,
            h_paddle : 200,
            playerSpeed : 2,
            scoreLimit : 11,
            ball_speed : 20,
            gameStatus : "waiting",
            winner : null
        }
        return newGameValue;
    }

    istheGameEnd(game : GameEntity, intervalId) {
        const { gameStatus } = game;
        if (gameStatus === 'finished' || gameStatus === 'canceled')
            clearInterval(intervalId);
    }

    // stopAgame(gameId : number) {
    //     clearInterval(gameLoopId);
    // }
}
