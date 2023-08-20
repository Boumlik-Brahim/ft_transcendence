import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { GameEntity, Player } from './entity/game.entity';
import { v4 as uuidv4 } from 'uuid';
import { Server, Socket } from 'socket.io';
import { CANCELLED } from 'dns';
import { time } from 'console';

interface GameInvitation {
    id : string,
    senderId : string
}

@Injectable()
export class GameService {
    private gameMap = new Map<String, GameEntity>();
    private usersConnected = new Map<string, Socket>();
    private inTheQueue : String | null;
    private Vitesse = 0.1;

    constructor(private prisma : PrismaService) {}

    /**
     * This is end point to obtain all pending invitaion for a specific user
     * @param id 
     * @returns 
     */
    async getInvitations(id : string)  {
        const invitations = await this.prisma.gamesInvitation.findMany ({
            where : {
                AND : [
                    {
                        receiverId : id,
                        status : 'PENDING'
                    }
                ]
            }
        });
        const notifications = await Promise.all(invitations.map(async (invit) => {
            const user = await this.prisma.user.findUnique({
                where : {
                    id : invit.senderId
                }
            });
            return {id : invit.id, message : `${user.name} invited you to play a game`, userImg : user.Avatar}
        }))
        return notifications;
    }

    /**
     *  Add user in the connected user map
     * @param id 
     * @param socket 
     */

    addUser(id : string, socket : Socket) {
        this.usersConnected.set(id, socket);
    }

    isConneted (id : string, client : Socket) : boolean {
        // const _client : Socket = this.usersConnected.get(id);
        // if (_client && client.id === _client.id)
        //     return true;
        // else {
        //     return false;
        // }
        return true;
    }

    /**
     * Delete user inthe connected user map
     * @param socket 
     * @returns 
     */
    deleteUser(socket : Socket) {
        const arrayOfUserConnected = Array.from(this.usersConnected.values());
        const indexToDelete = arrayOfUserConnected.findIndex((_socket) => socket.id === _socket.id);
        if (indexToDelete != -1) {
            const keyToDelete = Array.from(this.usersConnected.keys())[indexToDelete]
            this.usersConnected.delete(keyToDelete);
        }
    }

    /**
     * Logique for inviting your friend to play Check if the Oponent is your friend
     * @param creatorId 
     * @param invitedId 
     * @param client 
     * @returns 
     */
    async inviteAfriend(senderId : string, receiverId : string, client : Socket, maxScore? : number) {
        const receiverSocket : Socket = this.usersConnected.get(receiverId);
        const score = maxScore ? maxScore : 10;
        try {
            const sender = await this.prisma.user.findUnique({
                where : {
                    id : senderId
                }
            });
            const receiver = await this.prisma.friend.findMany({
                where : {
                    OR : [
                        {
                            AND : [
                                {
                                    userId : senderId
                                },
                                {
                                    friendId : receiverId
                                }
                            ]
                        },
                        {
                            AND : [
                                {
                                    userId : receiverId
                                },
                                {
                                    friendId : senderId
                                }
                            ]
                        }
                    ]
                }
            });
            if (!receiver.length)
            {
                client.emit('error', 'You are not allowed to play against this one');
                return ;
            }
            const game : GameEntity = this.getGameInitValue(senderId, receiverId, score);
            this.gameMap.set(game.id, game);
            await this.prisma.gamesInvitation.create({
                data : {
                    senderId,
                    receiverId,
                    status : 'PENDING',
                    gameId : game.id as string
                }
            });
            client.emit("Success", {id : game.id});
            if (receiverSocket) {
                receiverSocket.emit('gameInvitation');
            }
        }
        catch (error) {
            client.emit("error", error);
        }
    }

    /**
     * Reject Invitation From Another user
     * @param client 
     * @param invitationId 
     * @param userId 
     * @returns 
     */

    async rejectInvitation (client : Socket, invitationId : string, userId : string) {
        try {
            const user = await this.prisma.user.findUnique({
                where : {
                    id : userId,
                }
            });
            const invitation = await this.prisma.gamesInvitation.findUnique({
                where : { id : invitationId }
            })
            if (!invitation || !user || invitation.status !== 'PENDING' || userId !== invitation.receiverId) return ;
            const { gameId, senderId} = invitation;
            this.gameMap.delete(gameId);
            await this.prisma.gamesInvitation.update({
                where : {
                    gameId
                }, 
                data : {
                    status : 'REJECTED'
                }
            });
            const senderSocket = this.usersConnected.get(senderId);
            if (senderSocket)
            {
                senderSocket.emit('error_access');
            }
            client.emit('gameInvitation');
        }
        catch (error) {
            client.emit("error", error);
        }
    }

    /**
     * Accept Invitation From Another User
     * @param client 
     * @param invitationId 
     * @param userId 
     * @returns 
     */
    async AcceptInvitation (client : Socket, invitationId : string, userId : string) {
        try {
            const user = await this.prisma.user.findUnique({
                where : {
                    id : userId,
                }
            });
            const invitation = await this.prisma.gamesInvitation.findUnique({
                where : { id : invitationId }
            })
            if (!invitation || !user || invitation.status !== 'PENDING' || userId !== invitation.receiverId) return ;
            const { gameId, receiverId} = invitation;
            await this.prisma.gamesInvitation.update({
                where : {
                    gameId
                }, 
                data : {
                    status : 'ACCEPTED'
                }
            });
            const receiverSocket = this.usersConnected.get(receiverId);
            if (receiverSocket)
            {
               receiverSocket.emit('AcceptedGame', {gameId : gameId});
            }
        }
        catch (error) {
            client.emit("error", error);
        }
    }

    /**
     * Here is The logique about maching and joining a queue to wait a Oponent
     * @param creatorId 
     * @param client 
     * @returns 
     */
    async joinAqueue(creatorId : string, client : Socket) {
        const maxScore = 10;
        if (this.inTheQueue == null) {
            const game : GameEntity = this.getGameInitValue(creatorId, '', 10);
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
    
    /**
     * Create a new game Or join a queue Loqigue
     * @param data 
     * @param client 
     * @returns 
    */
   async createGame(data, client : Socket)  {
        const { invitedId, creatorId, isRamdomOponent, maxScore } = data;
        if (!isRamdomOponent) this.inviteAfriend(creatorId, invitedId, client, maxScore);
        else this.joinAqueue(creatorId, client);
}

/**
 * Update User Status if he's in the Game or Not
 * @param userId 
 * @param inThegame 
 */
async updateUserSatusInTheGame (userId : string, inThegame : boolean) {
    const status = inThegame ? 'INAGAME' : 'ONLINE';
    try {
        await this.prisma.user.update({
            where : {
                id : userId
            },
            data : {
                status : status
            }
        })
    }
    catch (error) {}
}


/**
 * Here is the Logique about joining a game room
 * if a user join the game can start if all players joined Or the user will wait for his Oponent
 * @param userId 
 * @param gameId 
 * @param client 
 * @param server 
 * @returns 
*/
async joinGame(userId : string, gameId : string, client : Socket, server : Server) {
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
            console.log(game);
            client.emit('gameSate', {state : game.gameStatus.status});
            client.emit('gameData', game);
            if (userId === game.player1.id)
            {
                game.player1.inThegame = true;
            }
            else
            {
                game.player2.inThegame = true;
            }
            this.updateUserSatusInTheGame(userId, true);
            if (game.player1.inThegame && game.player2.inThegame)
            {
                if (game.gameStatus.status !== 'pause' )
                {
                    game.gameStatus.status = 'started';
                    server.to(gameId).emit('gameSate', {state : game.gameStatus.status});
                    this.gameLoop(game, server);
                }
            }
        }
        catch (error) {
            console.log(error);
            client.emit("error", error);
        }
    }


    /**
     * Here is The logique about the Game
     * @param gameValue 
     */
    gameLogique(gameValue : GameEntity, deltaTime : number) {
        this.collision(gameValue)
        gameValue.ball_x += gameValue.vx * gameValue.ball_speed;
        gameValue.ball_y += gameValue.vy  * gameValue.ball_speed;
    }

    /**
     * This is logique Of The collosion of the ball, And all logique mathematic, changement of the score and the game status changement
     * @param gameValue 
     */
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
        const ball_top = ball_y - radius;
        const ball_right = ball_x + radius;
        const ball_bottom = ball_y + radius;
        const paddle1_surface = player1.paddleX + w_paddle;
        const paddle2_surface = player2.paddleX;
        const paddle1_bottom = player1.paddleY + h_paddle;
        const paddle2_bottom = player2.paddleY + h_paddle;
        const paddle1_top = player1.paddleY;
        const paddle2_top = player2.paddleY;

        if (ball_right <= 0 || ball_right >= gameValue.W_screen)
        {
            gameValue.ball_x = W_screen / 2;
            gameValue.ball_y = H_screen / 2;
            if (ball_right < 0) {
                gameValue.player2.score += 1;
                if (gameValue.player2.score === gameValue.scoreLimit)
                {
                    gameValue.gameStatus.status = 'finished';
                    gameValue.winner = gameValue.player2.id;
                }
            }
            else if (ball_right > gameValue.W_screen) {
                gameValue.player1.score += 1;
                if (gameValue.player1.score === gameValue.scoreLimit)
                {
                    gameValue.gameStatus.status = 'finished';
                    gameValue.winner = gameValue.player1.id;
                }
            }
        }
        else if (ball_y - radius <= 0 || ball_y + radius >= H_screen)
        {
            gameValue.vy *= -1;
        }

        else if (ball_left <= paddle1_surface && ball_top < paddle1_bottom && ball_bottom > paddle1_top && gameValue.vx < 0) 
        {
            const maxScore = 2;
            if (gameValue.ball_speed < maxScore) gameValue.ball_speed += this.Vitesse;
            if ((ball_left < paddle1_surface && ball_y > paddle1_bottom && gameValue.vy < 0) ||  (ball_left > paddle1_surface &&  ball_y < paddle1_top && gameValue.vy > 0)) {
                // gameValue.vy *= -1;
            }
            else {
                gameValue.vx *= -1;
            }
        } 
        else if (ball_right >= paddle2_surface && ball_top < paddle2_bottom && ball_bottom > paddle2_top && gameValue.vx > 0)
        {
            const maxScore = 2;
            if (gameValue.ball_speed < maxScore) gameValue.ball_speed += this.Vitesse;
            if ((ball_right > paddle2_surface && ball_y > paddle2_bottom && gameValue.vy < 0) ||  (ball_right > paddle2_surface &&  ball_y < paddle2_top && gameValue.vy > 0)) {
                // gameValue.vy *= -1;
            }
            else {
                gameValue.vx *= -1;
            }
        }
        
    }
    
