/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-42';
// import { UserDto } from "src/users/dto/user.dto";
import { ConfigService } from "@nestjs/config";
import { AuthDto } from "../dto/auth.dto";

@Injectable()
export class IntraStrategy extends PassportStrategy(Strategy, '42') {
    
    constructor(private configService: ConfigService) {
        console.log("lol")
        console.log(configService.get('CLIENT_ID'));
        console.log(configService.get('SECRET'));
        console.log(configService.get('REDIRECT_URI'));
        super({
            clientID: configService.get('CLIENT_ID'),
            clientSecret: configService.get('SECRET'),
            callbackURL: configService.get('REDIRECT_URI'),
            profileFields: {
                'username': 'login',
                'emails.value': 'email',
                'id' : 'id',
            }
        }); // Config
    }
    
    async validate(accessToken: string, refreshToken: string, profile: any, done: Function): Promise<any> {
        const {username, emails, id} = profile;
        const user: AuthDto = {
            username: username,
            email: emails.value,
            id: id.toString(),
        }
        done(null, user);
    }

}