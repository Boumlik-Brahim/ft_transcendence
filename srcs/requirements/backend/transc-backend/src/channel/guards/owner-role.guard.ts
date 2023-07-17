import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class OwnerRoleGuard implements CanActivate {

    constructor(private prisma: PrismaService) {}

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        return false;        
    }
}