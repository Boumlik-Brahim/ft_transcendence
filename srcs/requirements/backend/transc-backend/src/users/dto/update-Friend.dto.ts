import { PartialType } from '@nestjs/mapped-types';
import { CreateFriendDto } from './create-friend.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { FriendShipStatus } from '@prisma/client';

export class UpdateFriendDto extends PartialType(CreateFriendDto) {

    @ApiProperty()
    @IsEnum(FriendShipStatus)
    friendShipStatus: FriendShipStatus

}
