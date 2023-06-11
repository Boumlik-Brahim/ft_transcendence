import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateGameDto {
    @IsNotEmpty()
    @IsNumber()
    creatorID : string;

    @IsString()
    invitedName : string;
}