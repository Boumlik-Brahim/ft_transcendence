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

    gameLogique(clients: any, gameValue : GameEntity) {
        this.isLimit(gameValue)
        gameValue.ball_x += gameValue.vx;
        gameValue.ball_y += gameValue.vy;
    }

    isLimit(gameValue : GameEntity) {
        const  {
            W_screen,
            H_screen,
            ball_x,
            ball_y,
            paddle1_x,
            paddle2_x,
            paddle1_y,
            paddle2_y,
            h_paddle,
        } = gameValue;
        if (ball_y >= paddle1_y && ball_y <= paddle1_y + h_paddle && ball_x === paddle1_x)
            gameValue.vx *= -1;
        if (ball_y >= paddle2_y && ball_y <= paddle2_y + h_paddle && ball_x === paddle2_x)
            gameValue.vx *= -1;
        if (ball_x >= W_screen || ball_x <= 0)
            gameValue.vx *= -1;
        if (ball_y >= H_screen || ball_y <= 0)
            gameValue.vy *= -1;
    }
    
    gameLoop(client1 : any) {
        const gameValue : GameEntity = this.getGameInitValue();
        setInterval(() => {
            this.gameLogique(client1, gameValue);
            client1.emit("value", gameValue);
        }, 160);
    }


    getGameInitValue() : GameEntity {
        const newGameValue : GameEntity =  {
            W_screen : 160,
            H_screen : 80,
            ball_x : 80,
            ball_y : 40,
            vx : 5,
            vy : 5,
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
