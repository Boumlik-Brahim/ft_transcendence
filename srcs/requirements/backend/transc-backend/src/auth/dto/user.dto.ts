import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class userDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    intraId: string;
    
    @IsString()
    @IsNotEmpty()
    Avatar: string;
}