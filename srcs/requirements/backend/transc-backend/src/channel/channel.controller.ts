import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ApiTags } from '@nestjs/swagger';
import { Channel, ChannelMember } from '@prisma/client';
import { CreateChannelMemberDto } from './dto/create-channelMember.dto';
import { UpdateChannelMemberDto } from './dto/update-channelMember.dto';

@ApiTags('channel')
@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

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
  

  @Post('/member')
  async createChannelMember(@Body() createChannelMemberDto: CreateChannelMemberDto): Promise<ChannelMember> {
    const channelMember = await this.channelService.createChannelMember(createChannelMemberDto);
    return channelMember;
  }

  @Get('/member')
  async findAllChannelMembers(): Promise<ChannelMember[]> {
    const channelMembers = await this.channelService.findAllChannelMembers();
    return channelMembers;
  }
  
  @Get('/member/:id')
  async findOneChannelMember(@Param('id') id: string): Promise<ChannelMember> {
    const channelMember = await this.channelService.findOneChannelMember(id);
    return channelMember;
  }
  
  @Patch('/member/:id')
  async updateChannelMember(@Param('id') id: string, @Body() updateChannelMemberDto: UpdateChannelMemberDto): Promise<ChannelMember> {
    const updatedChannel = await this.channelService.updateChannelMember(id, updateChannelMemberDto);
    return updatedChannel;
  }
  
  @Delete(':id')
  async removeChannelMember(@Param('id') id: string): Promise<void> {
    await this.channelService.removeChannelMember(id);
  }
}
