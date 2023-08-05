export interface users_int
{
    id: string,
    name: string,
    email: string,
    IntraId: string,
    Avatar: string,
    status: string,
    created_at: string,
}

export interface SearchProps {
    user: users_int;
}

export interface friendShip
{
    friendShipStatus: string,
    userId: string,
    friendId: string,
}

export interface blockedUser
{
    userId: string,
    blockedUserId: string,
}

export interface userStat
{
    winsNumbr: number,
    lossesNumbr: number,
    rate: number
}

    interface MessageData {
        content: string;
        senderId: string;
        recieverId: string;
    }