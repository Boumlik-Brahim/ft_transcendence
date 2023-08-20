import { Controller, Get, Param } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {

    constructor(private gameService : GameService) {}

    @Get('/invitations/:id')
    async getInvitaions(@Param() param : {id : string}) {
        const { id } = param;
        return await this.gameService.getInvitations(id);
    }
}
