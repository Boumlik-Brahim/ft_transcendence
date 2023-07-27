import { Controller, Req, Res, Get, UseGuards, Redirect, Post, Body, UnauthorizedException, Response, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto"
import { AuthGuard } from "@nestjs/passport";
import { JwtPayload } from "./type/jwt-payload.type"
import { ApiTags } from "@nestjs/swagger";
import { UsersService } from "src/users/users.service";
// import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService,
        private userService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard('42'))
    login() {}
    
    @Get('callback')
    @UseGuards(AuthGuard('42'))
    async callback(@Req() req: any, @Res() res: any) {
        let user = await this.authService.valideUser(req);
        const payload: JwtPayload = {id: req.user.id, email: req.user.email};
        const token = await this.authService.signToken(payload);
        res.cookie('accessToken', token);
        res.cookie('id', user.id);
        return res.redirect('http://localhost:5173/profile');
        // res.send({user : user})
    }
    
    @Post('2fa/generate')
    async register(@Query('userId') userId: string, @Res() res: any) {
        const user = await this.userService.findOne(userId);
        const { otpauthUrl } = await this.authService.generateTwoFactorAuthenticationSecret(user);
        return res.json( await this.authService.generateQrCodeDataURL(otpauthUrl));
    }
    
    @Post('2fa/turn-on')
    async turnOnTwoFactorAuthentication(@Query('userId') userId: string, @Query('authCode') authCode: string){
        const user = await this.userService.findOne(userId);
        const isCodeValid = this.authService.isTwoFactorAuthenticationCodeValid(authCode, user);
        if (!isCodeValid){
            throw new UnauthorizedException('Wrong authentication code');
        }
        await this.authService.turnOnTwoFactorAuthentication(user.id);
    }
    
    @Post('2fa/authenticate')
    async authenticate(@Query('userId') userId: string, @Query('authCode') authCode: string){
        const user = await this.userService.findOne(userId);
        const isCodeValid = this.authService.isTwoFactorAuthenticationCodeValid(authCode, user);
        if (!isCodeValid){
            throw new UnauthorizedException('Wrong authentication code');
        }
        return this.authService.loginWith2fa(user);
    }
}