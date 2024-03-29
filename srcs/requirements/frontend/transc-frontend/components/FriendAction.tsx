import {
  block,
  createFriend,
  deleteFriend,
  unblock,
} from "@/app/(dashboard)/profile/utils";
import { blockedUser, friendShip, userStat, users_int } from "../interfaces";
import {
  adduser_b,
  block_r,
  close_b,
  deleteuser_b,
  forbidden_b,
  game_b,
  send_b,
  unblock_b,
} from "../public";
import { io, Socket } from 'socket.io-client'
import Cookies from 'universal-cookie';


import Image from "next/image";
// import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";
// import { Props } from "@/app/(dashboard)/profile/[userId]/page";

// export const socket = io("http://localhost:3000", {
//   transports: ["websocket"],
// });
//& -----chat part --------
const cookies = new Cookies();
export const socketChat = io(`${process.env.NEXT_PUBLIC_APP_URI}:3000/chatGateway`, {
  auth: { userId: cookies.get('id') }
});

import { redirect, useRouter } from 'next/navigation'


import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, setOtherUser,selectedOne , setRefreshOn} from '@/app/store/reducer';
import { RootState } from '@/app/store/store';
import { socket } from "./Notification";
import exp from "constants";
import { createHash } from "crypto";
import { CreateGameType } from "@/app/(dashboard)/game/page";
import { useSocket } from "@/app/socket";
//& --------------------------

type Props = {
  userId: string;
  userSessionId: string;
};

// useEffect(() => {
//   const cookies = new Cookies();
//   socket.current = io("ws://localhost:3000", { auth: { userId: cookies.get('id') } });
// }, [])

