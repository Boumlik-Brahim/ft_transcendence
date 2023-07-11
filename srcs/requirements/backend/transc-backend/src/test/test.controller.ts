import { Body, Controller, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('test')
export class TestController {

    @Post()
    async createFakeUser (@Body() data : any) {
       console.log(prisma.user);
       const user = await prisma.user.create({ data });
       return user;
    }
}
