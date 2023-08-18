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

  @Get(':userId')
  async indAllReceivedChats(@Param('userId') userId: string): Promise<DirectMessage[]> {
    const chat = await this.chatService.findAllReceivedChats(userId)
    return chat;
  }

  @Get()
  async findAll(@Query('hashedRoomId') hashedRoomId: string): Promise<DirectMessage[]> {
    const chat = await this.chatService.findAllChats(hashedRoomId);
    return chat;
  }

  @Get('/msgNumber/:userId')
  async findMsg(@Param('userId') userId: string): Promise<number> {
    const chatnmbr = await this.chatService.findAllMsg(userId);
    console.log("....>", chatnmbr);
    return chatnmbr;
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
