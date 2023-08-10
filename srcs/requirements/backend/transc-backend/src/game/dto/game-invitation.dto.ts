import { IsNotEmpty, IsString} from "class-validator";

export class InvitationGameDto {
    @IsNotEmpty()
    @IsString()
    userId : string;

    @IsNotEmpty()
    @IsString()
    invitationId : string;
}