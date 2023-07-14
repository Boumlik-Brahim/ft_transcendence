import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { ChannelModule } from './channel/channel.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [PrismaModule, GameModule, ChatModule, ChannelModule, AuthModule, UsersModule],
  // imports: [PrismaModule, GameModule, ChatModule, ChannelModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
