import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor (private prisma: PrismaService) {}

    async findOne(email: string): Promise<any>{
        return await this.prisma.user.findUnique({ where: {
            email: email,
          } as Prisma.UserWhereUniqueInput,
        })
    }
}
