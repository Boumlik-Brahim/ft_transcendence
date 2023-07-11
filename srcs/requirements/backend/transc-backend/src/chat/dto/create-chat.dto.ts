import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateChatDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty()
    @IsUUID()
    senderId: string;
    
    @ApiProperty()
    @IsUUID()
    recieverId: string;
}
