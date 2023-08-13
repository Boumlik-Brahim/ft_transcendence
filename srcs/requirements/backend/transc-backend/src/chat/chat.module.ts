import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './gateway/chat.gateway';
import { UsersService } from 'src/users/users.service';
import { ConnectedClientsService } from 'src/connected-clients.service';
import { AppGateway } from 'src/app.gateway';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, UsersService, ConnectedClientsService, AppGateway]
})
export class ChatModule {}
