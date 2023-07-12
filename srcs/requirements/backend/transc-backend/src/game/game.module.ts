import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';

@Module({
  providers: [GameService, GameGateway],
  imports : [PrismaModule]
})
export class GameModule {}
