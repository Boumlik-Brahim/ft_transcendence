import { PartialType } from '@nestjs/swagger';
import { CreateChannelMemberDto } from './create-channelMember.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateChannelMemberDto extends PartialType(CreateChannelMemberDto) {

    @ApiProperty()
    @IsBoolean()
    isAdmin: boolean;

    @ApiProperty()
    @IsBoolean()
    isBanned: boolean;
    
    @ApiProperty()
    @IsDate()
    @IsOptional()
    bannedTime: Date;
    
    @ApiProperty()
    @IsBoolean()
    isMuted: boolean;

    @ApiProperty()
    @IsDate()
    @IsOptional()
    mutedTime: Date;

}
