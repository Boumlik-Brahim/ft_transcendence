import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { ApiTags } from '@nestjs/swagger';
import { DirectMessage } from '@prisma/client';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async create(@Body() createChatDto: CreateChatDto): Promise<DirectMessage> { 
    const chat = await this.chatService.createChat(createChatDto);
    return chat;
  }

  @Get()
  async findAll(@Query('senderId') senderId: number, @Query('receiverId') receiverId: number): Promise<DirectMessage[]> {
    const chat = await this.chatService.findAllChats(+senderId, +receiverId);
    return chat;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DirectMessage> {
    const chat = await this.chatService.findOneChat(+id);
    return chat;
  }
}
