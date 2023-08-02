import { block, createFriend, deleteFriend, unblock } from "@/app/(dashboard)/profile/utils";
import { blockedUser, friendShip } from "../interfaces";
import { adduser_b, block_r, close_b, deleteuser_b, forbidden_b, game_b, send_b, unblock_b } from "../public";



import Image from "next/image"
import { io } from 'socket.io-client';
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";


export const socket = io('http://localhost:3000', { transports: ['websocket'] });

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, setOtherUser,selectedOne , setRefreshOn} from '@/app/store/reducer';
import { RootState } from '@/app/store/store';


type Props = {
    userId: string,
    userSessionId: string,
}


function FriendAction({ userId, userSessionId }: Props) {
    // &--------------------------------------  CHAT PART ------------------------------------
interface MessageData {
    content: string;
    senderId: string;
    recieverId: string;
}

const [roomId, setRoomId] = useState("");


const dispatch = useDispatch();
useEffect(() => {
    socket.emit("joinRoom", {
        senderId: userSessionId,
        recieverId: userId
    });
    
    socket.on("joined", (data) => {
        setRoomId(data.roomName);
        
    });

},[ userId, userSessionId])

const handleSubmit = async ({userSessionId,userId} : {userSessionId : string ,userId : string}) => {
    dispatch(setOtherUser(userId));
    dispatch(selectedOne(userId));
    dispatch(setRefreshOn());
    
    try {
        const res = await axios.put(`http://localhost:3000/chat/${userSessionId}/${userId}`, {"seen": true});

      } catch (err) {
        console.log(err);
      }
}



// &--------------------------------------------------------------------------------------
    const [notification, setNotification] = useState<string>("");
    const [friendShipStatus, setFriendShipStatus] = useState<string>("");

    /* -------------------------- set  friendShipStatus ------------------------- */
    useEffect(() => {
        const fetchfriendShip = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/users/${userSessionId}/friendShip/${userId}`);
                if (response.data && response.data.length > 0) {
                    if (response.data[0]?.friendShipStatus === "PENDING")
                        setFriendShipStatus((response.data[0]?.userId === userSessionId) ? "PENDING" : "NOFRIEND")
                    else
                        setFriendShipStatus("ACCEPTED")
                }
                else { setFriendShipStatus("NOFRIEND") }

            } catch (error) { console.log(error); }
        }
        fetchfriendShip();
    }, [friendShipStatus, notification])
    /* ------------------------------------ - ----------------------------------- */


    /* ---------------------------- get blocked stats --------------------------- */
    const [blockStatus, setBlockStatus] = useState<string>("");
    const [blockStat, setBlockStat] = useState<blockedUser[]>([])

    useEffect(() => {
        const fetchblocked = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/users/${userSessionId}/block/${userId}`);
                console.log("response == ", response.data)
                if (response.data && response.data.length > 0) {
                    setBlockStat(response.data);
                    if (response.data[0].userId === userSessionId)
                        setBlockStatus("BLOCKER");
                    else if (response.data[0].blockedUserId === userSessionId)
                        setBlockStatus("BLOCKED");
                }
                else { setBlockStatus("UNBLOCKING"); }
            } catch (error) { console.log(error); }
        }
        fetchblocked();
        console.log("STAT == ", blockStatus)
    }, [blockStatus, notification])
    /* ------------------------------------ - ----------------------------------- */


    /* -------------------------- friend requset socket ------------------------- */
    useEffect(() => {
        socket.on('DeleteRequest', (data) => {
            setFriendShipStatus("NOFRIEND")
            setNotification(data.userId + data.stats + data.friendId)
        });

        socket.on('AcceptRequest', (data) => {
            setFriendShipStatus("ACCEPTED")
            setNotification(data.userId + data.stats + data.friendId)
        });

        socket.on('DeleteFriendShip', (data) => {
            setNotification(data.userId + data.stats + data.friendId)
        });

        socket.on('UnblockFriend', (data) => {
            setNotification(data.userId + data.stats + data.friendId)
        });

        socket.on('BlockFriend', (data) => {
            setNotification(data.userId + data.stats + data.blockedId)
        });

        return () => {
            socket.off('friendRequest');
        };
    }, [notification]);
    /* ------------------------------------ - ----------------------------------- */


    return (
        <div className="flex flex-wrap gap-[10px] justify-center  w-[200px] xs:w-[300px] md:w-[400px]">
            {
                (blockStatus === "UNBLOCKING") ? (
                    <>
                        <div className="card_friend gradients"
                            onClick={
                                async (event) => {
                                    console.log("Status == ", friendShipStatus)
                                    if (friendShipStatus === "NOFRIEND") {
                                        await createFriend(userSessionId, userId);
                                        setFriendShipStatus("PENDING");
                                        socket.emit('RequestFriendShip', {
                                            userId: userSessionId,
                                            friendId: userId,
                                            stats: "RequestFriendShip"
                                        });
                                    }
                                    else if (friendShipStatus === "PENDING") {
                                        await deleteFriend(userSessionId, userId);
                                        setFriendShipStatus("NOFRIEND");
                                        socket.emit('CancelFriendShip', {
                                            userId: userSessionId,
                                            friendId: userId,
                                            stats: "CancelFriendShip"
                                        });
                                    }
                                    else if (friendShipStatus === "ACCEPTED") {
                                        console.log("Status == ACCEPTED :", friendShipStatus)
                                        await deleteFriend(userSessionId, userId);
                                        setFriendShipStatus("NOFRIEND");
                                        socket.emit('DeleteFriendShip', {
                                            userId: userSessionId,
                                            friendId: userId,
                                            stats: "DeleteFriendShip"
                                        });
                                    }
                                }}
                        >
                            <Image src={friendShipStatus === "ACCEPTED" ? deleteuser_b : friendShipStatus === "PENDING" ? close_b : adduser_b} width={30} alt="avatar" />
                        </div>
                        <div className="card_friend gradients"
                            onClick={
                                async () => {
                                    await block(userSessionId, userId);
                                    setBlockStatus("BLOCKER")
                                    socket.emit('BlockFriend', {
                                        userId: userSessionId,
                                        blockedId: userId,
                                        stats: "BLOCKING"
                                    });
                                }}
                        >
                            <Image src={block_r} width={30} alt="avatar" />
                        </div>
                        <div className="card_friend gradients" onClick={() => handleSubmit({userSessionId, userId})}>
                               {  <Link  href={`/chat/${roomId}` }>
                                    <Image src={send_b} width={30} alt="avatar"  />
                                </Link>}
                        </div>
                        <div className="card_friend gradients"><Image src={game_b} width={30} alt="avatar" /></div>
                    </>
                ) : (blockStatus === "BLOCKER") ? (
                    <>
                        <div className="card_friend gradients"
                            onClick={
                                async () => {
                                    await unblock(userSessionId, userId);
                                    setBlockStatus("UNBLOCKING")
                                    socket.emit('UnblockFriend', {
                                        userId: userSessionId,
                                        blockedUserId: userId,
                                        stats: "UNBLOCKING"
                                    });
                                }}
                        >
                            <Image src={unblock_b} width={30} alt="avatar" />
                        </div>
                    </>
                ) : (<div className="title"> You Are Blocked </div>)
            }
        </div>

    )
}

export default FriendAction
