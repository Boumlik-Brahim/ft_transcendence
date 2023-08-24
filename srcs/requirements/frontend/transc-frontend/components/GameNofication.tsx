import React from "react";
import { users_int } from "../interfaces";
import { close_r } from "../public";
import Image from "next/image";
import { useSocket } from "@/app/socket";

interface Props {
    userId : string,
    notification : {
        id : string,
        message : string,
        userImg : string
    }
}

function Challenge({notification, userId} : Props) {
    const socket = useSocket();
    return (
        <div className="flex justify-between items-center">
            <div className="relative flex items-center gap-[10px] w-[300px] ">
                <img
                    src={notification.userImg}
                    width={50}
                    height={50}
                    alt="avatar"
                    className="rounded-full max-w-[50px] max-h-[50px] w-[40px] h-[40px] object-cover"
                />
                <p className="text-primary font-semibold text-xs">{notification.message}</p>
            </div>

            <div className="friend_message flex gap-[10px] items-center">
                <button
                className="bg-blue-500 font-medium text-sm text-white py-[5px] px-[10px] rounded-2xl hover:opacity-60"
                onClick={async () => {
                    socket.emit("acceptInvitation", { invitationId : notification.id , userId});
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
                    socket.emit("rejectInvitation", { invitationId : notification.id , userId});
                }}
                />
            </div>
        </div>
    );
}

export default Challenge;