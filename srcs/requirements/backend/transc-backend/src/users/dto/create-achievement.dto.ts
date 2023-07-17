import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateAchievementDto {

    @ApiProperty()
    @IsString()
    @IsUrl()
    @IsNotEmpty()
    achievement: string
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: string

}
