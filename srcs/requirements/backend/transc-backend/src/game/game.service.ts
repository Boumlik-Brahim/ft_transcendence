import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { GameEntity, Player } from './entity/game.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GameService {
    private gameMap = new Map<String, GameEntity>();
    private inTheQueue : String | null;

    constructor(private prisma : PrismaService) {}
    async createGame(data, client : any)  {
        const { invitedId, creatorId, isRamdomOponent } = data;
        console.log('fode');
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
                const game : GameEntity = this.getGameInitValue(creatorId, invitedId);
                this.gameMap.set(game.id, game);
                client.emit("Success", {id : game.id});
            }
            catch (error) {
                client.emit("error", error);
            }
        }
        else {
            if (this.inTheQueue == null) {
                const game : GameEntity = this.getGameInitValue(creatorId, '');
                this.inTheQueue = game.id;
                this.gameMap.set(game.id, game);
                client.emit("Success", {id : game.id});
            }
            else {
                const gameJoined : GameEntity = this.gameMap.get(this.inTheQueue);
                // if (creatorId === gameJoined.player1.id) return;
                this.inTheQueue = null;
                gameJoined.player2.id = creatorId;
                this.gameMap.set(gameJoined.id, gameJoined);
                client.emit("Success", {id : gameJoined.id});

            }
        }
    }

    async joinGame(userId : string, gameId : string, client : any, server : any) {
        try {
            const game = this.gameMap.get(gameId);
            console.log(game);
            if (!game) {
                client.emit("error", "This game does not exist");
                return;
            }
            if (userId !== game.player1.id && userId !== game.player2.id) {
                client.emit("error", "Permission denied");
                return;
            }
            client.join(gameId);
            client.emit('gameSate', {state : game.gameStatus});
            const nbrClientRequire = 2;
            const rooms = server.adapter.rooms.get(gameId)
            // if (rooms && rooms.size === nbrClientRequire) {
                game.gameStatus = 'started';
                server.to(gameId).emit('gameSate', {state : game.gameStatus});
                this.gameLoop(game, server);
            // }
        }
        catch (error) {
            console.log(error);
            client.emit("error", error);
        }
    }

    gameLogique(gameValue : GameEntity) {
        this.collision(gameValue)
        gameValue.ball_x += (gameValue.vx );
        gameValue.ball_y += (gameValue.vy );
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

        const ball_left = ball_x - radius;
        const ball_right = ball_x + radius;
        const ball_top = ball_y - radius;
        const ball_bottom = ball_y + radius;

        const paddle_middle = h_paddle / 2;
        const paddle1_surface = player1.paddleX;
        const paddle2_surface = player2.paddleX;
        const paddle1_bottom = player1.paddleY + h_paddle;
        const paddle2_bottom = player2.paddleY + h_paddle;
        const paddle1_top = player1.paddleY;
        const paddle2_top = player2.paddleY;

        if (ball_left <= paddle1_surface && ball_bottom > paddle1_top && ball_top < paddle1_bottom)
        {
            gameValue.ball_speed += 0.2;
            gameValue.vx *= -1; 
            // const angle = this.paddleCollisionAngle(ball_y, paddle1_top, paddle_middle);
            // gameValue.vx = gameValue.ball_speed * Math.cos(angle);
            // gameValue.vy = gameValue.ball_speed * Math.sin(angle);
            // if (gameValue.vx < 0)
            // {
            // }
        }
        else if (ball_right >= paddle2_surface && ball_bottom > paddle2_top && ball_top < paddle2_bottom)
        {
            gameValue.ball_speed += 0.2;
            gameValue.vx *= -1;
            // const angle = this.paddleCollisionAngle(ball_y, paddle2_top, paddle_middle);
            // gameValue.vx = gameValue.ball_speed * Math.cos(angle);
            // gameValue.vy = gameValue.ball_speed * Math.sin(angle);
            // if (gameValue.vx > 0)
            // {
            // }
        }  
        else if (ball_right > W_screen || ball_left < 0)
        {
            gameValue.vx *= -1;
            gameValue.ball_x = W_screen / 2;
            gameValue.ball_y = H_screen / 2;
            if (ball_right > W_screen) {
                gameValue.player1.score += 1;
                if (gameValue.player1.score === gameValue.scoreLimit)
                {
                    gameValue.gameStatus = 'finished';
                    gameValue.winner = gameValue.player1.id;
                    gameValue.ball_speed = 20;
                }

            }
            else if (ball_left < 0) {
                gameValue.player2.score += 1;
                // if (gameValue.player2.score === gameValue.scoreLimit)
                // {
                //     gameValue.gameStatus = 'finished';
                //     gameValue.winner = gameValue.player2.id;
                //     gameValue.ball_speed = 20;
                // }
            }
        }
        else if (ball_bottom >= H_screen || ball_top <= 0)
            gameValue.vy *= -1;
    }
    
    gameLoop(game : GameEntity, server : any) {
        const id = setInterval(() => {
            this.updatePaddle(game);
            this.gameLogique(game);
            this.istheGameEnd(game, id);
            server.to(game.id).emit("gameData", game);
        }, 1000 / 60);
    }

    ArrowUp(gameId : String, playerId : String) {
        const game : GameEntity = this.gameMap.get(gameId);
        if (game) {
            if (playerId === game.player1.id) {
                if (game.player1.paddleY > 0)
                    game.player1.paddleY -= game.playerSpeed;
                this.gameMap.set(gameId, game);
            }
            else if (playerId === game.player2.id) {
                if (game.player2.paddleY > 0)
                    game.player2.paddleY -= game.playerSpeed;
                this.gameMap.set(gameId, game);
            }
        }
    }

    ArrowDown(gameId : String, playerId : String) {
        const game : GameEntity = this.gameMap.get(gameId);
        if (game) {
            if (playerId === game.player1.id) {
                if (game.player1.paddleY + game.h_paddle < game.H_screen)
                game.player1.paddleY += game.playerSpeed;
                this.gameMap.set(gameId, game)   
            }
            if (playerId === game.player2.id) {
                if (game.player2.paddleY + game.h_paddle < game.H_screen)
                game.player2.paddleY += game.playerSpeed;
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

    getGameInitValue(player1Id : String, player2Id : String) : GameEntity {
        // const ballDirectionX : number = Math.round(Math.random()) === 1 ? -1 : 1;
        const _id = uuidv4();
        const newGameValue : GameEntity =  {
            id : _id,
            W_screen : 250,
            H_screen : 100,
            ball_x : 125,
            ball_y : 50,
            radius : 2,
            vx : 1 ,
            vy : 1,
            player1 : {
                id : player1Id,
                paddleX : 2,
                paddleY : 0,
                score : 0
            },
            player2 : {
                id : player2Id,
                paddleX : 248,
                paddleY : 80,
                score : 0
            },
            w_paddle : 5,
            h_paddle : 20,
            playerSpeed : 4,
            scoreLimit : 10,
            ball_speed : 2,
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
