import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { GameModule } from './game/game.module';
import { TestModule } from './test/test.module';
import { ChatModule } from './chat/chat.module';
import { ChannelModule } from './channel/channel.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule, GameModule, TestModule, ChatModule, ChannelModule,AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
