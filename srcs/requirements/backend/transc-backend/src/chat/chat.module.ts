import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './gateway/chat.gateway';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ChatController],
  providers: [PrismaService, ChatService, ChatGateway]
})
export class ChatModule {}
