"use client"

import Image from "next/image";

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, setOtherUser } from '@/app/store/reducer';
import { RootState } from '@/app/store/store';
import { useEffect } from "react";

//* Interface of Props 
interface Props {
    id: string;
    name: string;
    profilePicturePath: string;
    unreadMessages: number;
    activeButtonId: string | null;
    onClick: (buttonId: string) => void;
    inputRef: any

}

function ContactLg({ id, name, unreadMessages, profilePicturePath, activeButtonId, onClick, inputRef }: Props) {

    //* States
    const isActive = activeButtonId === id;
    const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.currentUserId);

    const dispatch = useDispatch();

    //^ ---------------- styling the selected contact + getting other user Id and emitting join room --------------------------------
    const handleClick = () => {
        //* for styling the selected
        onClick(id);
        //* for getting the other user's ID
        dispatch(setOtherUser(id));
        //* creating new room 
        inputRef.current.emit("joinRoom", {
            senderId: currentUserId,
            recieverId: id
        });
    };

    return (
        <div className={`${"w-full h-[56px]  flex items-center justify-between  mb-[10px] cursor-pointer"} ${isActive ? "bg-white   rounded-r-full" : "bg-transparent"}`} onClick={handleClick}>
            <div className="w-[80%] h-full pl-[28px] flex items-center">
                <Image src={`${profilePicturePath}`} alt="profile" width={41} height={41} className="rounded-full w-[41px] h-[41px] bg-center	bg-cover" />
                <div className="w-[130px] h-full  ml-[15px] flex items-center truncate">
                    <span className={`${" text-[15px] font-poppins font-medium"}  ${isActive ? "text-primary" : "text-white"}`}>
                        {name}
                    </span>
                </div>
            </div>
            <div className="w-[20%] h-full flex items-center justify-center">
                <div className="w-[23px] h-[23px] bg-red-500 rounded-full flex justify-center items-center  text-white text-xs font-medium">
                    {unreadMessages}
                </div>
            </div>
        </div>
    );
}
export default ContactLg;