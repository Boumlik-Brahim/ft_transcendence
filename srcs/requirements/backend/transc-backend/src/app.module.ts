import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { ChannelModule } from './channel/channel.module';

@Module({
  imports: [ChatModule, ChannelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
