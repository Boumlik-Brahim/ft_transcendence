import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";

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
