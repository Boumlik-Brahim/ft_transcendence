import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateChatDto {
    @ApiProperty()
    @IsUUID()
    id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty()
    @IsDate()
    created_at: Date;

    @ApiProperty()
    @IsNumber()
    senderId: number;

    @ApiProperty()
    @IsNumber()
    recieverId: number;
}
