import { IsNotEmpty, IsNumber, IsString} from "class-validator";

export class JoinGameDto {
    @IsNotEmpty()
    @IsString()
    gameId : string;

    @IsNotEmpty()
    @IsString()
    userId : string;
}