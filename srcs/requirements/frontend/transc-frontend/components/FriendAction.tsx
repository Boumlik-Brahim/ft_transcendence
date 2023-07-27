import { block, createFriend, deleteFriend, unblock } from "@/app/(dashboard)/profile/utils";
import { blockedUser, friendShip } from "../interfaces";
import { adduser_b, block_r, close_b, deleteuser_b, forbidden_b, game_b, send_b, unblock_b } from "../public";

import Image from "next/image"
import { io } from 'socket.io-client';
import { useEffect, useState } from "react";
import axios from "axios";


export const socket = io('http://localhost:3000', { transports: ['websocket'] });

type Props = {
    userId: string,
    userSessionId: string,
    status: string,
    setStatus: (newStatus: string) => void
}


function FriendAction({ userId, userSessionId, status, setStatus }: Props) {


    /* ---------------------------- get blocked users --------------------------- */
    const [isBlock, setIsBlock] = useState<Boolean>();
    const [blockStat, setBlockStat] = useState<blockedUser[]>([])

    useEffect(() => {
        const fetchblocked = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/users/${userSessionId}/blockedUserOne`);
                setIsBlock((response.data && response.data.length) ? true : false)
                setBlockStat(response.data);
                console.log('------------>', response.data)
            } catch (error) { console.log(error); }
        }
        fetchblocked();
    }, [])
    /* ------------------------------------ - ----------------------------------- */


    
    /* -------------------------- get FriendShip status ------------------------- */
    const [friendShip, setFriendShip] = useState<friendShip[]>();

    useEffect(() => {
        const fetchfriendShip = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/users/${userSessionId}/friendShip/${userId}`);
                setFriendShip(response.data);
            } catch (error) { console.log(error); }
        }
        fetchfriendShip();
    }, [status]);

    useEffect(() => {
        const fetched = friendShip;
        setStatus(fetched?.length ? fetched[0].friendShipStatus : "NOFRIEND")
    }, [friendShip, userId])
    /* ------------------------------------ - ----------------------------------- */


    /* -------------------------- friend requset socket ------------------------- */
    const [notification, setNotification] = useState<string>("");
    useEffect(() => {

        socket.on('friendDeletion', (data) => {
            console.log('friendDeletion from', data.userId)
            // setStatus("NOFRIEND")
            setNotification(data.userId + data.status)
        });

        socket.on('friendCreation', (data) => {
            console.log('friendCreation from', data.userId)
            setNotification(data.userId + data.status)
            // setStatus(data.userId + data.status)
        });

        socket.on('unblockfriend', (data) => {
            console.log('unblockfriend from', data)
            setNotification(data.blockedUserId + data.status)
            // setStatus(data.blockedUserId + data.status)
        });

        socket.on('blockfriend', (data) => {
            console.log('blockfriend from XXXXXXX', data)
            setNotification(data.blockedUserId + data.status)
            // setStatus(data.blockedUserId + data.status)
        });

        return () => {
            socket.off('friendRequest');
        };
    }, [notification]);
    /* ------------------------------------ - ----------------------------------- */


    return (
        <div className="flex bg-green-200 flex-wrap gap-[10px] justify-center  w-[200px] xs:w-[300px] md:w-[400px]">
            {
                ((blockStat.length === 0) || (blockStat[0]?.userId === userSessionId)) && (
                    <>
                    
                        <div className="card_friend gradients"
                            onClick={
                                async (event) => {
                                    if (status === "NOFRIEND") {
                                        await createFriend(userSessionId, userId) && setStatus("PENDING");
                                        socket.emit('friendRequest', {
                                            userId: userSessionId,
                                            status: "REQUEST"
                                        });
                                    }
                                    else if (status === "PENDING" || status === "ACCEPTED") {
                                        await deleteFriend(userSessionId, userId) && setStatus("NOFRIEND");
                                        socket.emit('friendCancel', {
                                            userId: userSessionId,
                                            status: "CANCEL"
                                        });
                                    }
                                }}
                                >
                            <Image src={status === "ACCEPTED" ? deleteuser_b : status === "PENDING" ? close_b : adduser_b} width={30} alt="avatar" />
                        </div>
                        <div className="card_friend gradients"
                            onClick={
                                async () => {
                                    if (isBlock) {
                                        await unblock(userSessionId, userId);
                                        setIsBlock(false);
                                        socket.emit('unblockfriend', {
                                            blockedUserId: userId,
                                            status: "unblock"
                                        });
                                    }
                                    else {
                                        await block(userSessionId, userId);
                                        setIsBlock(true);
                                        socket.emit('blockfriend', {
                                            blockedUserId: userId,
                                            status: "block"
                                        });
                                    }
                                }}
                        >
                            <Image src={isBlock ? block_r : unblock_b} width={30} alt="avatar" />
                        </div>
                        <div className="card_friend gradients"><Image src={send_b} width={30} alt="avatar" /></div>
                        <div className="card_friend gradients"><Image src={game_b} width={30} alt="avatar" /></div>
                        <div>leng : {blockStat.length}</div>
                        <div>USER : {blockStat[0]?.userId}</div>
                    <div>SESSION: {userSessionId}</div>
                    </>
                ) 
            }
        </div>

    )
}

export default FriendAction