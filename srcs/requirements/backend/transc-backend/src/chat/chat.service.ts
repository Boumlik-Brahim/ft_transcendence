import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { PrismaService } from '../prisma.service';
import { DirectMessage } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(createChatDto: CreateChatDto): Promise<DirectMessage> {
    return this.prisma.directMessage.create({ data: createChatDto })
    .catch (error => {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'BadRequestException',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      });
    });
  }

  async findAllChats(senderId: number, receiverId: number): Promise<DirectMessage[]> {
    return this.prisma.directMessage.findMany({
      where: {
        sender: {
          id: senderId,
        },
        reciever: {
          id: receiverId,
        },
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

  async findOneChat(id: number): Promise<DirectMessage> {
    return this.prisma.directMessage.findUnique({ where: 
      {
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
}
