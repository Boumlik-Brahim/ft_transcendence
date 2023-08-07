import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { GameEntity } from './game/entity/game.entity';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'prisma/prisma.service';
import { Client } from 'socket.io/dist/client';


@Injectable()
export class ConnectedClientsService {

    private connectedClients: Map<any, string> = new Map();
    private gameMap = new Map<String, GameEntity>();


    constructor(private prisma : PrismaService) {}
    
    addClient(client: Socket) {
        const userId = client.handshake.auth.userId as string;
        console.log(userId , "userId ******** ")
        this.connectedClients.set(client, userId);
        console.log(this.connectedClients.size)
        this.connectedClients.forEach((value, key) => {
            console.log(`User: ${key}, Socket ID: ${value}`);
        });
    }
    
    isUserConnected(client: Socket): boolean {
        return this.connectedClients.has(client);
    }
    
    getAllClients(): Map<string, string> {
        return this.connectedClients;
    }
    
    removeClient(client: Socket) {
        this.connectedClients.delete(client);
        this.connectedClients.forEach((value, key) => {
            console.log(`User: ${key}, Socket ID: ${value}`);
        });
    }

    getGame(id : String) : GameEntity {
        return this.gameMap.get(id);
    }

    getAllGame() { return this.gameMap}

    addGame(game : GameEntity) {
        this.gameMap.set(game.id, game);
    }

    deleteGame(id : String) {
        this.gameMap.delete(id);
    }

    /**
     * Initiate the value of the Game
     * @param player1Id 
     * @param player2Id 
     * @returns 
     */
    getGameInitValue(player1Id : String, player2Id : String) : GameEntity {
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

    async inviteAfriendToPlay(creatorId : string, invitedId : string, client : Socket) : Promise<String> {
        console.log("inside ********************** ", this.gameMap.size);
        try {
            const friend = await this.prisma.friend.findMany({
                where : {
                    OR : [
                        {
                            userId : creatorId
                        },
                        {
                            friendId : invitedId
                        }
                    ]
                }
            });
            if (!friend.length)
            {
                // client.emit('error', 'You are not allowed to play against this one');
                throw ("You are not allowed to play against this one");
                return ;
            }
            const game : GameEntity = this.getGameInitValue(creatorId, invitedId);
            this.gameMap.set(game.id, game);
            client.emit("Success", {id : game.id});
            return game.id 
        }
        catch (error) {
            client.emit("error", error);
        }
    }
}
