import { PartialType } from '@nestjs/mapped-types';
import { CreateChatDto } from './create-chat.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class UpdateChatDto extends PartialType(CreateChatDto) {

    @ApiProperty()
    @IsBoolean()
    seen: boolean;
}
