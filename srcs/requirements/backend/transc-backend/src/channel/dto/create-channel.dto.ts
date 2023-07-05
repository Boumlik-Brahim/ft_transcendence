import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateChannelDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    channelName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    channelType: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    channelPassword: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    channelOwnerId: string;
}
