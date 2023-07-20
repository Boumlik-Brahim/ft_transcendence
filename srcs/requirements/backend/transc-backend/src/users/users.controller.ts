/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Achievement, BlockedUser, Friend, User, UserStat } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-Friend.dto';
import { CreateUserStatDto } from './dto/create-userStat.dto';
import { UpdateUserStatDto } from './dto/update-userStat.dto';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { CreateBlockedUserDto } from './dto/create-blockedUser.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //* ----------------------------------------------------------------userCRUDOp---------------------------------------------------------- *//
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.createUser(createUserDto);
    return user;
  }
  
  @Get()
  async findAll(): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @Get(':senderID/receiver')
  async findAllUsersReceivers(@Param('senderID') senderID: string): Promise<User[]> {
    const users = await this.usersService.findAllUsersReceivers(senderID);
    return users;
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    return user;
  }
  
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const updateUser = await this.usersService.update(id, updateUserDto);
    return updateUser;
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.usersService.remove(id);
  }
  //* ----------------------------------------------------------------userCRUDOp---------------------------------------------------------- *//
  
  //* ---------------------------------------------------------------userStatCRUDOp------------------------------------------------------- *//
  @Post('/userStat')
  async createUserStat(@Body() createUserStatDto: CreateUserStatDto): Promise<UserStat> {
    const userStat = await this.usersService.createUserStat(createUserStatDto);
    return userStat;
  }
  
  @Get('/:userId/userStat')
  async findOneUserStat(@Param('userId') userId: string): Promise<UserStat> {
    const userStat = await this.usersService.findOneUserStat(userId);
    return userStat;
  }
  
  @Patch('/:userId/userStat')
  async updateUserStat(@Param('userId') userId: string, @Body() updateUserStatDto: UpdateUserStatDto): Promise<UserStat> {
    const updateUserStat = await this.usersService.updateUserStat(userId, updateUserStatDto);
    return updateUserStat;
  }
  
  @Delete('/:userId/userStat')
  async removeUserStat(@Param('userId') userId: string): Promise<void> {
    await this.usersService.removeUserStat(userId);
  }
  //* ---------------------------------------------------------------userStatCRUDOp------------------------------------------------------- *//
  
  //* -------------------------------------------------------------achievementCRUDOp------------------------------------------------------ *//
  @Post('/achievement')
  async createAchievement(@Body() createAchievementDto: CreateAchievementDto): Promise<Achievement> {
    const achievement = await this.usersService.createAchievement(createAchievementDto);
    return achievement;
  }
  
  @Get('/:userId/achievement')
  async findAllAchievements(@Param('userId') userId: string): Promise<Achievement[]> {
    const achievements = await this.usersService.findAllAchievements(userId);
    return achievements;
  }
  //* -------------------------------------------------------------achievementCRUDOp------------------------------------------------------ *//

  //* -------------------------------------------------------------blockedUserCRUDOp------------------------------------------------------ *//
  @Post('/blockedUser')
  async createBlockedUser(@Body() createBlockedUserDto: CreateBlockedUserDto): Promise<BlockedUser> {
    const blockedUser = await this.usersService.createBlockedUser(createBlockedUserDto);
    return blockedUser;
  }
  
  @Get('/:userId/blockedUser')
  async findAllBlockedUser(@Param('userId') userId: string): Promise<BlockedUser[]> {
    const blockedUsers = await this.usersService.findAllBlockedUsers(userId);
    return blockedUsers;
  }
  //* -------------------------------------------------------------blockedUserCRUDOp------------------------------------------------------ *//

  //* ---------------------------------------------------------------friendCRUDOp--------------------------------------------------------- *//
  @Post('/friend')
  async createFriend(@Body() createFriendDto: CreateFriendDto): Promise<Friend> {
    const friend = await this.usersService.createFriend(createFriendDto);
    return friend;
  }
  
  @Get('/:userId/friend')
  async findAllFriends(@Param('userId') userId: string): Promise<Friend[]> {
    const Friends = await this.usersService.findAllFriends(userId);
    return Friends;
  }
  
  @Patch('/:userId/friend/:friendId')
  async updateFriend(@Param('userId') userId: string, @Param('friendId') friendId: string, @Body() updateFriendDto: UpdateFriendDto): Promise<Friend> {
    const updateFriend = await this.usersService.updateFriend(userId, friendId, updateFriendDto);
    return updateFriend;
  }
  
  @Delete('/:userId/friend/:friendId')
  async removeFriend(@Param('userId') userId: string, @Param('friendId') friendId: string): Promise<void> {
    await this.usersService.removeFriend(userId, friendId);
  }
  //* ---------------------------------------------------------------friendCRUDOp--------------------------------------------------------- *//
}
