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
    // await this.createChannelMember({
    //   "userId": channel.channelOwnerId,
    //   "channelId": channel.id,
    //   "role": "OWNER",
    //   "bannedTime": new Date(null),
    //   "mutedTime": new Date(null)
    // });
    // return channel;
  }
  
  async findAllChannels(): Promise<Channel[]> {
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
      include: {
        channelMember: {
          where: {
            userId: userId,
          },
        },
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
    return this.prisma.channelMember.findUniqueOrThrow({
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
    unbanneTime.setMinutes(unbanneTime.getMinutes() + parseInt(bannedTime));

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

  async updateChannelMemberMutedTime(channelId: string, userId: string, mutedTime: string): Promise<ChannelMember> {
    const unmuteTime = new Date();
    unmuteTime.setMinutes(unmuteTime.getMinutes() + parseInt(mutedTime));

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
  async handleUnmuteMember(): Promise<void> {
    const currentDate = new Date();
    this.prisma.channelMember.updateMany({
      where: {
        role: 'MUTED_MEMBER',
        unmuteTime: {
          lte: currentDate
        },
      },
      data: {
        role: 'MEMBER',
        mutedTime: "",
        unmuteTime: ""
      }
    });
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleUnbanneMember(): Promise<void> {
    const currentDate = new Date();
    await this.prisma.channelMember.updateMany({
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
  
  async findOneChannelMessage(channelId: string, memberId: string): Promise<ChannelMessage> {
    return this.prisma.channelMessage.findUniqueOrThrow({
      where: {
        senderAndChannel: {
          memberId,
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

  async removeChannelMessage(channelId: string, memberId: string): Promise<void> {
    await this.prisma.channelMessage.delete({
      where: {
        senderAndChannel: {
          memberId,
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
