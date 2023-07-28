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
    onClick: (buttonId: string) => void;
    inputRef: any
}

function ContactSm({ id, name, unreadMessages, profilePicturePath, onClick, inputRef }: Props) {

    //* States
    const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.currentUserId);

    const dispatch = useDispatch();


    //^ ---------------- select contact + getting other user Id and emitting join room --------------------------------
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
        <div className="w-[90%]  h-[56px]  pl-[42px] mt-[10px] ml-[27px] flex items-center justify-between " onClick={handleClick}>
            <div className="h-full w-[183px] flex items-center  ">
                <Image src={`${profilePicturePath}`} width={41} height={41} alt="avatar" className="w-[41px] h-[41px] rounded-full" />
                <div className="h-full max-w-[121px] pl-[25px] flex items-center text-white text-xs font-poppins font-semibold truncate ">
                    {name}
                </div>
            </div>
            <div className="w-[20px] h-[20px] bg-red-500 rounded-full mr-[11.5%] flex items-center justify-center">
                <span className="text-white text-xs font-poppins font-semibold">
                    {unreadMessages}
                </span>
            </div>
        </div>
    );
}
export default ContactSm;