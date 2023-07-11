import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor (private prisma: PrismaService) {}

    async findOne(id: any) {
        console.log(id);
        const user = await this.prisma.user.findUnique({ where: { id } });
        console.log("here user : " , user);
        return user; 
    }
}
