import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Achievement, BlockedUser, Friend, GamesHistories, Prisma, User, UserStat } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateFriendDto } from './dto/create-friend.dto';
import { CreateUserStatDto } from './dto/create-userStat.dto';
import { UpdateUserStatDto } from './dto/update-userStat.dto';
import { CreateBlockedUserDto } from './dto/create-blockedUser.dto';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { updateUserStatusDto } from './dto/update-user-status.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //* --------------------------------------------------------------userServices---------------------------------------------------------- *//
  
  async findOneWithId(_intraId: string): Promise<any>{
    if (_intraId !== undefined){
      return await this.prisma.user.findUnique({ 
        where: {
          intraId: _intraId,
        }
      })
    }
    else 
      return null;
  }
  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try{
      return await this.prisma.user.create({ data: createUserDto });
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'BadRequestException',
      }, 
      HttpStatus.BAD_REQUEST, { cause: error });
    };
  }
  
  async findAll(): Promise<User[]> {
    try{
      return await this.prisma.user.findMany({
        orderBy: {
          created_at: 'asc',
        },
      });
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'NotFoundException',
      }, HttpStatus.NOT_FOUND, { cause: error });
    };
  }

  async findAllUsersReceivers(senderID: string): Promise<User[]> {
    try{
      const users = await this.prisma.user.findMany({
        where: {
          OR: [
            {
              senders: {
                some: {recieverId: senderID},
              },
            },
            {
              receivers: {
                some: {senderId: senderID},
              }, 
            },
          ],
          blockedUser: {
            none: {
              userId: senderID,
            },
          },
        },
        include: {
          senders: {
            orderBy: {
              created_at: 'desc',
            },
            take: 1
          },
          receivers: {
            orderBy: {
              created_at: 'desc',
            },
            take: 1
          },
          _count: {
            select: {
              senders: {
                where: {
                  recieverId: senderID,
                  seen: false
                }
              }
            }
          }
        },
      });
      const sortedUsers = (await users).sort((userA, userB) => {
        const lastMessageTimeA = Math.max(
          ...userA.senders.map((sender) => new Date(sender.created_at).getTime()),
          ...userA.receivers.map((receiver) => new Date(receiver.created_at).getTime())
        );
        const lastMessageTimeB = Math.max(
          ...userB.senders.map((sender) => new Date(sender.created_at).getTime()),
          ...userB.receivers.map((receiver) => new Date(receiver.created_at).getTime())
        );
        return lastMessageTimeB - lastMessageTimeA;
      });
      return sortedUsers;
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'NotFoundException',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    };
  }
      
  async findOne(id: string): Promise<User> {
    try{
      return await this.prisma.user.findUnique({
        where: {
          id
        },
      });
    }catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'NotFoundException',
            message: 'User cannot be found',
          }, HttpStatus.NOT_FOUND, {cause: error});
        }
      }
    };
  }

  async updateTwoFactorStatus(userId: string, isTwoFactorEnabled: boolean): Promise<void> {
    try{
      await this.prisma.user.update({
        where: {
          id: userId
        },
        data: {
          isTwoFactorEnabled: isTwoFactorEnabled
        },
      });
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'InternalServerErrorException',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    };
  }
  
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try{
      return await this.prisma.user.update({
        where: {
          id
        },
        data: updateUserDto
      });
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'InternalServerErrorException',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    };
  }

  async updateUserStatus(id: string, updateUserStatusDto: updateUserStatusDto): Promise<User> {
    try{
      return await this.prisma.user.update({
        where: {
          id
        },
        data: updateUserStatusDto,
      });
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'InternalServerErrorException',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    };
  }
  
  async remove(id: string): Promise<void> {
    try{
      await this.prisma.user.delete({
        where: {
          id
        }
      });
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'InternalServerErrorException',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    };
  }

  async updateUserName(userId: string, userName: string){
    await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        name: userName
      }
    })
    // .catch((error) => {

    // })
  }

//* --------------------------------------------------------------userServices---------------------------------------------------------- *//

