import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DirectMessage } from '@prisma/client';
import { createHash } from 'crypto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}
  
  async generateHashedRommId(senderId: string, recieverId: string): Promise<string> {
    const roomID = [senderId, recieverId].sort().join('-');
    const hasshedRoomName = createHash('sha256').update(roomID).digest('hex');
    return hasshedRoomName;
  }
  
  async countUnreadMessages(senderId: string, receiverId: string){
    const hasshedRoomName = await this.generateHashedRommId(senderId, receiverId);

    const unreadMessages = await this.prisma.directMessage.count({
      where: {
        recieverId: senderId,
        roomId: hasshedRoomName,
        seen: false
      },
    });
    
    return unreadMessages;
  }

  async createChat(createChatDto: CreateChatDto): Promise<DirectMessage> {
    const hasshedRoomName = await this.generateHashedRommId(createChatDto.senderId, createChatDto.recieverId);
    console.log(hasshedRoomName);
  
    return this.prisma.directMessage.create({ data: {
      content: createChatDto.content,
      senderId: createChatDto.senderId,
      recieverId: createChatDto.recieverId,
      roomId: hasshedRoomName
    } })
    .catch (error => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'BadRequestException',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      });
    });
  }
  
  async findAllChats(senderId: string, receiverId: string): Promise<DirectMessage[]> {
  
    const hasshedRoomName = await this.generateHashedRommId(senderId, receiverId);
    console.log(hasshedRoomName);

    return this.prisma.directMessage.findMany({
      where: {
        roomId: hasshedRoomName
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

  async findOneChat(id: string): Promise<DirectMessage> {
    return this.prisma.directMessage.findUnique({
      where: {
        id
      }
    })
    .catch (error => {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'NotFoundException',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    })
  }

  async updateChat(senderId: string, receiverId: string, updateChatDto: UpdateChatDto): Promise<void> {
    const hasshedRoomName = await this.generateHashedRommId(senderId, receiverId);

    this.prisma.directMessage.updateMany({
      where:{
        roomId: hasshedRoomName,
        recieverId: senderId,
        seen: false
      },
      data: updateChatDto
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
