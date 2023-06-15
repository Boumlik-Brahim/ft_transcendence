import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [GameService, GameGateway],
  imports : [PrismaModule]
})
export class GameModule {}
