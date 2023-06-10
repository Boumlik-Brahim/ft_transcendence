import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from '../prisma.service';
import { DirectMessage, Prisma } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  create(createChatDto: CreateChatDto): Promise<DirectMessage> {
    return this.prisma.directMessage.create({ data: createChatDto });
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
