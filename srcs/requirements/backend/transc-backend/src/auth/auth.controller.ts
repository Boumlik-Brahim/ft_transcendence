import { Controller, Req, Res, Get, UseGuards, Post, UnauthorizedException, Query} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserInter } from "../users/user.interface";
import { AuthGuard } from "@nestjs/passport";
import { JwtPayload } from "./type/jwt-payload.type"
import { ApiTags } from "@nestjs/swagger";
import { UsersService } from "src/users/users.service";
import { User } from "@prisma/client";


@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService,
        private userService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard('42'))
    login(@Res() res: any, user: UserInter) : Promise<any> {
        return this.authService.redirectBasedOnTwoFa(res, user);
    }
    
    @Get('callback')
    @UseGuards(AuthGuard('42'))
    async callback(@Req() req: any, @Res() res: any) : Promise<any>{
        try {
            let user = await this.authService.getUser(req);
            if (!user.isTwoFactorEnabled){
                const token = await this.authService.signToken(req.user);
                res.cookie('accessToken', token);
            }
            res.cookie('id', user.id);
            return this.login(res, user);
        }
        catch(e) {
            console.log(e);
        }
    }
    
    @Post('2fa/generate')
    async register(@Query('userId') userId: string, @Res() res: any) {
        const userRegistred = await this.userService.findOne(userId);
        const { otpauthUrl } = await this.authService.generateTwoFactorAuthenticationSecret(userRegistred);
        return res.json( await this.authService.generateQrCodeDataURL(otpauthUrl));
    }
    
    @Post('2fa/turn-on')
    async turnOnTwoFactorAuthentication(@Res() res: any, @Query('userId') userId: string, @Query('authCode') authCode: string){
        const userAuthentified = await this.userService.findOne(userId);
        const isCodeValid = await this.authService.isTwoFactorAuthenticationCodeValid(authCode, userAuthentified);
        if (!isCodeValid){
            throw new UnauthorizedException('Wrong authentication code');
        }
        await this.authService.turnOnTwoFactorAuthentication(userAuthentified.id);
        // return res.redirect(SETTING_REDIRECT_URL);
    }
    
    @Post('2fa/authenticate')
    async authenticate(@Res() res: any, @Query('userId') userId: string, @Query('authCode') authCode: string){
        const userAuthentified = await this.userService.findOne(userId);
        const isCodeValid = this.authService.isTwoFactorAuthenticationCodeValid(authCode, userAuthentified);
        if (!isCodeValid){
            throw new UnauthorizedException('Wrong authentication code');
        }
        const token = await this.authService.signToken(userAuthentified);
        res.cookie('accessToken', token);
        return this.login(res, userAuthentified);
        // return this.authService.loginWith2fa(userAuthentified);
    }
}