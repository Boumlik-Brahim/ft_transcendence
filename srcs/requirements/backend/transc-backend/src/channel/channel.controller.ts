import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ApiTags } from '@nestjs/swagger';
import { Channel, ChannelMember, ChannelMessage, KickedMember } from '@prisma/client';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { CreateChannelMemberDto } from './dto/create-channelMember.dto';
import { UpdateChannelMemberDto } from './dto/update-channelMember.dto';
import { CreateKickedMemberDto } from './dto/create-kickedMember.dto';
import { CreateChannelMessageDto } from './dto/create-channelMessage.dto';

@ApiTags('channel')
@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  //* -------------------------------------------------------------channelCRUDOp-------------------------------------------------------- *//
  @Post()
  async create(@Body() createChannelDto: CreateChannelDto): Promise<Channel> {
    const channel = await this.channelService.createChannel(createChannelDto)
    return channel;
  }
  
  @Get()
  async findAll(): Promise<Channel[]> {
    const channels = await this.channelService.findAllChannels();
    return channels;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Channel> {
    const channel = await this.channelService.findOneChannel(id);
    return channel;
  }
  
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateChannelDto: UpdateChannelDto): Promise<Channel> {
    const updatedChannel = await this.channelService.updateChannel(id, updateChannelDto);
    return updatedChannel;
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.channelService.removeChannel(id);
  }
  //* -------------------------------------------------------------channelCRUDOp-------------------------------------------------------- *//

  //* ----------------------------------------------------------channelMemberCRUDOp----------------------------------------------------- *//
  @Post('/member')
  async createChannelMember(@Body() createChannelMemberDto: CreateChannelMemberDto): Promise<ChannelMember> {
    const channelMember = await this.channelService.createChannelMember(createChannelMemberDto);
    return channelMember;
  }
  
  @Get('/:channelId/member')
  async findAllChannelMembers(@Param('channelId') channelId: string): Promise<ChannelMember[]> {
    const channelMembers = await this.channelService.findAllChannelMembers(channelId);
    return channelMembers;
  }
  
  @Get('/:channelId/member/:id')
  async findOneChannelMember(@Param('channelId') channelId: string, @Param('id') id: string): Promise<ChannelMember> {
    const channelMember = await this.channelService.findOneChannelMember(channelId, id);
    return channelMember;
  }
  
  @Patch('/:channelId/member/:id')
  async updateChannelMember(@Param('channelId') channelId: string, @Param('id') id: string, @Body() updateChannelMemberDto: UpdateChannelMemberDto): Promise<ChannelMember> {
    const updatedChannel = await this.channelService.updateChannelMember(channelId, id, updateChannelMemberDto);
    return updatedChannel;
  }
  
  @Delete('/:channelId/member/:id')
  async removeChannelMember(@Param('channelId') channelId: string, @Param('id') id: string): Promise<void> {
    await this.channelService.removeChannelMember(channelId, id);
  }
  //* ----------------------------------------------------------channelMemberCRUDOp----------------------------------------------------- *//
  
  //* ----------------------------------------------------------kickedMemberCRUDOp------------------------------------------------------ *//
  @Post('/kickedMember')
  async createKickedMember(@Body() createKickedMemberDto: CreateKickedMemberDto): Promise<KickedMember> {
    const kickedMember = await this.channelService.createKickedMember(createKickedMemberDto);
    return kickedMember;
  }
  
  @Get('/:channelId/kickedMember')
  async findAllKickedMembers(@Param('channelId') channelId: string): Promise<KickedMember[]> {
    const kickedMembers = await this.channelService.findAllKickedMembers(channelId);
    return kickedMembers;
  }
  
  @Get('/:channelId/kickedMember/:id')
  async findOneKickedMember(@Param('channelId') channelId: string, @Param('id') id: string): Promise<KickedMember> {
    const kickedMember = await this.channelService.findOneKickedMember(channelId, id);
    return kickedMember;
  }
  
  @Delete('/:channelId/kickedMember/:id')
  async removeKickedMember(@Param('channelId') channelId: string, @Param('id') id: string): Promise<void> {
    await this.channelService.removeKickedMember(channelId, id);
  }
  //* ----------------------------------------------------------kickedMemberCRUDOp------------------------------------------------------ *//
  
  //* ----------------------------------------------------------channelMessageCRUDOp---------------------------------------------------- *//
  @Post('/channelMessage')
  async createChannelMessage(@Body() createChannelMessageDto: CreateChannelMessageDto): Promise<ChannelMessage> {
    const channelMessage = await this.channelService.createChannelMessage(createChannelMessageDto);
    return channelMessage;
  }
  
  @Get('/:channelId/channelMessage')
  async findAllChannelMessages(@Param('channelId') channelId: string): Promise<ChannelMessage[]> {
    const channelMessages = await this.channelService.findAllChannelMessages(channelId);
    return channelMessages;
  }

  @Get('/:channelId/channelMessage/:id')
  async findOneChannelMessage(@Param('channelId') channelId: string, @Param('id') id: string): Promise<ChannelMessage> {
    const channelMessage = await this.channelService.findOneChannelMessage(channelId, id);
    return channelMessage;
  }

  @Delete('/:channelId/channelMessage/:id')
  async removeChannelMessage(@Param('channelId') channelId: string, @Param('id') id: string): Promise<void> {
    await this.channelService.removeChannelMessage(channelId, id);
  }
  //* ----------------------------------------------------------channelMessageCRUDOp---------------------------------------------------- *//


  @Get('/:channelId/admin')
  async findAllChannelAdmins(@Param('channelId') channelId: string): Promise<ChannelMember[]> {
    const channelAdmins = await this.channelService.findAllChannelAdmins(channelId);
    return channelAdmins;
  }

  @Get('/:channelId/bannedMember')
  async findAllBannedMembers(@Param('channelId') channelId: string): Promise<ChannelMember[]> {
    const bannedMembers = await this.channelService.findAllBannedMembers(channelId);
    return bannedMembers;
  }

  @Get('/:channelId/mutedMember')
  async findAllMutedMembers(@Param('channelId') channelId: string): Promise<ChannelMember[]> {
    const mutedMembers = await this.channelService.findAllMutedMembers(channelId);
    return mutedMembers;
  }
}
