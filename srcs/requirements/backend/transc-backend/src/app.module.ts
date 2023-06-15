import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { TestModule } from './test/test.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [GameModule, TestModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
