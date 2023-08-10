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
import { ConnectedClientsService } from './connected-clients.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule, GameModule, ChatModule, ChannelModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, AppGateway, ConnectedClientsService],
  exports: [ConnectedClientsService]
})
export class AppModule { }