    /**
     * This is the loop Of the game
     * @param game 
     * @param server 
     */
    gameLoop(game : GameEntity, server : any) {
        let lastTimestamp = performance.now();
        const id = setInterval(() => {
            const currentTimestamp = performance.now();
            const deltaTime = (currentTimestamp - lastTimestamp) / 1000
            if (game.gameStatus.status === 'started')
            {
                this.updatePaddle(game);
                this.gameLogique(game, deltaTime);
            }
            server.to(game.id).emit("gameData", game);
            this.istheGameEnd(game, id, server);
            lastTimestamp = currentTimestamp;
        }, 16);
    }

    /**
     * move up the paddle 
     * @param gameId 
     * @param playerId 
     * @param client 
     */
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

    /**
     * move down the paddle
     * @param gameId 
     * @param playerId 
     * @param client 
     */    
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

    /**
     * Update players paddle
     * @param currentGame 
     */
    
    updatePaddle(currentGame : GameEntity) {
        const game : GameEntity = this.gameMap.get(currentGame.id);
        if (game)
        {
            currentGame.player1.paddleY = game.player1.paddleY;
            currentGame.player2.paddleY = game.player2.paddleY;
        }
    }

    /**
     * save the game values in the dataBase
     * @param playerA 
     * @param playerB 
     */
    async SaveGameHistory (playerA : Player, playerB : Player) {
        await this.prisma.gamesHistories.create({ 
            data : {
                playerA_id : playerA.id as string,
                playerA_Score : playerA.score,
                playerB_id : playerB.id as string,
                playerB_Score : playerB.score
        }});
    }
    
    /**
     * Initiate the value of the Game
     * @param player1Id 
     * @param player2Id 
     * @returns 
     */
    getGameInitValue(player1Id : String, player2Id : String, maxScore : number) : GameEntity {
        const _id = uuidv4();
        const newGameValue : GameEntity =  {
            id : _id,
            W_screen : 250,
            H_screen : 100,
            ball_x : 125,
            ball_y : 50,
            radius : 4,
            vx : 1,
            vy : 0.5,
            player1 : {
                id : player1Id,
                inThegame : false,
                paddleX : 5,
                paddleY : 0,
                score : 0
            },
            player2 : {
                id : player2Id,
                inThegame : false,
                paddleX : 235,
                paddleY : 80,
                score : 0
            },
            w_paddle : 10,
            h_paddle : 20,
            playerSpeed : 8,
            scoreLimit : maxScore,
            ball_speed : 1,
            gameStatus  : {
                update_t : new Date().getTime(),
                status : 'waiting'
            },
            winner : null
        }
        return newGameValue;
    }

