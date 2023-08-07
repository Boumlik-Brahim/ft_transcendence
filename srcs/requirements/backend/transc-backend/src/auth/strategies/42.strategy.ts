/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-42';
import { userDto } from "../dto/user.dto";
import { ConfigService } from "@nestjs/config";
// import { AuthDto } from "../dto/user.dto";

@Injectable()
export class IntraStrategy extends PassportStrategy(Strategy, '42') {
    
    constructor(private configService: ConfigService) {
        super({
            clientID: configService.get('CLIENT_ID'),
            clientSecret: configService.get('SECRET'),
            callbackURL: configService.get('REDIRECT_URI'),
            profileFields: {
                'username': 'login',
                'email': 'email',
                'id' : 'id',
                'avatar': 'image.link',
            }
        }); // Config
    }
    
    async validate(accessToken: string, refreshToken: string, profile: any, done: Function): Promise<any> {
        const {username, email, id, avatar} = profile;
        const user: userDto = {
            username: username,
            email: email,
            intraId: id.toString(),
            Avatar: avatar,
        }
        done(null, user);
    }

}