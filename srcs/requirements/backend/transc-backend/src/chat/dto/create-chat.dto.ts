import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateChatDto {
    @IsNumber()
    id: number;
    
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsDate()
    created_at: Date;

    @IsNumber()
    senderId: number;

    @IsNumber()
    recieverId: number;
}
