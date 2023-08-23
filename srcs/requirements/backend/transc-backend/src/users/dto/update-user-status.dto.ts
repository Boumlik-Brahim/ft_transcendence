import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from "@nestjs/swagger";
import { Status } from "@prisma/client";
import { IsEnum } from "class-validator";

export class updateUserStatusDto extends PartialType(CreateUserDto) {

    @ApiProperty()
    @IsEnum(Status)
    status: Status
  
}
