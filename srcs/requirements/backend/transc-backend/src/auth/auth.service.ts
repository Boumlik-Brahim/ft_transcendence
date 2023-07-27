import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { PrismaService } from 'prisma/prisma.service';
import { JwtPayload } from "./type/jwt-payload.type"
import { JwtService } from "@nestjs/jwt";
import { JWT_SECRET } from "../utils/constants";
import { User } from "../users/user.interface";
import { LOGIN_REDIRECT_URL, PROFILE_REDIRECT_URL } from "src/utils/constants";
import { Req } from "@nestjs/common";


@Injectable()
export class AuthService {
    constructor ( private userService: UsersService,
                    private prisma: PrismaService,
                    private jwt: JwtService) {}
                    
    async getUser(req: any) {
        console.log(req.user);
        let user = await this.userService.findOneWithMail(req.user.email);
        if (user)
            return user;
        const newUser = await this.prisma.user.create({
            data: {
                name: req.user.username,
                email: req.user.email,
                IntraId: req.user.id,
                Avatar: req.user.avatarUrl,
                // status: 'ONLINE',
            },
        })
        return newUser;
    }

    async redirectBasedOnTwoFa(res: any, user: User): Promise<void> {
        if (!user.twoFa) {
          return res.redirect(LOGIN_REDIRECT_URL);
        } else {
          return res.redirect(PROFILE_REDIRECT_URL);
        }
      }
    
    async signToken(@Req() req: any) : Promise<string>{
        const payload: JwtPayload = {id: req.user.id, email: req.user.email};
        return await this.jwt.signAsync(payload, {secret: JWT_SECRET});
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

}