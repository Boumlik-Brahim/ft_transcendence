import { Controller, Post, Body, Res, Get } from "@nestjs/common";
import { AuthService } from "./auth.service"
import { AuthDto } from "./dto/auth.dto"
import { Response } from "express";

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    

    // @Post('signup')
    // signUp(@Body() dto: AuthDto) {
    //     return this.authService.signUp(dto);
    // }

    // @Post('signin')
    // signIn(@Body() dto: AuthDto, @Res() res: Response) {
    //     return this.authService.signIn(dto, res);
    }

    // @Get('s')
    // signOut(@Res() res: Response) {
    //     return "Sign out";
    //     // return this.authService.signOut(res);
    // }
}