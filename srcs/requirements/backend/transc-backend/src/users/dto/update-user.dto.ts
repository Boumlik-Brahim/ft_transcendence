import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from "@nestjs/swagger";
import { Status } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty()
    @IsString()
    @IsOptional()
    name: string
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string
    
    @ApiProperty()
    @IsString()
    @IsUrl()
    @IsNotEmpty()
    Avatar: string

    @ApiProperty()
    @IsEnum(Status)
    status: Status
    
}
