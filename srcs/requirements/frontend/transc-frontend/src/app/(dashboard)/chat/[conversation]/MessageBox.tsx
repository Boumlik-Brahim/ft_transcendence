"use client"
import Image from "next/image";
// import { OnlineFriends } from "../../../../constant"
// import { conversation } from "./TempData/conversation"
import { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Link from "next/link";
import { socketChat } from "../../../../../components/FriendAction";

import {  setRefreshOn } from '@/app/store/reducer';



//* User Interface
interface User {
    id: string
    name: string
    email: string
    intraId: string
    Avatar: string
    status: string
    created_at: string
    updated_at: string
}

//* Props Interface
interface Props {
    userId: string,
    messageContent: string,
    date: string,
}

function MessageBox({ userId, messageContent, date }: Props) {

    //*  States
    const [user, setUser] = useState<User[]>([]);
    const [userName, setUserName] = useState<User>();
    const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.currentUserId);
    const otherUserId = useSelector((state: RootState) => state.EditUserIdsSlice.otherUserId);

    const [isMounted, setIsMounted] = useState(false)

    //^ ----------------------- fetch User (receiver) data ----------------------


    const link = `${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userId}`
    //* useEffect to fetch User data 
    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get<User>(link);
                setUserName(response.data);
                setIsMounted(true);

            } catch (error) {
                console.error(error);
            }
        }
        fetchUser();
    }, [link]);


    //^ ----------------------- fetch current User data ----------------------
    const currentUser = `${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${currentUserId}`
    const [CurrentUserName, setUserCurrentUserName] = useState<User>();
    //* useEffect to fetch current User Data 
    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get<User>(currentUser);
                setUserCurrentUserName(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser();
    }, [currentUser])
    


    //^ --------------------- checking if the user sender or receiver --------------------

    let bg_color = "";
    let position = "";
    if (userName?.name === CurrentUserName?.name) {
        bg_color = "bg-receive"
        position = "items-start md:ml-[25px]"
    }
    else {
        bg_color = "bg-send";
        position = "items-end md:mr-[25px]";
    }

    //^ ----------------------- converting date format  ----------------------

    const utcDateString = date
    const dateToConv = new Date(utcDateString);
    const localDateString = dateToConv.toLocaleDateString();
    const localTimeString = dateToConv.toLocaleTimeString();

    return (
        <div className={`flex flex-col ${position} mb-[28px] pr-[13px]`} >
            <div className='relative  w-[280px]  min-h-[30px] md:w-[300px] lg:w-[360px] '>
                <Link href={`/profile/${userId}`}>
                
                <img src={`${userName ? userName?.Avatar : "https://cdn.pixabay.com/photo/2017/07/03/09/54/dog-2467149_1280.jpg"}`} alt="avatar" className="absolute  w-[40px] h-[40px] object-fill  rounded-full md:w-[43] md:h-[43]" />
                </Link>

                <div className='w-full h-[24px]  flex pl-[46px]'>
                    <div className='h-full w-[80px] text-[10px]  text-primary flex items-center font-poppins font-bold truncate md:text-[11px] md:w-[90px]'>
                        {userName?.name}
                    </div>
                    <div className='flex items-center text-[8px] font-poppins font-normal tracking-wider ml-[5px] text-date md:text-[9px]'>
                        <div className=' mr-[3px] lg:ml-[5px]'>
                            {localDateString}
                        </div>
                        <div>
                            {localTimeString}
                        </div>
                    </div>
                </div>
                <div className={`${bg_color}  ml-[20px] py-[16px] px-[27px]  rounded-md  `}>
                    <p className='font-poppins text-[10px] text-primary-500 font-medium leading-4 tracking-[0.1px] md:text-[11px]  md:font-medium '>
                        { messageContent}
                    </p>
                </div>
            </div>
        </div>
    )
}
export default MessageBox;