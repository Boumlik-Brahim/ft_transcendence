import React from "react";
import { users_int } from "../interfaces";
import { socket } from "./Notification";
import { close_r } from "../public";
import Image from "next/image";

interface Props {
    key : number,
    notification : {
        id : string,
        message : string
    }
    user: users_int
}

function challenge({key, notification, user} : Props) {
  return (
    <li key={key} className="flex justify-between items-center">
      <div className="relative flex items-center gap-[10px] w-[100px]">
        <Image
          src={user.Avatar}
          width={50}
          height={50}
          alt="avatar"
          className="rounded-full max-w-[50px] max-h-[50px] w-[40px] h-[40px] object-cover"
        />
        <p className="text-primary font-semibold">{notification.message}</p>
      </div>

      <div className="friend_message flex gap-[10px] items-center">
        <button
          className="bg-blue-500 font-medium text-sm text-white py-[5px] px-[10px] rounded-2xl hover:opacity-60"
          onClick={async () => {
            socket.emit("AcceptChallenge", {

            });
          }}
        >
          challenge
        </button>

        <Image
          src={close_r}
          width={30}
          alt="decline"
          className="cursor-pointer hover:opacity-60"
          onClick={async () => {

            socket.emit("DeclineChallenge", {

            });
          }}
        />
      </div>
    </li>
  );
}

export default challenge;
