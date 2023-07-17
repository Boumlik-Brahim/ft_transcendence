import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "@prisma/client";

export class CreateChannelMemberDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    channelId: string;

    @ApiProperty()
    @IsEnum(Role)
    role: Role;
    
    @ApiProperty()
    @IsDateString()
    @IsOptional()
    bannedTime: Date;
    
    @ApiProperty()
    @IsDateString()
    @IsOptional()
    mutedTime: Date;

}
