import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

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
    bannedTime: Date;

    @ApiProperty()
    @IsBoolean()
    isMuted: boolean;

    @ApiProperty()
    @IsDateString()
    mutedTime: Date;

}
