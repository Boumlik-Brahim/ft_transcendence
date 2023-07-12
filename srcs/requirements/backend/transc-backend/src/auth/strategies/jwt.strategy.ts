import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { JwtPayload } from './jwt-payload.interface';
// import { AuthService } from '../auth.service';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly configService: ConfigService,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: configService.get('JWT_SECRET'),
//     });
//   }

//   async validate(payload: JwtPayload): Promise<any> {
//     const user = await this.authService.validateUserById(payload.userId);

//     if (!user) {
//       throw new UnauthorizedException('Invalid token');
//     }

//     return user;
//   }
}
