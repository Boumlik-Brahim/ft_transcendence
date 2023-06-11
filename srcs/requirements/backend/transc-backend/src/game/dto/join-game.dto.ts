import { IsNotEmpty, IsNumber, IsString} from "class-validator";

export class JoinGameDto {
    @IsNotEmpty()
    @IsString()
    gameID : string;

    @IsNotEmpty()
    @IsNumber()
    userId : number;
}