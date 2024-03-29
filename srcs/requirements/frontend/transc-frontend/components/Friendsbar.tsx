"use client";
import { OnlineFriends } from "../constant";
import Image from "next/image";
import { message_w, send_w } from "../public";
import { useEffect, useState } from "react";
import { friendShip, users_int } from "../interfaces";
import axios from "axios";
import { usePendingUsers } from "@/app/(dashboard)/profile/utils";
// import { socket } from "@/app/(dashboard)/profile/[userId]/page";
import Link from "next/link";
import { socket } from "./Notification";

type Props = {
  userId: string;
  userSessionId: string;
};


//& -----chat part --------

import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

import { redirect, useRouter } from 'next/navigation'


import {  useDispatch } from 'react-redux';
import { setOtherUser,selectedOne , setRefreshOn} from '@/app/store/reducer';
import { socketChat } from "./FriendAction";
//& --------------------------




function Friendsbar({ userId, userSessionId }: Props) {

  const isCreateChannelPopUpOn = useSelector(
    (state: RootState) => state.createChannelPopUpToggle
  );



  const [roomId, setRoomId] = useState("");
  const [checkRoomId, setCheckRoomId] = useState(false);
  const dispatch = useDispatch();
    
      const router = useRouter()
  
  
      
      const handleSubmitNotif = async ({userSessionId, friend} : {userSessionId : string ,friend : any}) => {
            dispatch(setOtherUser(friend.id));
            dispatch(selectedOne(friend.id));
            dispatch(setRefreshOn());
        
         socketChat.emit("joinRoom", {
          senderId: userSessionId,
          recieverId: friend.id
        });
         socketChat.on("joined", (data) => {
          setRoomId(data.roomName);
          // dispatch(setRefreshOn()); // 
  
          setCheckRoomId(!checkRoomId);
          router.push(`/chat/${data.roomName}`)
  
        });
      try {
         const res =  await axios.put(`${process.env.NEXT_PUBLIC_APP_URI}:3000/chat/${userSessionId}/${friend.id}`, {"seen": true});
  
        } catch (err) {
          console.log(err);
        }
  }
  
  
  // &--------------------------------------------------------------------------------------






  /* ------------------------------ fetch Friend ------------------------------ */
  const [notification, setNotification] = useState<string>("");
  const [friendShip, setFriendShip] = useState<friendShip[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userSessionId}/friend`
        );
        setFriendShip(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriends();
  }, [notification]);
  /* ------------------------------------ - ----------------------------------- */

  /* ------------------------------- getPending ------------------------------- */
  const friends = usePendingUsers(friendShip, userSessionId);
  /* ------------------------------------ - ----------------------------------- */

  /* -------------------------- friend requset socket ------------------------- */
  useEffect(() => {
    socket.on("AcceptRequest", (data) => {
      setNotification(data.userId + data.stats + data.friendId);
    });

    socket.on("DeleteFriendShip", (data) => {
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
    <div className={`${`${ isCreateChannelPopUpOn.createChannelPopUpToggled ? "blur-sm bg-gray-400" : ""} friend`}`}>
      <div className="w-[70%] flex flex-col gap-[50px]">
        <h1 className="text-white text-2xl font-bold place-self-start">
          Online Friend
        </h1>
        {friends && (
          <ul className="w-full flex flex-col gap-[30px] min-w-[200px]">
            {friends.map((friend, index) => (
              <li key={index} className="flex justify-between items-center">
                <Link href={`${process.env.NEXT_PUBLIC_APP_URI}:5173/profile/${friend.id}`}>
                  <div className="relative flex items-center gap-[10px] w-[100px]">
                    <div
                      className={`absolute 
                                      left-[50px] top-[50px] w-[20px] h-[20px]
                                      rounded-full outline outline-[5px] outline-primary
                            ${
                              friend.status === "ONLINE"
                                ? "bg-[#03A900]"
                                : friend.status === "OFFLINE"
                                ? "bg-[#e92514]"
                                : "bg-[#f8c303]"
                            }`}
                    ></div>
                    {/* <Image
                      src={friend?.Avatar}
                      width={70}
                      height={70}
                      alt={friend?.name}
                      className="rounded-full max-w-[70px] max-h-[70px] w-[70px] h-[70px] object-cover"
                    /> */}
                    <img src={friend?.Avatar} alt="avatar" className="rounded-full max-w-[70px] max-h-[70px] w-[70px] h-[70px] object-cover"/>

                    <p className="text-white font-medium text-[1rem]">
                      {friend?.name}
                    </p>
                  </div>
                </Link>
                <div className="friend_message"  onClick={() => handleSubmitNotif({ userSessionId, friend })}>
                  <Image src={send_w} width={30} alt={friend?.name} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Friendsbar;
