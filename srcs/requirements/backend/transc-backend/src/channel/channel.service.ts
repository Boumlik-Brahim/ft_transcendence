import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Channel, ChannelMember } from '@prisma/client';
import { CreateChannelMemberDto } from './dto/create-channelMember.dto';
import { UpdateChannelMemberDto } from './dto/update-channelMember.dto';

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  async createChannel(createChannelDto: CreateChannelDto): Promise<Channel> {
    return this.prisma.channel.create({ data: createChannelDto })
    .catch (error => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'BadRequestException',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      });
    });
  }

  async findAllChannels(): Promise<Channel[]> {
    return this.prisma.channel.findMany({
      orderBy: {
        created_at: 'asc',
      },
    })
    .catch (error => {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'NotFoundException',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    });
  }

  async findOneChannel(id: string): Promise<Channel> {
    return this.prisma.channel.findUniqueOrThrow({
      where: {
        id
      },
    })
    .catch (error => {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'NotFoundException',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    });
  }

  async updateChannel(id: string, updateChannelDto: UpdateChannelDto): Promise<Channel> {
    return this.prisma.channel.update({
      where: {
        id
      },
      data: updateChannelDto
    })
    .catch (error => {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'InternalServerErrorException',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    });
  }

  async removeChannel(id: string): Promise<void> {
    await this.prisma.channel.delete({
      where: {
        id
      }
    })
    .catch (error => {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'InternalServerErrorException',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    });
  }


  async createChannelMember(createChannelMemberDto: CreateChannelMemberDto): Promise<ChannelMember> {
    return this.prisma.channelMember.create({ data: createChannelMemberDto })
    .catch (error => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'BadRequestException',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      });
    });
  }

  async findAllChannelMembers(): Promise<ChannelMember[]> {
    return this.prisma.channelMember.findMany({
      orderBy: {
        created_at: 'asc',
      },
    })
    .catch (error => {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'NotFoundException',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    });
  }

  async findOneChannelMember(id: string): Promise<ChannelMember> {
    return this.prisma.channelMember.findUniqueOrThrow({
      where: {
        id
      },
    })
    .catch (error => {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'NotFoundException',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    });
  }

  async updateChannelMember(id: string, updateChannelMemberDto: UpdateChannelMemberDto): Promise<ChannelMember> {
    return this.prisma.channelMember.update({
      where: {
        id
      },
      data: updateChannelMemberDto
    })
    .catch (error => {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'InternalServerErrorException',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    });
  }

  async removeChannelMember(id: string): Promise<void> {
    await this.prisma.channelMember.delete({
      where: {
        id
      }
    })
    .catch (error => {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'InternalServerErrorException',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    });
  }
}
