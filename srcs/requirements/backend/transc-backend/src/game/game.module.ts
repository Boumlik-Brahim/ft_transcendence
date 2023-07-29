import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { ConnectedClientsService } from 'src/connected-clients.service';

@Module({
  providers: [GameService, GameGateway, ConnectedClientsService],
  imports : [PrismaModule]
})
export class GameModule {}
