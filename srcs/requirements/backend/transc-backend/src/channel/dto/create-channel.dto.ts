import { ApiProperty } from "@nestjs/swagger";
import { ChannelType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateChannelDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    channelName: string;

    @ApiProperty()
    @IsEnum(ChannelType)
    channelType: ChannelType;

    @ApiProperty()
    @IsString()
    @IsOptional()
    channelPassword: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    channelOwnerId: string;
}
