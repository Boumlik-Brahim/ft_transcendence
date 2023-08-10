import React, { useEffect, useState } from "react";
import { MessageData, friendShip } from "../interfaces";
import {
  deleteFriend,
  updateFriend,
  usePendingMessage,
  usePendingUsers,
} from "@/app/(dashboard)/profile/utils";
import axios from "axios";
import { close_r, message_b, notification_b, send_b, sms } from "../public";
import Image from "next/image";
// import { socket } from "@/app/(dashboard)/profile/[userId]/page";
import { io } from "socket.io-client";
import Cookies from "universal-cookie";
import Link from "next/link";
const cookies = new Cookies();
export const socket = io("http://localhost:3000", {
  auth: { userId: cookies.get("id") },
  transports: ["websocket"],
});

type props = {
  userId: string;
  userSession: string;
};

function Notification({ userId, userSession }: props) {
  /* ------------------------------ toggle_notif ------------------------------ */
  const [toggle_notif, setToggle_notif] = useState<boolean>(false);
  /* ------------------------------------ - ----------------------------------- */

  /* ------------------------------ notification ------------------------------ */
  const [notification, setNotification] = useState<string>("");
  /* ------------------------------------ - ----------------------------------- */

  /* ----------------------- get pending friend request ----------------------- */
  const [friendShip, setFriendShip] = useState<friendShip[]>([]);
  useEffect(() => {
    const fetchfriendShip = async () => {
      try {
        const response =
          userSession &&
          (await axios.get(
            `http://127.0.0.1:3000/users/${userSession}/pending`
          ));
        response && setFriendShip(response.data);
        if (friendShip.length === 0) setToggle_notif(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchfriendShip();
  }, [notification, userSession]);
  /* ------------------------------------ - ----------------------------------- */
  /* -------------------------- get received messages ------------------------- */
  const [messages, setMessages] = useState<MessageData[]>([]);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response =
          userSession &&
          (await axios.get(`http://localhost:3000/chat/${userSession}`));
        response && setMessages(response.data);
        if (messages.length === 0) setToggle_notif(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [notification, userSession]);
  /* ------------------------------------ - ----------------------------------- */

  /* ------------------------------- getPending ------------------------------- */
  const pendingUsers = usePendingUsers(friendShip, userSession);
  /* ------------------------------------ - ----------------------------------- */

  /* ------------------------------- getPending ------------------------------- */
  const pendingMessages = usePendingMessage(messages);
  /* ------------------------------------ - ----------------------------------- */

  /* -------------------------- friend requset socket ------------------------- */
  useEffect(() => {
    socket.on("DeleteRequest", (data) => {
      setNotification(data.userId + data.stats + data.friendId);
    });

    socket.on("AcceptRequest", (data) => {
      setNotification(data.userId + data.stats + data.friendId);
    });

    socket.on("RequestFriendShip", (data) => {
      setNotification(data.userId + data.stats + data.friendId);
    });

    socket.on("CancelFriendShip", (data) => {
      setNotification(data.userId + data.stats + data.friendId);
    });

    socket.on("DeleteFriendShip", (data) => {
      setNotification(data.userId + data.stats + data.friendId);
    });

    socket.on("notifMessage", (data) => {
      setNotification(data.senderId + data.content + data.recieverId);
    });

    return () => {
      socket.off("friendRequest");
    };
  }, [notification]);
  /* ------------------------------------ - ----------------------------------- */

  return (
    <>
      <div
        className="relative"
        onClick={() => {
          setToggle_notif(!toggle_notif);
        }}
      >
        <Image
          src={notification_b}
          width={40}
          alt="avatar"
          className="cursor-pointer"
        />
        {((pendingUsers && pendingUsers.length > 0) ||
          (pendingMessages && pendingMessages.length > 0)) && (
          <div className="absolute w-[12px] h-[12px] top-1 md:right-1 right-4 bg-red-400 rounded-full"></div>
        )}
      </div>
      {toggle_notif &&
        ((pendingUsers && pendingUsers.length > 0) ||
          (pendingMessages && pendingMessages.length > 0)) && (
            <ul className="max-h-[400px] overflow-y-scroll overflow-hidden gradients shadow-lg flex flex-col gap-[40px] px-[3rem] py-[2rem] absolute w-[80%] md:w-[500px] top-[15vh] md:top-[60px] right-0 z-10">
              {pendingUsers?.map((user, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div className="relative flex items-center gap-[10px] w-[100px]">
                    <Image
                      src={user.Avatar}
                      width={50}
                      height={50}
                      alt="avatar"
                      className="rounded-full max-w-[50px] max-h-[50px] w-[40px] h-[40px] object-cover"
                    />
                    <p className="text-primary font-semibold">{user.name}</p>
                  </div>

                  <div className="friend_message flex gap-[10px] items-center">
                    <button
                      className="bg-blue-500 font-medium text-sm text-white py-[5px] px-[10px] rounded-2xl hover:opacity-60"
                      onClick={async () => {
                        await updateFriend(user.id, userSession);
                        socket.emit("AcceptRequest", {
                          userId: user.id,
                          friendId: userId,
                          status: "AcceptRequestv",
                        });
                      }}
                    >
                      Accept
                    </button>

                    <Image
                      src={close_r}
                      width={30}
                      alt="decline"
                      className="cursor-pointer hover:opacity-60"
                      onClick={async () => {
                        await deleteFriend(user.id, userSession);
                        socket.emit("DeleteRequest", {
                          userId: user.id,
                          friendId: userId,
                          status: "DeleteRequest",
                        });
                      }}
                    />
                  </div>
                </li>
              ))}
              {pendingMessages?.map((msg, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex gap-[10px] items-center w-[300px]">
                      <Image
                        src={msg.Avatar}
                        width={80}
                        height={80}
                        alt="avatar"
                        className="rounded-full max-w-[50px] max-h-[50px] w-[40px] h-[40px] object-cover"
                      />
                      <div className="flex flex-col">
                        <p className="text-primary font-semibold">
                          {" "}
                          {msg.name}
                        </p>
                        <p className="text-[#464646] w-[250px] font-sm truncate">
                          {" "}
                          {messages[index].content}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link href={`/chat/${messages[index].roomId}`}>
                    <Image
                      src={send_b}
                      width={30}
                      alt="decline"
                      className="cursor-pointer hover:opacity-60"
                    />
                  </Link>
                </li>
              ))}
            </ul>
        )}
    </>
  );
}

export default Notification;
