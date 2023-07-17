import { ApiProperty } from "@nestjs/swagger";
import { FriendShipStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateFriendDto {

    @ApiProperty()
    @IsEnum(FriendShipStatus)
    friendShipStatus: FriendShipStatus

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    friendId: string

}