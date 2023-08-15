/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Channel, ChannelMember, ChannelMessage, KickedMember } from '@prisma/client';
import { CreateChannelMemberDto } from './dto/create-channelMember.dto';
import { UpdateChannelMemberDto } from './dto/update-channelMember.dto';
import { CreateKickedMemberDto } from './dto/create-kickedMember.dto';
import { CreateChannelMessageDto } from './dto/create-channelMessage.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  //* -------------------------------------------------------------channelServices-------------------------------------------------------- *//
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
  
  async findAllChannels(userId: string): Promise<Channel[]> {
    return this.prisma.channel.findMany({
      where: {
        OR: [
          {
            channelType: 'PUBLIC',
          },
          {
            channelType: 'PROTECTED',
          },
        ],
        channelMember: {
          none: {
            userId: userId
          }
        },
      },
      include: {
        _count: {
          select: {
            channelMember: {}
          }
        }
      },
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

  async findMyAllChannels(userId: string): Promise<Channel[]> {
    return this.prisma.channel.findMany({
      where: {
        channelMember: {
          some: {
            userId: userId,
          }
        }
      },
      include: {
        _count: {
          select: {
            channelMember: {}
          }
        }
      },
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
      include: {
        _count: {
          select: {
            channelMember: {}
          }
        }
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
  
  async updateChannel(id: string, channelName: string): Promise<Channel> {
    return this.prisma.channel.update({
      where: {
        id
      },
      data: {
        channelName: channelName,
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

  async getPrivateChannelUUID(id: string): Promise<string> {
    const channel = await this.findOneChannel(id);
    if (channel.channelType === 'PRIVATE'){
      return channel.id;
    }
  }
  //* -------------------------------------------------------------channelServices-------------------------------------------------------- *//

  //* ----------------------------------------------------------channelMemberServices----------------------------------------------------- *//
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
    
  async findAllChannelMembers(channelId: string): Promise<ChannelMember[]> {
    return this.prisma.channelMember.findMany({
      where: {
        channelId,
        role: 'MEMBER'
      },
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
  
  async findOneChannelMember(channelId: string, userId: string): Promise<ChannelMember> {
    return this.prisma.channelMember.findUnique({
      where: {
        userAndChannel: {
          userId: userId,
          channelId: channelId
        },
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
  
  async updateChannelMember(channelId: string, userId: string, updateChannelMemberDto: UpdateChannelMemberDto): Promise<ChannelMember> {
    return this.prisma.channelMember.update({
      where: {
        userAndChannel: {
          userId,
          channelId
        },
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

  async updateChannelMemberBannedTime(channelId: string, userId: string, bannedTime: string): Promise<ChannelMember> {
    const unbanneTime = new Date();
    const bannTime = new Date(bannedTime);
    if (bannTime.getMinutes() > unbanneTime.getMinutes())
    {
      unbanneTime.setMinutes(unbanneTime.getMinutes() + (bannTime.getMinutes() - unbanneTime.getMinutes()));
    }

    return this.prisma.channelMember.update({
      where: {
        userAndChannel: {
          userId: userId,
          channelId: channelId
        },
      },
      data: {
        role: 'BANNED_MEMBER',
        bannedTime: bannedTime,
        unbanneTime: unbanneTime
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

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleUnbanneMember(): Promise<{ count: number }> {
    const currentDate = new Date();
    const updatedChannelMembers = await this.prisma.channelMember.updateMany({
      where: {
        role: 'BANNED_MEMBER',
        unbanneTime: {
          lte: currentDate
        },
      },
      data: {
        role: 'MEMBER',
        bannedTime: new Date(0),
        unbanneTime: new Date(0)
      }
    });
    return updatedChannelMembers;
  }

  async updateChannelMemberMutedTime(channelId: string, userId: string, mutedTime: string): Promise<ChannelMember> {
    const unmuteTime = new Date();
    const muteTime = new Date(mutedTime);
    if(muteTime.getMinutes() > unmuteTime.getMinutes())
    {
      console.log('dkhl lhna');
      unmuteTime.setMinutes(unmuteTime.getMinutes() + (muteTime.getMinutes() - unmuteTime.getMinutes()));
    }
    
    return this.prisma.channelMember.update({
      where: {
        userAndChannel: {
          userId: userId,
          channelId: channelId
        },
      },
      data: {
        role: 'MUTED_MEMBER',
        mutedTime: mutedTime,
        unmuteTime: unmuteTime
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

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleUnmuteMember(): Promise<{ count: number }> {
    const currentDate = new Date();
    const updatedChannelMembers = await this.prisma.channelMember.updateMany({
      where: {
        role: 'MUTED_MEMBER',
        unmuteTime: {
          lte: currentDate
        },
      },
      data: {
        role: 'MEMBER',
        mutedTime: new Date(0),
        unmuteTime: new Date(0)
      }
    });
    return updatedChannelMembers;
  }
  
  async removeChannelMember(channelId: string, userId: string): Promise<void> {
    await this.prisma.channelMember.delete({
      where: {
        userAndChannel: {
          userId,
          channelId
        },
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

  async removeAllChannelMembers(channelId: string): Promise<void> {
    await this.prisma.channelMember.deleteMany({
      where: {
        channelId: channelId
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
  //* ----------------------------------------------------------channelMemberServices----------------------------------------------------- *//

  //* ----------------------------------------------------------kickedMemberServices------------------------------------------------------ *//
  async createKickedMember(createKickedMemberDto: CreateKickedMemberDto): Promise<KickedMember> {
    return this.prisma.kickedMember.create({ data: createKickedMemberDto})
    .catch (error => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'BadRequestException',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      });
    });
  }
  
  async findAllKickedMembers(channelId: string): Promise<KickedMember[]> {
    return this.prisma.kickedMember.findMany({
      where: {
        channelId
      },
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
  
  async findOneKickedMember(channelId: string, userId: string): Promise<KickedMember> {
    return this.prisma.kickedMember.findUniqueOrThrow({
      where: {
        kickedMemberAndChannel: {
          userId,
          channelId
        },
      }
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
  
  async removeKickedMember(channelId: string, userId: string): Promise<void> {
    await this.prisma.kickedMember.delete({
      where: {
        kickedMemberAndChannel: {
          userId,
          channelId
        },
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

  async removeAllKickedMembers(channelId: string): Promise<void> {
    await this.prisma.kickedMember.deleteMany({
      where: {
        channelId: channelId,
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
  //* ----------------------------------------------------------kickedMemberServices------------------------------------------------------ *//
  
  //* ----------------------------------------------------------channelMessageServices---------------------------------------------------- *//
  async createChannelMessage(createChannelMessageDto: CreateChannelMessageDto): Promise<ChannelMessage> {
    return this.prisma.channelMessage.create({ data: createChannelMessageDto })
    .catch (error => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'BadRequestException',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      });
    });
  }
  
  async findAllChannelMessages(channelId: string): Promise<ChannelMessage[]> {
    return this.prisma.channelMessage.findMany({
      where: {
        channelId
      },
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
  
  async removeAllChannelMessages(channelId: string): Promise<void> {
    await this.prisma.channelMessage.deleteMany({
      where: {
        channelId: channelId,
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
  //* ----------------------------------------------------------channelMessageServices---------------------------------------------------- *//

  async createChannelOwner(ownerId: string, channelId: string): Promise<ChannelMember> {
    return this.prisma.channelMember.create({
      data: {
        userId: ownerId,
        channelId: channelId,
        role: 'OWNER'
      },
    })
    .catch (error => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'BadRequestException',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      });
    });
  }

  async findChannelOwner(): Promise<ChannelMember> {
    return this.prisma.channelMember.findFirst({
      where: {
        role: 'OWNER',
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

  async findAllChannelAdmins(channelId: string): Promise<ChannelMember[]> {
    return this.prisma.channelMember.findMany({
      where: {
        channelId,
        role: 'ADMIN'
      },
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

  async findAllBannedMembers(channelId: string): Promise<ChannelMember[]> {
    return this.prisma.channelMember.findMany({
      where: {
        channelId,
        role: 'BANNED_MEMBER'
      },
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

  async findAllMutedMembers(channelId: string): Promise<ChannelMember[]> {
    return this.prisma.channelMember.findMany({
      where: {
        channelId,
        role: 'MUTED_MEMBER'
      },
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

}
