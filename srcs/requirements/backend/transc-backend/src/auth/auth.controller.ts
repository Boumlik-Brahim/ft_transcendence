import { Controller, Req, Res, Get, UseGuards, Post, Body, UnauthorizedException, Query} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserInter } from "../users/user.interface";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { UsersService } from "src/users/users.service";
import { SETTING_REDIRECT_URL} from "src/utils/constants";


@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService,
        private userService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard('42'))
    login(@Res() res: any, user: UserInter) : Promise<any> {
        return res.redirect(SETTING_REDIRECT_URL);
    }
    
    @Get('callback')
    @UseGuards(AuthGuard('42'))
    async callback(@Req() req: any, @Res() res: any) : Promise<any>{
        try {
            let user = await this.authService.getUser(req);
            if (!user.isTwoFactorEnabled){
                const token = await this.authService.signToken(user);
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
            res.status(200).json({ message: 'Two-factor authentication turned on successfully' });
    }
    
    @Post('2fa/authenticate')
    async authenticate(@Res() res: any,@Req() req:any, @Query('userId') userId: string, @Query('authCode') authCode: string){
        const userAuthentified = await this.userService.findOne(userId);
        const isCodeValid = await this.authService.isTwoFactorAuthenticationCodeValid(authCode, userAuthentified);
        if (!isCodeValid){
            throw new UnauthorizedException('Wrong authentication code');
        }
        const token = await this.authService.signToken(userAuthentified);
        res.send({token : token});
    }
}