    /**
     * Update the user values inside the database
     * @param userId 
     */
    async updateWinner(userId : string) {
        try {
            const userSate = await this.prisma.userStat.findUnique({
                where : {
                    userId: userId
                }
            });
            if (!userSate) {
                console.log("IF Fodi");
                const p = await this.prisma.userStat.create({
                    data: {
                        winsNumbr : 1,
                        lossesNumbr : 0,
                        rate : 0.2,
                        userId : userId
                    },
                });
            }
            else {
                // const _rate = (userSate.winsNumbr + 1) / 5
                await this.prisma.userStat.update({
                    where: {
                      userId : userId
                    },
                    data: {
                      winsNumbr : {increment: 1},
                      rate : {increment: 0.2}
                    },
                });
            }
        }
        catch (error) {
            console.log(error);
        }
        console.log(" fode oulare ");
    }

    /**
     * Update the loser Value inside the Database
     * @param userId 
     */
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
                        rate : 0,
                        userId : userId
                    },
                });
            }
            else {
                await this.prisma.userStat.update({
                    where: {
                      userId : userId
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

    /**
     * Check if the waiting time is finished
     * 
     */
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
            this.gameMap.set(game.id, game);
       }
    }

    /**
     * Check if the game is finished
     * @param game 
     * @param intervalId 
     * @param server 
     */
    istheGameEnd(game : GameEntity, intervalId, server : any) {
        const { gameStatus } = game;
        if (gameStatus.status === 'stopped')
        {
            this.checkTimeToEnd(game.gameStatus.update_t, 30, game);
        } 
        if (gameStatus.status === 'finished')
        {
            if (game.player1.inThegame) this.updateUserSatusInTheGame(game.player1.id as string, false);
            if (game.player2.inThegame) this.updateUserSatusInTheGame(game.player2.id as string, false);
            server.to(game.id).emit('gameSate', {state : game.gameStatus.status});
            if (game.winner)
            {
                const loserId : String = game.winner === game.player1.id ? game.player2.id : game.player1.id;
                this.updateLoser(loserId as string);
                this.updateWinner(game.winner as string);
            }
            this.SaveGameHistory(game.player1, game.player2);
            this.gameMap.delete(game.id);
            clearInterval(intervalId);
        }
    }

    /**
     * Get a game inside the map and check if the user is a player otherwise return null
     * @param playerId 
     * @param gameId 
     * @param client 
     * @returns 
     */

    getGame(playerId : String, gameId : String, client : any) : GameEntity | null {
        const game : GameEntity = this.gameMap.get(gameId);
        if (game && (playerId === game.player1.id || playerId === game.player2.id))
            return game;
        return null;
    }


    /**
     * Quit a game maybe by accident or by yourself, we are gonna wait for a moment after that the game will finish
     * @param playerId 
     * @param gameId 
     * @param client 
     */

    async quiteGame(playerId : String, gameId : String, client : any) {
        const game : GameEntity = this.getGame(playerId, gameId, client);
        if (game) {
            if (game.id === this.inTheQueue)
            {
                this.inTheQueue = null;
                this.gameMap.delete(game.id);
            }
            else
            {
                if (playerId === game.player1.id)
                    game.player1.inThegame = false;
                else
                    game.player2.inThegame = false;
                if (game.gameStatus.status !== 'waiting')
                {
                    game.gameStatus.status = 'stopped';
                    game.gameStatus.update_t = new Date().getTime();
                    this.gameMap.set(gameId, game);
                }
                else {
                    await this.prisma.gamesInvitation.update({
                        where : {
                            gameId : gameId as string
                        }, 
                        data : {
                            status : 'CANCELED'
                        }
                    });
                    this.gameMap.delete(gameId);
                }
            }
            this.updateUserSatusInTheGame(playerId as string, false);
            client.leave(gameId);
        }
    }
}
