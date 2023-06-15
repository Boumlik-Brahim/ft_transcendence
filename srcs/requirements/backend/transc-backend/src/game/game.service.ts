import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Game, Prisma } from '@prisma/client';
import { GameEntity } from './entity/game.entity';

@Injectable()
export class GameService {

    constructor(private prisma : PrismaService) {}
    async createGame(creatorID : String, invitedName : String, client : any)  {
        // try {
        //     const creator = await this.prisma.user.findUnique({
        //         where : {
        //             // id : creatorID
        //         }
        //     })
        // }
        // catch (error) {

        // }
    }

    joinGame(userId : any, gameID : any) {}

    gameLogique(clients: any) {
        
    }
    
    gameLoop(client1 : any) {
        const gameValue : GameEntity = this.getGameInitValue();
        setInterval(() => {
            this.gameLogique(client1);
        }, 16);
    }


    getGameInitValue() : GameEntity {
        const newGameValue : GameEntity =  {
            W_screen : 160,
            H_screen : 80,
            ball_x : 80,
            ball_y : 40,
            vx : 1,
            vy : 1,
            paddle1_x : 2,
            paddle2_x : 38,
            paddle1_y : 30,
            paddle2_y : 30,
            w_paddle : 20,
            h_paddle : 20,
            playerSpeed : 2,
        }
        return newGameValue;
    }
}
