import { Controller, Req, Res, Get, UseGuards, Redirect } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { JwtPayload } from "./type/jwt-payload.type"
import { User } from "../users/user.interface";

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @Get()
    @UseGuards(AuthGuard('42'))
    login(@Res() res: any, user: User) : Promise<any> {
        return this.authService.redirectBasedOnTwoFa(res, user);
    }
    
    @Get('callback')
    @UseGuards(AuthGuard('42'))
    async callback(@Req() req: any, @Res() res: any) : Promise<any>{
        try {
            let user = await this.authService.getUser(req);
            console.log(user);
            const token = await this.authService.signToken(req);
            res.cookie('id', user.id);
            res.cookie('accessToken', token);
            return this.login(res, user);
        }
        catch(e) {
            console.log(e);
        }
    }
}