import { Controller, Req, Res, Get, UseGuards, Redirect } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto"
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import { JwtPayload } from "./type/jwt-payload.type"
// import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

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
}