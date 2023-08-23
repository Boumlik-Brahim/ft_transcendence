"use client"

import Image from "next/image";

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, setOtherUser, selectedOne, setRefreshOn, setRoomId } from '@/app/store/reducer';
import { RootState } from '@/app/store/store';
import { useEffect } from "react";
import axios from "axios";
import {socketChat} from '../../../../../../../components/FriendAction'

//* Interface of Props 
interface Props {
    id: string;
    profilePicturePath: string;
    unreadMessages: number;
    activeButtonId: string | null;
    onClick: (buttonId: string) => void;
}

function ContactMd({ id, unreadMessages, profilePicturePath, activeButtonId, onClick }: Props) {

    //* States
    const isActive = activeButtonId === id;
    const otherUserId = useSelector((state: RootState) => state.EditUserIdsSlice.otherUserId);
    const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.currentUserId);
    const selectedOneBtn = useSelector((state: RootState) => state.selectContactConversationSlice.selectedBtn);
    const isA = selectedOneBtn === id

    const dispatch = useDispatch();

    //^ ---------------- styling the selected contact + getting other user Id and emitting join room --------------------------------
    const handleClick = async () => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_APP_URI}:3000/chat/${currentUserId}/${otherUserId}`, { "seen": true });

        } catch (err) {
            console.log(err);
        }

        //* for styling the selected
        onClick(id);
        //* for getting the other user's ID
        dispatch(setOtherUser(id));
        dispatch(selectedOne(id));
        dispatch(setRefreshOn()); // 
        //* creating new room 
        socketChat.emit("joinRoom", {
            senderId: currentUserId,
            recieverId: id
        });
        //* updating number of unseen messages
        socketChat.on("joined", (data: any) => {
            dispatch(setRoomId(data.roomName))
            dispatch(setRefreshOn()); // 
        });
    };

    return (
        <div className={`${"w-full h-[93px]  flex items-center justify-center cursor-pointer"} ${(isActive || isA) ? "bg-white rounded-r-full" : "bg-transparent"} `} onClick={handleClick}>
            <div className="w-[65px] h-[65px] relative">
                <Image src={`${profilePicturePath}`} alt="profile" width={65} height={65} className="rounded-full w-[65px] h-[65px]" />
                {
                    (unreadMessages != 0 && !isA) &&
                    <div className=" absolute top-1 right-0 w-[17px] h-[17px] bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-poppins font-semibold">
                        {unreadMessages}
                    </div>
                }
            </div>
        </div>

    );
}
export default ContactMd;