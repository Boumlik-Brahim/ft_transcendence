import { PartialType } from '@nestjs/swagger';
import { CreateChannelMemberDto } from './create-channelMember.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsDateString, IsNotEmpty, IsOptional } from "class-validator";
import { Role } from '@prisma/client';

export class UpdateChannelMemberDto extends PartialType(CreateChannelMemberDto) {

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
