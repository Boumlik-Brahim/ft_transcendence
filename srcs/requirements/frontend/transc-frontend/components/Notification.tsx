import React, { useEffect, useState } from "react";
import { friendShip } from "../interfaces";
import {
  deleteFriend,
  updateFriend,
  usePendingUsers,
} from "@/app/(dashboard)/profile/utils";
import axios from "axios";
import { close_r, notification_b } from "../public";
import Image from "next/image";
import { socket } from "@/app/(dashboard)/profile/[userId]/page";
import { useSocket } from "@/app/socket";
import Challenge from "./GameNofication";
import { useRouter } from "next/navigation";


type props = {
  userId: string;
  userSession: string;
};

interface notification  {
  id : string,
  message : string,
  userImg : string
}

function Notification({ userId, userSession }: props) {
  /* ------------------------------ toggle_notif ------------------------------ */
  const [toggle_notif, setToggle_notif] = useState<boolean>(false);
  const gameSocket = useSocket();
  /* ------------------------------------ - ----------------------------------- */

  /* ------------------------------ notification ------------------------------ */
  const [notification, setNotification] = useState<string>("");

  const router = useRouter();

  /* ------------------------------------ - ----------------------------------- */

  /* ----------------------- get pending friend request ----------------------- */
  const [friendShip, setFriendShip] = useState<friendShip[]>([]);
  const [GameNotificat, setGameNoticat] = useState<notification[]>([]);
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

  const getGameInvitation = () => {
    if (userId) {
        fetch(`http://localhost:3000/game/invitations/${userId}`)
        .then(data => data.json())
        .then (res => {setGameNoticat(res); console.log(res)})
    }
  }

  useEffect (() => {
      getGameInvitation();
  }, [])
  /* ------------------------------------ - ----------------------------------- */

  /* ------------------------------- getPending ------------------------------- */
  const pendingUsers = usePendingUsers(friendShip, userSession);
  /* ------------------------------------ - ----------------------------------- */

  /* -------------------------- friend requset socket ------------------------- */
  useEffect(() => {

    gameSocket.on("gameInvitation", () => getGameInvitation(), );

    gameSocket.on('AcceptedGame', data => {
      console.log(data);
      const { gameId } = data;
      router.push(`/game/${gameId}`)
    });

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
      // setNotification(data.userId + data.stats + data.friendId);
      console.log("notifMessage ===> ", data)
    });

    socket.on("gameInvitation", (data) => {
      console.log(data);
    })

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
        {((pendingUsers && pendingUsers.length > 0) || (GameNotificat && GameNotificat.length > 0)) && (
          <div className="absolute w-[12px] h-[12px] top-1 md:right-1 right-4 bg-red-400 rounded-full"></div>
        )}
      </div>
      {((pendingUsers && pendingUsers.length > 0) || (GameNotificat && GameNotificat.length > 0)) && toggle_notif && (
        <ul className="w-[80%] md:w-[500px] flex flex-col gap-[40px] gradients absolute px-[3rem] py-[2rem] top-[15vh] md:top-[60px] right-0 z-10 shadow-lg">
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
          {
            GameNotificat.map((not, index) => <Challenge key={index} notification={not} userId={userId}/>)
          }
        </ul>
      )}
    </>
  );
}

export default Notification;
