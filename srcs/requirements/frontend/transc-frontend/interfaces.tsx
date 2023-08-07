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

export interface history 
{
    playerA_Score: number,
    playerB_Score: number,
    created_at: string,
    playerA: users_int,
    playerB: users_int,
    playerA_id: string
    playerB_id: string
}

export interface MessageData 
{
    content: string;
    senderId: string;
    recieverId: string;
}