function FriendAction({ userId, userSessionId }: Props) {



  
  
  
  
  
  const dispatch = useDispatch();
  const [roomId, setRoomId] = useState("");
  const mySocket = useSocket()
  const router = useRouter();
  const accessToken = cookies.get('accessToken');

  const createGame = (isRamdomOponent : boolean) : void => {
    if (!mySocket) return;
    if (!mySocket.connected) return ;
    if (userSessionId) {
      const data : CreateGameType = {
        invitedId : userId,
        creatorId : userSessionId,
        isRamdomOponent,
      }
      mySocket.emit('createGame', data);
    }
  }

  (userId !== userSessionId) && (
    
    // &--------------------------------------  CHAT PART ------------------------------------  
    useEffect(() => {
      // socketChat.emit("joinRoom", {
        //     senderId: userSessionId,
        //     recieverId: userId
        // });
        
        // socketChat.on("joined", (data) => {
          //   setRoomId(data.roomName);
          // });

      
          const roomID = [userSessionId, userId].sort().join('-');
          const hasshedRoomName = createHash('sha256').update(roomID).digest('hex');
          setRoomId(hasshedRoomName);
          
        },[userId, userSessionId])
        
        )
  const handleSubmit = async ({userSessionId,userId} : {userSessionId : string ,userId : string}) => {
  
    dispatch(setOtherUser(userId));
    dispatch(selectedOne(userId));
    // dispatch(setRefreshOn());

    

    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_APP_URI}:3000/chat/${userSessionId}/${userId}`, {"seen": true});
      
    } catch (err) {
      console.log(err);
    }
    
    socketChat.emit("joinRoom", {
        senderId: userSessionId,
        recieverId: userId
    });
  }


  // const handleSubmit = async ({userSessionId,userId} : {userSessionId : string ,userId : string}) => {
    
  //   (userId !== userSessionId) && socketChat.emit("joinRoom", {
  //     senderId: userSessionId,
  //     recieverId: userId
  //   });
    
  //   socketChat.on("joined", (data) => {
  //     setRoomId(data.roomName);
  //     dispatch(setRefreshOn()); // 

  //     router.push(`/chat/${data.roomName}`)

      
  //   });

  //     dispatch(setOtherUser(userId));
  //     dispatch(selectedOne(userId));
  //     dispatch(setRefreshOn());
      
  //     try {
  //         const res = await axios.put(`${process.env.NEXT_PUBLIC_APP_URI}:3000/chat/${userSessionId}/${userId}`, {"seen": true});
  
  //       } catch (err) {
  //         console.log(err);
  //       }
  // }

  
  // &--------------------------------------------------------------------------------------

  const [notification, setNotification] = useState<string>("");
  const [friendShipStatus, setFriendShipStatus] = useState<string>("");

  /* -------------------------- set  friendShipStatus ------------------------- */


    useEffect(() => {

      mySocket.on('Success', data => {
        console.log(data);
        const { id } = data;
        router.push(`/game/${id}`)
      });

      return (() => {
        mySocket.off('Success');
      });
      
    }, [mySocket])

  useEffect(() => {

    const fetchfriendShip = async () => {
      try {

        
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userSessionId}/friendShip/${userId}`, { 
              withCredentials: true, 
              headers: {
                      Authorization: `Bearer ${accessToken}`,
                    }, 
              }
        );
        if (response.data && response.data.length > 0) {
          if (response.data[0]?.friendShipStatus === "PENDING")
            setFriendShipStatus(
              response.data[0]?.userId === userSessionId
                ? "PENDING"
                : "NOFRIEND"
            );
          else setFriendShipStatus("ACCEPTED");
        } else {
          setFriendShipStatus("NOFRIEND");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchfriendShip();
  }, [friendShipStatus, notification]);
  /* ------------------------------------ - ----------------------------------- */

  /* ---------------------------- get blocked stats --------------------------- */
  const [blockStatus, setBlockStatus] = useState<string>("");
  const [blockStat, setBlockStat] = useState<blockedUser[]>([]);

  useEffect(() => {
    const fetchblocked = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userSessionId}/block/${userId}`,{ 
              withCredentials: true, 
              headers: {
                      Authorization: `Bearer ${accessToken}`,
                    }, 
              }
        );
        if (response.data && response.data.length > 0) {
          setBlockStat(response.data);
          if (response.data[0].userId === userSessionId)
            setBlockStatus("BLOCKER");
          else if (response.data[0].blockedUserId === userSessionId)
            setBlockStatus("BLOCKED");
        } else {
          setBlockStatus("UNBLOCKING");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchblocked();
  }, [blockStatus, notification]);
  /* ------------------------------------ - ----------------------------------- */

  /* ----------------------------- fetch userStat ----------------------------- */
  const [userStat, setUserStat] = useState<userStat>();
  useEffect(() => {
    const fetchUserStat = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userId}/userStat`, { 
              withCredentials: true, 
              headers: {
                      Authorization: `Bearer ${accessToken}`,
                    }, 
              }
        );
        setUserStat(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserStat();
  }, [userId]);
  /* ------------------------------------ - ----------------------------------- */

  /* ----------------------------- fetch friend ----------------------------- */
  const [friends, setFriends] = useState<users_int[]>();
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        // const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userId}/friend`,{
        //   credentials: "include",
        // })
        // const res = await response.json();
        // setFriends(res);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userId}/friend`,{ 
              withCredentials: true, 
              headers: {
                  Authorization: `Bearer ${accessToken}`,
              }, 
              }
        );
        setFriends(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriends();
  }, [userId, notification]);
  /* ------------------------------------ - ----------------------------------- */

  /* -------------------------- friend requset socket ------------------------- */
  useEffect(() => {
    socket.on("DeleteRequest", (data) => {
      setFriendShipStatus("NOFRIEND");
      setNotification(data.userId + data.stats + data.friendId);
    });

    socket.on("AcceptRequest", (data) => {
      setFriendShipStatus("ACCEPTED");
      setNotification(data.userId + data.stats + data.friendId);
    });

    socket.on("DeleteFriendShip", (data) => {
      setNotification(data.userId + data.stats + data.friendId);
    });

    socket.on("UnblockFriend", (data) => {
      setNotification(data.userId + data.stats + data.friendId);
    });

    socket.on("BlockFriend", (data) => {
      setNotification(data.userId + data.stats + data.blockedId);
    });

    return () => {
      socket.off("friendRequest");
    };
  }, [notification]);
  /* ------------------------------------ - ----------------------------------- */

  return (
    <>
      {(userId !== userSessionId) && (
        <div className="flex flex-wrap gap-[10px] justify-center w-[200px] xs:w-[300px] md:w-[400px]">
          {blockStatus === "UNBLOCKING" ? (
            <>
              <div
                className="card_friend gradients"
                onClick={async (event) => {
                  if (friendShipStatus === "NOFRIEND") {
                    await createFriend(userSessionId, userId);
                    setFriendShipStatus("PENDING");
                    socket.emit("RequestFriendShip", {
                      userId: userSessionId,
                      friendId: userId,
                      stats: "RequestFriendShip",
                    });
                  } else if (friendShipStatus === "PENDING") {
                    await deleteFriend(userSessionId, userId);
                    setFriendShipStatus("NOFRIEND");
                    socket.emit("CancelFriendShip", {
                      userId: userSessionId,
                      friendId: userId,
                      stats: "CancelFriendShip",
                    });
                  } else if (friendShipStatus === "ACCEPTED") {
                    await deleteFriend(userSessionId, userId);
                    setFriendShipStatus("NOFRIEND");
                    socket.emit("DeleteFriendShip", {
                      userId: userSessionId,
                      friendId: userId,
                      stats: "DeleteFriendShip",
                    });
                  }
                }}
              >
                <Image
                  src={
                    friendShipStatus === "ACCEPTED"
                      ? deleteuser_b
                      : friendShipStatus === "PENDING"
                      ? close_b
                      : adduser_b
                  }
                  width={30}
                  alt="avatar"
                />
              </div>
              <div
                className="card_friend gradients"
                onClick={async () => {
                  await block(userSessionId, userId);
                  await deleteFriend(userSessionId, userId);
                  setBlockStatus("BLOCKER");
                  socket.emit("BlockFriend", {
                    userId: userSessionId,
                    blockedId: userId,
                    stats: "BLOCKING",
                  });
                }}
              >
                <Image src={block_r} width={30} alt="avatar" />
              </div>
              <div className="card_friend gradients"onClick={() => handleSubmit({ userSessionId, userId })}>
                  {<Link href={`/chat/${roomId}`}>
                  <Image src={send_b} width={30} alt="avatar" />
                  </Link>}
              </div> 
              <div className="card_friend gradients" onClick={() => createGame(false)}>
                <Image src={game_b} width={30} alt="avatar" />
              </div>
            </>
          ) : blockStatus === "BLOCKER" ? (
            <>
              <div
                className="card_friend gradients"
                onClick={async () => {
                  await unblock(userSessionId, userId);
                  setBlockStatus("UNBLOCKING");
                  socket.emit("UnblockFriend", {
                    userId: userSessionId,
                    blockedUserId: userId,
                    stats: "UNBLOCKING",
                  });
                }}
              >
                <Image src={unblock_b} width={30} alt="avatar" />
              </div>
            </>
          ) : (
            <div className="title"> You Are Blocked </div>
          )}
        </div>
      )}
      <div className="flex flex-wrap gap-[20px] justify-center  w-[200px] xs:w-[300px] md:w-[400px]">
        <div className="card gradients">
          <p className="font-bold xs:text-3xl">
            {friends && friends.length > 0 ? friends.length : "0"}
          </p>{" "}
          FRIENDS
        </div>
        <div className="card gradients">
          <p className="font-bold xs:text-3xl">
            {userStat ? userStat.winsNumbr : "--"}
          </p>{" "}
          WINS
        </div>
        <div className="card gradients">
          <p className="font-bold xs:text-3xl">
            {userStat ? userStat.lossesNumbr : "--"}
          </p>{" "}
          LOSES
        </div>
      </div>
    </>
  );
}

export default FriendAction;
