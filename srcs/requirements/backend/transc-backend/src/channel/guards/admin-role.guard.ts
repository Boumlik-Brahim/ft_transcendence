import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { ChannelService } from "../channel.service";

@Injectable()
export class AdminRoleGuard implements CanActivate {

    constructor(private prisma: PrismaService) {}
    // constructor(private readonly channelService: ChannelService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        return false;
    }

}