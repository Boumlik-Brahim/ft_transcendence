import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserStatDto {

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    winsNumbr: number
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    lossesNumbr: number
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    rate: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: string

}
