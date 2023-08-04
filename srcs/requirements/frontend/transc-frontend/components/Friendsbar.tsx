"use client";
import { OnlineFriends } from "../constant";
import Image from "next/image";
import { message_w, send_w } from "../public";
import { useEffect, useState } from "react";
import { friendShip, users_int } from "../interfaces";
import axios from "axios";
import { usePendingUsers } from "@/app/(dashboard)/profile/utils";
import { socket } from "@/app/(dashboard)/profile/[userId]/page";
import Link from "next/link";

type Props = {
  userId: string;
  userSessionId: string;
};

function Friendsbar({ userId, userSessionId }: Props) {
  /* ------------------------------ fetch Friend ------------------------------ */
  const [notification, setNotification] = useState<string>("");
  const [friendShip, setFriendShip] = useState<friendShip[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/users/${userSessionId}/friend`
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
    <div className="friend">
      <div className="w-[70%] flex flex-col gap-[50px]">
        <h1 className="text-white text-2xl font-bold place-self-start">
          Online Friend
        </h1>
        {friends && (
          <ul className="w-full flex flex-col gap-[30px] min-w-[200px]">
            {friends.map((friend, index) => (
              <li key={index} className="flex justify-between items-center">
                <Link href={`${friend.id}`}>
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
                    <Image
                      src={friend?.Avatar}
                      width={70}
                      height={70}
                      alt={friend?.name}
                      className="rounded-full max-w-[70px] max-h-[70px] w-[70px] h-[70px] object-cover"
                    />
                    <p className="text-white font-medium text-[1rem]">
                      {friend?.name}
                    </p>
                  </div>
                </Link>
                <div className="friend_message">
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
