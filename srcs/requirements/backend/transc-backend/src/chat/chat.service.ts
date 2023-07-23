/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DirectMessage } from '@prisma/client';
import { createHash } from 'crypto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(createChatDto: CreateChatDto): Promise<DirectMessage> {
  
    const roomID = [createChatDto.senderId, createChatDto.recieverId].sort().join('-');
    const hasshedRoomName = createHash('sha256').update(roomID).digest('hex');
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
  
    const roomID = [senderId, receiverId].sort().join('-');
    const hasshedRoomName = createHash('sha256').update(roomID).digest('hex');
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

  async updateChat(messageID: string, updateChatDto: UpdateChatDto): Promise<DirectMessage> {
    return this.prisma.directMessage.update({
      where: {
        id: messageID,
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

  async countUnreadMessages(senderId: string, receiverId: string){

    const roomID = [senderId, receiverId].sort().join('-');
    const hasshedRoomName = createHash('sha256').update(roomID).digest('hex');
  
    const unreadMessages = await this.prisma.directMessage.count({
      where: {
        recieverId: receiverId,
        roomId: hasshedRoomName,
        seen: false
      },
    });
    
    return unreadMessages;
  }
}
