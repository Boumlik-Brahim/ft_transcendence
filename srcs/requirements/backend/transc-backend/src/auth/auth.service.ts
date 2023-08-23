'use strict'
import { Injectable, Req } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { PrismaService } from 'prisma/prisma.service';
import { JwtPayload } from "./type/jwt-payload.type"
import { JwtService } from "@nestjs/jwt";
import { JWT_SECRET } from "../utils/constants";
import { User } from "@prisma/client";
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode'


@Injectable()
export class AuthService {
    constructor ( private userService: UsersService,
                    private prisma: PrismaService,
                    private jwt: JwtService) {}
                    
    async getUser(req: any) {
        try {
            let user = await this.userService.findOneWithId(req.user.intraId);
            if (user){
                this.userService.updateUserStatus(user.id, "ONLINE")
                return user;
            }
            const newUser = await this.prisma.user.create({
                data: {
                    name: req.user.username,
                    email: req.user.email,
                    intraId: req.user.intraId,
                    Avatar: req.user.Avatar,
                    twoFactorAuthSecret: authenticator.generateSecret(),
                },
            })
            return newUser;
        }
        catch(e) {
            console.log(e);
        }
    }
    
    async signToken(user: User) : Promise<string>{
        const payload: JwtPayload = {id: user.id, email: user.email};
        return await this.jwt.signAsync(payload, {secret: JWT_SECRET});
    }

    async turnOnTwoFactorAuthentication(userId: string){
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                isTwoFactorEnabled: true,
            }
        });
    }

    async generateTwoFactorAuthenticationSecret(user: User) {
        const otpauthUrl = authenticator.keyuri(user.email, 'ft_transcendence', user.twoFactorAuthSecret);
        return {
            otpauthUrl
        }
    }

    async generateQrCodeDataURL(otpauthUrl: string) {
        return toDataURL(otpauthUrl);
    }

    async isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, user: User){
        const isValid = authenticator.verify({
            token: twoFactorAuthenticationCode,
            secret: user.twoFactorAuthSecret,
        });
        return isValid;
    }  
}