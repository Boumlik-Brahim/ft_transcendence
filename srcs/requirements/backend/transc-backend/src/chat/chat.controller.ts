import { Controller, Get, Post, Body, Patch, Param, Query, Put } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { ApiTags } from '@nestjs/swagger';
import { DirectMessage } from '@prisma/client';
import { UpdateChatDto } from './dto/update-chat.dto';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async create(@Body() createChatDto: CreateChatDto): Promise<DirectMessage> { 
    const chat = await this.chatService.createChat(createChatDto);
    return chat;
  }

  // @Get()
  // async findAll(@Query('senderId') senderId: string, @Query('receiverId') receiverId: string): Promise<DirectMessage[]> {
  //   const chat = await this.chatService.findAllChats(senderId, receiverId);
  //   return chat;
  // }

  @Get()
  async findAll(@Query('hashedRoomId') hashedRoomId: string): Promise<DirectMessage[]> {
    const chat = await this.chatService.findAllChats(hashedRoomId);
    return chat;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DirectMessage> {
    const chat = await this.chatService.findOneChat(id);
    return chat;
  }

  @Put(':senderId/:receiverId')
  async update(@Param('senderId') senderId: string, @Param('receiverId') receiverId: string, @Body() updateChatDto: UpdateChatDto): Promise<void> {
    await this.chatService.updateChat(senderId, receiverId , updateChatDto);
  }
}
