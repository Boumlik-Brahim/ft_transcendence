import { PartialType } from '@nestjs/swagger';
import { CreateChannelMemberDto } from './create-channelMember.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsDateString, IsNotEmpty } from "class-validator";

export class UpdateChannelMemberDto extends PartialType(CreateChannelMemberDto) {

    @ApiProperty()
    @IsBoolean()
    isAdmin: boolean;

    @ApiProperty()
    @IsBoolean()
    isBanned: boolean;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    bannedTime: Date;

    @ApiProperty()
    @IsBoolean()
    isMuted: boolean;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    mutedTime: Date;

}
