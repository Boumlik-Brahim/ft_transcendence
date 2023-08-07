import { PartialType } from '@nestjs/swagger';
import { CreateChannelDto } from './create-channel.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateChannelDto{

    @ApiProperty()
    @IsString()
    @IsOptional()
    channelName: string;

}
