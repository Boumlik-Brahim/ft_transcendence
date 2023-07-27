import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Achievement, BlockedUser, Friend, User, UserStat } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-Friend.dto';
import { CreateUserStatDto } from './dto/create-userStat.dto';
import { UpdateUserStatDto } from './dto/update-userStat.dto';
import { CreateBlockedUserDto } from './dto/create-blockedUser.dto';
import { CreateAchievementDto } from './dto/create-achievement.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //* --------------------------------------------------------------userServices---------------------------------------------------------- *//
  
  async findOneWithMail(email: string): Promise<any>{
    return await this.prisma.user.findUnique({ 
      where: {
        email: email,
      }
    })
  }
  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: createUserDto })
    .catch (error => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'BadRequestException',
      }, 
      HttpStatus.BAD_REQUEST, { cause: error });
    });
  }
  
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
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
  
  async findOne(id: string): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
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
  
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: {
        id
      },
      data: updateUserDto
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
  
  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({
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

//* --------------------------------------------------------------userServices---------------------------------------------------------- *//

//* -------------------------------------------------------------userStatServices------------------------------------------------------- *//
  async createUserStat(createUserStatDto: CreateUserStatDto): Promise<UserStat> {
    return this.prisma.userStat.create({ data: createUserStatDto })
    .catch (error => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'BadRequestException',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      });
    });
  }
  
  async findOneUserStat(userID: string): Promise<UserStat> {
    return this.prisma.userStat.findUniqueOrThrow({
      where: {
        userId: userID
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
  
  async updateUserStat(userID: string, updateUserStatDto: UpdateUserStatDto): Promise<UserStat> {
    return this.prisma.userStat.update({
      where: {
        userId: userID
      },
      data: updateUserStatDto
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
  
  async removeUserStat(userID: string): Promise<void> {
    await this.prisma.userStat.delete({
      where: {
        userId: userID
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

  //* -------------------------------------------------------------userStatServices------------------------------------------------------- *//
  
  //* ----------------------------------------------------------achievementServices------------------------------------------------------- *//

  async createAchievement(createAchievementDto: CreateAchievementDto): Promise<Achievement> {
    return this.prisma.achievement.create({ data: createAchievementDto })
    .catch (error => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'BadRequestException',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      });
    });
  }

  async findAllAchievements(userID: string): Promise<Achievement[]> {
    return this.prisma.achievement.findMany({
      where: {
        userId: userID,
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

  //* ----------------------------------------------------------achievementServices------------------------------------------------------- *//

  //* ----------------------------------------------------------blockedUserServices------------------------------------------------------- *//
  
  async createBlockedUser(createBlockedUser: CreateBlockedUserDto): Promise<BlockedUser> {
    console.log('createBlockedUser', createBlockedUser)
    return this.prisma.blockedUser.create({ data: createBlockedUser })
    .catch (error => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'BadRequestException',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      });
    });
  }
  
  async findAllBlockedUsers(userID: string): Promise<BlockedUser[]> {
    return this.prisma.blockedUser.findMany({
      where: {
        userId: userID,
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
  
  async findBlockedUser(userID: string): Promise<BlockedUser[]> {
    return this.prisma.blockedUser.findMany({
      where: {
      OR: [
        { userId: userID },
        { blockedUserId: userID },
      ]
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

  async unBlockUser(userID: string, friendID: string): Promise<void> {
    await this.prisma.blockedUser.deleteMany({
      where: {
        userId: userID,
        blockedUserId: friendID,
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

  //* ----------------------------------------------------------blockedUserServices------------------------------------------------------- *//

  //* ------------------------------------------------------------friendServices---------------------------------------------------------- *//

  async createFriend(createFriendDto: CreateFriendDto): Promise<Friend> {
    return this.prisma.friend.create({ data: createFriendDto })
    .catch (error => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'BadRequestException',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      });
    });
  }

  async pendingReq(userID: string): Promise<Friend[]> {
    return this.prisma.friend.findMany({
      where: {
        friendId: userID,
        friendShipStatus: 'PENDING'
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

  
  async findAllFriends(userID: string): Promise<Friend[]> {
    return this.prisma.friend.findMany({
      where: {
        OR: [
          { userId: userID },
          { friendId: userID },
        ],
        friendShipStatus: 'ACCEPTED'
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
  
  async friendShip(userID: string, friendID: string): Promise<Friend[]> {
    return this.prisma.friend.findMany({
      where: {
        userId: userID,
        friendId: friendID
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
  
  async updateFriend(userID: string, friendID: string, updateFriendDto: UpdateFriendDto): Promise<Friend> {
    return this.prisma.friend.update({
      where: {
        userAndFriend: {
          userId: userID,
          friendId: friendID
        },
      },
      data: updateFriendDto
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

  async removeFriend(userID: string, friendID: string,): Promise<void> {
    await this.prisma.friend.delete({
      where: {
        userAndFriend: {
          userId: userID,
          friendId: friendID
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

  //* ------------------------------------------------------------friendServices---------------------------------------------------------- *//

}
