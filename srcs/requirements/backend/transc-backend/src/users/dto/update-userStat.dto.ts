import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber} from "class-validator";
import { CreateUserStatDto } from './create-userStat.dto';

export class UpdateUserStatDto extends PartialType(CreateUserStatDto) {

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
    
}