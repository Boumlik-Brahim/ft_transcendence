import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { PrismaService } from 'prisma/prisma.service';
import { JwtPayload } from "./type/jwt-payload.type"
import { JwtService } from "@nestjs/jwt";
import { JWT_SECRET } from "../utils/constants";
import { User } from "@prisma/client";
import { authenticator } from "otplib";
import { toDataURL } from 'qrcode'


@Injectable()
export class AuthService {
    constructor ( private userService: UsersService,
                    private prisma: PrismaService,
                    private jwt: JwtService) {}
                    
    async valideUser(req: any) {
        let user = await this.userService.findOneWithMail(req.user.email);
        if (user)
            return user;
        const newUser = await this.prisma.user.create({
            data: {
                name: req.user.username,
                email: req.user.email,
                IntraId: req.user.id,
                status: 'ONLINE',
            },
        })
        return newUser;
    }
    
    async signToken(payload: JwtPayload) {
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