//* -------------------------------------------------------------userStatServices------------------------------------------------------- *//
  async createUserStat(createUserStatDto: CreateUserStatDto): Promise<UserStat> {
    try{
      return await this.prisma.userStat.create({ data: createUserStatDto });
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'BadRequestException',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      });
    };
  }
  
  async findOneUserStat(userID: string): Promise<UserStat> {
    try{
      return await this.prisma.userStat.findUnique({
        where: {
          userId: userID
        },
      });
    }catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'NotFoundException',
            message: 'User Stat cannot be found',
          }, HttpStatus.NOT_FOUND, {cause: error});
        }
      }
    };
  }
  
  async updateUserStat(userID: string, updateUserStatDto: UpdateUserStatDto): Promise<UserStat> {
    try{
      return await this.prisma.userStat.update({
        where: {
          userId: userID
        },
        data: updateUserStatDto
      });
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'InternalServerErrorException',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    };
  }
  
  async removeUserStat(userID: string): Promise<void> {
    try{
      await this.prisma.userStat.delete({
        where: {
          userId: userID
        }
      });
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'InternalServerErrorException',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    };
  }

  //* -------------------------------------------------------------userStatServices------------------------------------------------------- *//
  
  //* ----------------------------------------------------------achievementServices------------------------------------------------------- *//

  async createAchievement(createAchievementDto: CreateAchievementDto): Promise<Achievement> {
    try{
      return await this.prisma.achievement.create({ data: createAchievementDto });
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'BadRequestException',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      });
    };
  }

  async findAllAchievements(userID: string): Promise<Achievement[]> {
    try{
      return await this.prisma.achievement.findMany({
        where: {
          userId: userID,
        },
        orderBy: {
          created_at: 'asc',
        },
      });
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'NotFoundException',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    };
  }

  //* ----------------------------------------------------------achievementServices------------------------------------------------------- *//

  //* ----------------------------------------------------------blockedUserServices------------------------------------------------------- *//
  
  async createBlockedUser(createBlockedUser: CreateBlockedUserDto): Promise<BlockedUser> {
    try{
      return await this.prisma.blockedUser.create({ data: createBlockedUser });
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'BadRequestException',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      });
    };
  }
  
  async findAllBlockedUsers(userID: string): Promise<BlockedUser[]> {
    try{
      return await this.prisma.blockedUser.findMany({
        where: {
          userId: userID,
        },
        orderBy: {
          created_at: 'asc',
        },
      });
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'NotFoundException',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    };
  }
  
  async findBlockedUser(userID: string, blockedID: string): Promise<BlockedUser[]> {
    try{
      return await this.prisma.blockedUser.findMany({
        where: {
          OR: [
            {
              userId: userID,
              blockedUserId: blockedID
            },
            {
              userId: blockedID,
              blockedUserId: userID
            },
          ],
        },
        orderBy: {
          created_at: 'asc',
        },
      });
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'NotFoundException',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    };
  }

  async unBlockUser(userID: string, friendID: string): Promise<void> {
    try{
      await this.prisma.blockedUser.deleteMany({
        where: {
          userId: userID,
          blockedUserId: friendID,
        },
      });
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'NotFoundException',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    };
  }

  //* ----------------------------------------------------------blockedUserServices------------------------------------------------------- *//

  //* ------------------------------------------------------------friendServices---------------------------------------------------------- *//

  async createFriend(createFriendDto: CreateFriendDto): Promise<Friend> {
    try{
      return await this.prisma.friend.create({ data: createFriendDto });
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'BadRequestException',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      });
    };
  }

  async pendingReq(userID: string): Promise<Friend[]> {
    try{
      return await this.prisma.friend.findMany({
        where: {
          friendId: userID,
          friendShipStatus: 'PENDING'
        },
        orderBy: {
          created_at: 'asc',
        },
      });
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'NotFoundException',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    };
  }

  
  async findAllFriends(userID: string): Promise<Friend[]> {
    try{
      return await this.prisma.friend.findMany({
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
      });
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'NotFoundException',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    };
  }
  
  async friendShip(userID: string, friendID: string): Promise<Friend[]> {
    try{
      return await this.prisma.friend.findMany({
        where: {
          OR: [
            {
              userId: userID,
              friendId: friendID
            },
            {
              userId: friendID,
              friendId: userID
            },
          ],
        },
        orderBy: {
          created_at: 'asc',
        },
      });
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'NotFoundException',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    };
  }
  
  async updateFriend(userID: string, friendID: string): Promise<Friend> {
    try{
      return await this.prisma.friend.update({
        where: {
          userAndFriend: {
            userId: userID,
            friendId: friendID
          },
        },
        data: {
          friendShipStatus: 'ACCEPTED',
        }
      });
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'InternalServerErrorException',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    };
  }

  async removeFriend(userID: string, friendID: string,): Promise<void> {
    try{
      await this.prisma.friend.deleteMany({
        where: {
          OR: [
            {
              userId: userID,
              friendId: friendID
            },
            {
              userId: friendID,
              friendId: userID
            },
          ],
        },
      });
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'InternalServerErrorException',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    };
  }

  //* ------------------------------------------------------------friendServices---------------------------------------------------------- *//

  //* ----------------------------------------------------------GetUserGamesService------------------------------------------------------- *//
  async getUsergames(userId : string) : Promise<GamesHistories[]> {
    console.log(userId)
    try {
      const games = await this.prisma.gamesHistories.findMany(
        {
          where : {
            OR : [
              { playerA_id : userId}, {playerB_id : userId }
            ]
          }
      });
      return games;
    }catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'NotFoundException',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    };
  }
  //* ----------------------------------------------------------GetUserGamesService------------------------------------------------------- *//
}
