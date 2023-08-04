import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateChannelMessageDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    channelId: string;

}
