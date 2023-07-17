import { ApiProperty } from "@nestjs/swagger";
import { Status } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateUserDto {

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
    IntraId: string
    
    @ApiProperty()
    @IsString()
    @IsUrl()
    @IsNotEmpty()
    Avatar: string

    @ApiProperty()
    @IsEnum(Status)
    status: Status
    
}
