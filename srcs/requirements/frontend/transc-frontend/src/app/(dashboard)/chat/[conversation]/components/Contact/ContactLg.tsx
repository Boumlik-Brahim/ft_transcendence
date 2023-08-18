"use client"

import Image from "next/image";

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, setOtherUser, selectedOne, setRefreshOn, setRoomId } from '@/app/store/reducer';
import { RootState } from '@/app/store/store';
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { io } from "socket.io-client";
import {socketChat} from '../../../../../../../components/FriendAction'

//* Interface of Props 
interface Props {
    id: string;
    name: string;
    profilePicturePath: string;
    unreadMessages: number;
    activeButtonId: string | null;
    onClick: (buttonId: string) => void;

}

function ContactLg({ id, name, unreadMessages, profilePicturePath, activeButtonId, onClick }: Props) {

    //* States
    const isActive = activeButtonId === id;
    const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.currentUserId);
    const otherUserId = useSelector((state: RootState) => state.EditUserIdsSlice.otherUserId);
    const selectedOneBtn = useSelector((state: RootState) => state.selectContactConversationSlice.selectedBtn);
    const isA = selectedOneBtn === id

    const dispatch = useDispatch();

    //^ ---------------- styling the selected contact + getting other user Id and emitting join room --------------------------------
    const handleClick = async () => {
        //* updating number of unseen messages
        
        //* for styling the selected
        
        onClick(id);
        //* for getting the other user's ID
        dispatch(setOtherUser(id));
        dispatch(selectedOne(id));
        dispatch(setRefreshOn()); // 
        try {
            const res =  await axios.put(`${process.env.NEXT_PUBLIC_APP_URI}/chat/${currentUserId}/${id}`, { "seen": true });

        } catch (err) {
            console.log(err);
        }
        //* creating new room 
         socketChat.emit("joinRoom", {
            senderId: currentUserId,
            recieverId: id
        });
        socketChat.on("joined", (data: any) => {
            // dispatch(setRefreshOn()); // 
            dispatch(setRoomId(data.roomName))
        });
    };
    



    const roomIdFromParam = useSelector((state: RootState) => state.roomIdSlice.roomId);

    return (
        <div className={`${"w-full h-[56px]  flex items-center justify-between  mb-[10px] cursor-pointer"} ${(isActive || isA) ? "bg-white   rounded-r-full" : "bg-transparent"}`} onClick={handleClick}>
            <div className="w-[80%] h-full pl-[28px] flex items-center">
                <Image src={`${profilePicturePath}`} alt="profile" width={41} height={41} className="rounded-full w-[41px] h-[41px] bg-center	bg-cover" />

                <div className="w-[130px] h-full  ml-[15px] flex items-center truncate">
                    <span className={`${" text-[15px] font-poppins font-medium"}  ${(isActive || isA) ? "text-primary" : "text-white"}`}>
                        <Link href={`/chat/${roomIdFromParam}`}>
                            {name}
                        </Link>
                    </span>
                </div>
            </div>
            <div className="w-[20%] h-full flex items-center justify-center">
                {
                    (unreadMessages != 0 && !isA) &&
                    <div className="w-[23px] h-[23px] bg-red-500 rounded-full flex justify-center items-center  text-white text-xs font-medium">
                        {unreadMessages}
                    </div>

                }
            </div>
        </div>
    );
}
export default ContactLg;