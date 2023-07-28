import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { GameEntity, Player } from './entity/game.entity';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';

@Injectable()
export class GameService {
    private gameMap = new Map<String, GameEntity>();
    private inTheQueue : String | null;

    constructor(private prisma : PrismaService) {}
    async createGame(data, client : any)  {
        const { invitedId, creatorId, isRamdomOponent } = data;
        if (!isRamdomOponent) {
            try {
                const user =  this.prisma.user.findUnique({
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
                if (creatorId === gameJoined.player1.id) return;
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
                client.emit("error_access");
                return;
            }
            if (userId !== game.player1.id && userId !== game.player2.id) {
                client.emit("error_access");
                return;
            }
            client.join(gameId);
            client.emit('gameSate', {state : game.gameStatus.status});
            const nbrClientRequire = 2;
            const rooms = server.adapter.rooms.get(gameId)
            if (userId === game.player1.id)
            {
                game.player1.inThegame = true;
            }
            else
            {
                game.player2.inThegame = true;
            }
            if (rooms && rooms.size === nbrClientRequire) {
                console.log(game.player1.inThegame, game.player2.inThegame);
                if (game.gameStatus.status !== 'pause' && game.player1.inThegame && game.player2.inThegame)
                {
                    game.gameStatus.status = 'started';
                }
                server.to(gameId).emit('gameSate', {state : game.gameStatus.status});
                this.gameLoop(game, server);
            }
        }
        catch (error) {
            console.log(error);
            client.emit("error", error);
        }
    }

    gameLogique(gameValue : GameEntity) {
        this.collision(gameValue)
        gameValue.ball_x += (gameValue.vx * gameValue.ball_speed);
        gameValue.ball_y += (gameValue.vy * gameValue.ball_speed );
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
            w_paddle,
            player2,
            h_paddle,
        } = gameValue;

        const ball_left = ball_x - radius;
        const ball_right = ball_x + radius;
        const ball_top = ball_y - radius;
        const ball_bottom = ball_y + radius;

        const paddle_middle = h_paddle / 2;
        const paddle1_surface = player1.paddleX + w_paddle;
        const paddle2_surface = player2.paddleX;
        const paddle1_bottom = player1.paddleY + h_paddle;
        const paddle2_bottom = player2.paddleY + h_paddle;
        const paddle1_top = player1.paddleY;
        const paddle2_top = player2.paddleY;

        if (ball_left <= paddle1_surface && ball_y > paddle1_top && ball_y < paddle1_bottom)
        {
            gameValue.ball_speed += 0.1;
            const angle = this.paddleCollisionAngle(ball_y, paddle1_top, paddle_middle);
            gameValue.vx = gameValue.ball_speed * Math.cos(angle);
            gameValue.vy = gameValue.ball_speed * Math.sin(angle);
            if (gameValue.vx < 0)
            {
                gameValue.vx *= -1;
            }
        }
        else if (ball_right >= paddle2_surface && ball_y > paddle2_top && ball_y < paddle2_bottom)
        {
            gameValue.ball_speed += 0.1;
            const angle = this.paddleCollisionAngle(ball_y, paddle2_top, paddle_middle);
            gameValue.vx = gameValue.ball_speed * Math.cos(angle);
            gameValue.vy = gameValue.ball_speed * Math.sin(angle);
            if (gameValue.vx > 0)
            {
                gameValue.vx *= -1;
            }
        }  
        else if (ball_right > W_screen || ball_left < 0)
        {
            gameValue.ball_speed = 1;
            gameValue.vx *= -1;
            gameValue.ball_x = W_screen / 2;
            gameValue.ball_y = H_screen / 2;
            if (ball_right > W_screen) {
                gameValue.player1.score += 1;
                if (gameValue.player1.score === gameValue.scoreLimit)
                {
                    gameValue.gameStatus.status = 'finished';
                    gameValue.winner = gameValue.player1.id;
                }
            }
            else if (ball_left < 0) {
                gameValue.player2.score += 1;
                if (gameValue.player2.score === gameValue.scoreLimit)
                {
                    gameValue.gameStatus.status = 'finished';
                    gameValue.winner = gameValue.player2.id;
                }
            }
        }
        else if (ball_bottom > H_screen || ball_top < 0)
        {
            gameValue.vy *= -1;
        }
    }
    
    gameLoop(game : GameEntity, server : any) {
        const id = setInterval(() => {
            this.updatePaddle(game);
            if (game.gameStatus.status === 'started')
            {
                this.gameLogique(game);
            }
            server.to(game.id).emit("gameData", game);
            this.istheGameEnd(game, id, server);
        }, 1000 / 60);
    }

    ArrowUp(gameId : String, playerId : String, client : any) {
        const game : GameEntity = this.getGame(playerId, gameId, client);
        if (game && game.gameStatus.status === 'started') {
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

    ArrowDown(gameId : String, playerId : String, client : any) {
        const game : GameEntity = this.getGame(playerId, gameId, client);
        if (game && game.gameStatus.status === 'started') {
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
            radius : 4,
            vx : 1,
            vy : 1,
            player1 : {
                id : player1Id,
                inThegame : false,
                paddleX : 10,
                paddleY : 0,
                score : 0
            },
            player2 : {
                id : player2Id,
                inThegame : false,
                paddleX : 230,
                paddleY : 80,
                score : 0
            },
            w_paddle : 10,
            h_paddle : 20,
            playerSpeed : 8,
            scoreLimit : 10,
            ball_speed : 1,
            gameStatus  : {
                update_t : new Date().getTime(),
                status : 'waiting'
            },
            winner : null
        }
        return newGameValue;
    }

    async updateWinner(userId : string) {
        try {
            const userSate = await this.prisma.userStat.findUnique({
                where : {
                    userId: userId
                }
            });
            if (!userSate) {
                await this.prisma.userStat.create({
                    data: {
                        winsNumbr : 1,
                        lossesNumbr : 0,
                        rate : 0.5,
                        userId
                    },
                });
            }
            else {
                await this.prisma.userStat.update({
                    where: {
                      userId
                    },
                    data: {
                      winsNumbr : {increment: 1},
                      rate : {increment : 0.5}
                    },
                })
            }
        }
        catch (error) {

        }
    }

    async updateLoser(userId : string) {
        try {
            const userSate = await this.prisma.userStat.findUnique({
                where : {
                    userId: userId
                }
            });
            if (!userSate) {
                await this.prisma.userStat.create({
                    data: {
                        winsNumbr : 0,
                        lossesNumbr : 1,
                        rate : 0.5,
                        userId
                    },
                });
            }
            else {
                await this.prisma.userStat.update({
                    where: {
                      userId
                    },
                    data: {
                        lossesNumbr : {increment: 1}
                    },
                })
            }
        }
        catch (error) {

        }
    }

    checkTimeToEnd(updateTime : number, maxTimeInsecond : number, game : GameEntity) {
       const time = updateTime + (maxTimeInsecond * 1000);
       const current = new Date();
       if (current.getTime() >= time)
       {
            game.gameStatus.status = 'finished';
            if (game.player1.score >  game.player2.score)
                game.winner = game.player1.id;
            else if (game.player1.score <  game.player2.score)
                game.winner = game.player2.id;
       }
    }

    istheGameEnd(game : GameEntity, intervalId, server : any) {
        const { gameStatus } = game;
        if (gameStatus.status === 'stopped')
        {
            this.checkTimeToEnd(game.gameStatus.update_t, 10, game);
        } 
        if (gameStatus.status === 'finished' || gameStatus.status === 'canceled')
        {
            server.to(game.id).emit('gameSate', {state : game.gameStatus.status});
            if (game.winner)
            {
                const loserId : String = game.winner === game.player1.id ? game.player2.id : game.player1.id;
                this.updateLoser(loserId as string);
                this.updateWinner(game.winner as string);
            }
            this.gameMap.delete(game.id);
            clearInterval(intervalId);
        }
    }

    getGame(playerId : String, gameId : String, client : any) : GameEntity | null {
        const game : GameEntity = this.gameMap.get(gameId);
        if (game && (playerId === game.player1.id || playerId === game.player2.id))
            return game;
        return null;
    }


    pauseOrSart(playerId : String, gameId : String, client : any) {
        const game : GameEntity = this.getGame(playerId, gameId, client);
        if (game) {
            game.gameStatus.status = game.gameStatus.status === 'pause' ? 'started' : 'pause';
            game.gameStatus.update_t = new Date().getTime();
            this.gameMap.set(gameId, game);
        }
    }

    cancelGame(playerId : String, gameId : String, client : any) {
        const game : GameEntity = this.getGame(playerId, gameId, client);
        if (game) {
            if (game.gameStatus.status === 'waiting')
            {
                if (game.id === this.inTheQueue)
                    this.inTheQueue = null;
                this.gameMap.delete(gameId);
                client.emit('error_access');
            }
            else
            {
                if (playerId === game.player1.id)
                    game.winner = game.player2.id
                else
                    game.winner = game.player1.id
                game.gameStatus.status = 'canceled';
                this.gameMap.set(gameId, game)
            }
        }
    }

    quiteGame(playerId : String, gameId : String, client : any) {
        const game : GameEntity = this.getGame(playerId, gameId, client);
        if (game) {
            if (game.gameStatus.status === 'waiting' || game.id === this.inTheQueue)
            {
                console.log('fode oulae')
                if (game.id === this.inTheQueue)
                    this.inTheQueue = null;
                this.gameMap.delete(gameId);
            }
            {
                if (playerId === game.player1.id)
                    game.player1.inThegame = false;
                else
                    game.player2.inThegame = false;
                game.gameStatus.status = 'stopped';
                game.gameStatus.update_t = new Date().getTime();
                this.gameMap.set(gameId, game);
            }
        }
    }
}
