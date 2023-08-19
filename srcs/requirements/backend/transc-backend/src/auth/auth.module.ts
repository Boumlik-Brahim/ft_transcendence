import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JWT_SECRET } from '../utils/constants';
import { UsersModule } from "src/users/users.module";
import { IntraStrategy } from "./strategies/42.strategy";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
      UsersModule,
      PassportModule,
      ],
    controllers: [AuthController],
    providers: [AuthService, IntraStrategy, ConfigService, JwtService,],
})
export class AuthModule {}