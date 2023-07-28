import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { ChannelModule } from './channel/channel.module';
import { GameModule } from './game/game.module';
import { UsersModule } from './users/users.module';

import { AppGateway } from './app.gateway';

@Module({
  imports: [PrismaModule, GameModule, ChatModule, ChannelModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule { }
