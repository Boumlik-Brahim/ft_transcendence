import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
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