import { Controller, Req, Res, Get, UseGuards, Redirect } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto"
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @Get()
    @UseGuards(AuthGuard('42'))
    login(req: any) {
        req.user;
        this.authService.valideUser(req);
        return "Secured Data";
    }
    
    @Get('callback')
    @UseGuards(AuthGuard('42'))
    callback(@Req() req: any) {
        return this.login(req)
    }
}