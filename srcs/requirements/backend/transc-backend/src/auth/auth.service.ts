'use strict'
import { Injectable, Req } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { PrismaService } from 'prisma/prisma.service';
import { JwtPayload } from "./type/jwt-payload.type"
import { JwtService } from "@nestjs/jwt";
import { JWT_SECRET } from "../utils/constants";
import { UserInter } from "../users/user.interface";
import { LOGIN_REDIRECT_URL, PROFILE_REDIRECT_URL } from "src/utils/constants";
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
    
    // async redirectBasedOnTwoFa(res: any, user: UserInter): Promise<void> {
    //     // if (!user.isTwoFactorEnabled) {
    //     //     return res.redirect(`${PROFILE_REDIRECT_URL}/${user.id}`);
    //     // } else {
    //         return res.redirect(LOGIN_REDIRECT_URL);
    //     // }
    //   }
    
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

    // async loginWith2fa(userWithoutPsw: Partial<User>){
    //     const payload: JwtPayload =  {
    //         id: userWithoutPsw.id,
    //         email: userWithoutPsw.email,
    //         isTwoFactorEnabled: !!userWithoutPsw.isTwoFactorEnabled,
    //         isTwoFactorAuthenticated: true,
    //     };

    //     return {
    //         email: payload.email,
    //         access_token: this.signToken(payload),
    //     };
    // }
    
}