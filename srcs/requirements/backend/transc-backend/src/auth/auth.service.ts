import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { PrismaClient } from '@prisma/client';
// import { AuthDto } from "./dto/auth.dto";
// import * as bcrypt from 'bcryptjs';
// import { JwtService } from "@nestjs/jwt";
// import { JWT_SECRET } from "../utils/constants";
// import { Response } from "express";
// import { ConfigService } from '@nestjs/config';
// import { HttpClient } from '@nestjs/common';


@Injectable()
export class AuthService {
    constructor (private userService: UsersService) {}

    async valideUser(req: any) {
        // console.log(req.user.id);
        let user = this.userService.findOne(req.user.id);
        console.log(user);
        return ;
    }

    // constructor(private prisma: PrismaService, private jwt: JwtService) {} 
    // constructor(private http: HttpClient, private configService: ConfigService) {} 

    // async signUp(dto: AuthDto) {
    //     const {email, password} = dto;
    //     const foundUser = await this.prisma.user.findUnique({where: {email: dto.email}});

        
    //     if (foundUser){
    //         throw new BadRequestException('Email already exists');
    //     }
    //     const hashedPassword = await this.hashPassword(password);
    //     await this.prisma.user.create({
    //         data: {
    //             email,
    //             password: hashedPassword,
    //             Status: ['online'],
    //           }
    //     })
    //     return "I'm Sign Up";
    // }

    // async signIn(dto: AuthDto, res : Response) {
    //     const {email, password} = dto;

    //     const foundUser = await this.prisma.user.findUnique({where: {email: dto.email}});
    //     if (!foundUser){
    //         throw new BadRequestException('Wrong credentials1');
    //     }
    //     const isMatch = await this.comparePasswords({
    //         password,
    //         hash: foundUser.password,
    //     });
    //     if (!isMatch){
    //         throw new BadRequestException('Wrong credentials2');
    //     }
        
    //     const token = await this.signToken({
    //         id: foundUser.id,
    //         email: foundUser.email,
    //     });
    //     return res.header('Authorization', `Bearer ${token}`).send();
    // }

    // async signOut(res : Response) {
    //     res.header('Authorization', 'Bearer expired-token');
    //     return "SignOut Succefully";
    // }

    // async hashPassword(password: string): Promise<string> {
    //     const saltOrRounds = 10;

    //     return await bcrypt.hash(password, saltOrRounds); 
    // }

    // async comparePasswords(args: {password: string; hash: string}): Promise<boolean> {
    //     return await bcrypt.compare(args.password, args.hash);
    // }

    // async signToken(args: {id: number, email: string}) {
    //     const payload = args;

    //     return this.jwt.signAsync(payload, {secret: JWT_SECRET});
    // }
}