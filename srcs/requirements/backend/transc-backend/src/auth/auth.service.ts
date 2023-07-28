import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { PrismaService } from 'prisma/prisma.service';
import { JwtPayload } from "./type/jwt-payload.type"
import { JwtService } from "@nestjs/jwt";
import { JWT_SECRET } from "../utils/constants";
import { UserInter } from "../users/user.interface";
import { LOGIN_REDIRECT_URL, PROFILE_REDIRECT_URL } from "src/utils/constants";
import { Req } from "@nestjs/common";
import { User } from "@prisma/client";
import { authenticator } from "otplib";
import { toDataURL } from 'qrcode'


@Injectable()
export class AuthService {
    constructor ( private userService: UsersService,
                    private prisma: PrismaService,
                    private jwt: JwtService) {}
                    
    async getUser(req: any) {
        console.log(req.user);
        let user = await this.userService.findOneWithMail(req.user.email);
        if (user)
            return user;
        const newUser = await this.prisma.user.create({
            data: {
                name: req.user.username,
                email: req.user.email,
                IntraId: req.user.id,
                Avatar: req.user.avatarUrl,
                // status: 'ONLINE',
            },
        })
        return newUser;
    }
    async redirectBasedOnTwoFa(res: any, user: UserInter): Promise<void> {
        if (!user.twoFa) {
            console.log(`${LOGIN_REDIRECT_URL} + ${user.id}}`)
            return res.redirect(`${LOGIN_REDIRECT_URL}/${user.id}}`);
        } else {
            
            console.log(`${PROFILE_REDIRECT_URL} + ${user.id}}`)
            return res.redirect(`${PROFILE_REDIRECT_URL}/${user.id}`);
        }
      }
    
    async signToken(@Req() req: any) : Promise<string>{
        const payload: JwtPayload = {id: req.user.id, email: req.user.email};
        return await this.jwt.signAsync(payload, {secret: JWT_SECRET});
    }
    
    async setTwoFactorAuthenticationSecret(secret: string, userId: string){
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                twoFactorAuthSecret: secret,
            }
        });
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
        const secret = authenticator.generateSecret();

        const otpauthUrl = authenticator.keyuri(user.email, 'ft_transcendence', secret);

        await this.setTwoFactorAuthenticationSecret(secret, user.id);
        
        return {
            secret,
            otpauthUrl
        }

    }

    async generateQrCodeDataURL(otpauthUrl: string) {
        return toDataURL(otpauthUrl);
    }

    async isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, user: User){
        return authenticator.verify({
            token: twoFactorAuthenticationCode,
            secret: user.twoFactorAuthSecret,
        });
    }

    async loginWith2fa(userWithoutPsw: Partial<User>){
        const payload: JwtPayload =  {
            id: userWithoutPsw.id,
            email: userWithoutPsw.email,
            isTwoFactorEnabled: !!userWithoutPsw.isTwoFactorEnabled,
            isTwoFactorAuthenticated: true,
        };

        return {
            email: payload.email,
            access_token: this.signToken(payload),
        };
    }
    
}