export interface users_int
{
    id: string;
    name: string;
    email: string;
    IntraId: string;
    Avatar: string;
    status: string;
    created_at: string;
}
export interface notif
{
    id: string;
    name: string;
    Avatar: string;
    status: string;
    created_at: Date;
}

export interface SearchProps {
    user: users_int;
}

export interface friendShip
{
    friendShipStatus: string;
    userId: string;
    friendId: string;
    created_at: Date;
}

export interface blockedUser
{
    userId: string;
    blockedUserId: string;
}

export interface userStat
{
    winsNumbr: number;
    lossesNumbr: number;
    rate: string;
}

export interface history 
{
    id: string;
    playerA_Score: number;
    playerB_Score: number;
    created_at: string;
    playerA_id: string;
    playerB_id: string;
}

export interface opponents 
{
    playerA_Score: number;
    playerB_Score: number;
    playerA_name: string;
    playerA_Avatar: string;
    playerB_name: string;
    playerB_Avatar: string;
}

export interface MessageData 
{
    content: string;
    senderId: string;
    recieverId: string;
    roomId: string;
}

export interface notifMessage 
{
    user: users_int;
    numberOfMsg: number;
    content: string;
}
export interface leaders_list 
{
    user: users_int;
    rate: number;
    winsNumbr: number;
    lossesNumbr: number;
}