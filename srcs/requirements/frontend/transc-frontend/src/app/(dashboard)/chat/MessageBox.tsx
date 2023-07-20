"use client"
import Image from "next/image";
import { OnlineFriends } from "../../../../constant"
import { conversation } from "./TempData/conversation"
import { useState, useEffect } from 'react';
import axios from "axios";
interface User {
    id: string
    name: string
    email: string
    IntraId: string
    Avatar: string
    status: string
    created_at: string
    updated_at: string
}
// import { format } from 'date-fns';

function MessageBox({ userId, messageContent, date, time }:
    {
        // userId: number,
        userId: string,

        messageContent: string,
        date: string,
        time: string,
       
    }
) {

    const [user, setUser] = useState<User[]>([]);
    const [userName, setUserName] = useState<User>();
    const [isMounted, setIsMounted] = useState(false)
    const link = `http://localhost:3000/users/${userId}`
    // console.log("Ids : " ,userId);
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
    },[link]);
    
isMounted && console.log("user name = ", userName?.name, "userId = ", userName?.id )

    let bg_color = "";
    let position = "";
    if (userName?.name === "user2") {
        bg_color = "bg-receive"
        position = "items-start md:ml-[25px]"
    }
    else {
        bg_color = "bg-send";
        position = "items-end md:mr-[25px]";
    }


    // const { dateO } = date;
    const utcDateString = date
    const dateToConv = new Date(utcDateString);
    const localDateString = dateToConv.toLocaleDateString();
    const localTimeString = dateToConv.toLocaleTimeString();

    return (

        <div className={`flex flex-col ${position} mb-[28px] pr-[13px]`}>
            <div className='relative  w-[280px]  min-h-[30px] md:w-[300px] lg:w-[340px] '>
                <Image src={`${userName?.Avatar}`} width={40} height={40} alt="avatar" className="absolute  w-[40px] h-[40px] rounded-full md:w-[43] md:h-[43]" />


                <div className='w-full h-[24px]  flex pl-[46px]'>
                    <div className='h-full w-[80px] text-[10px]  text-primary flex items-center font-poppins font-bold truncate md:text-[11px] md:w-[90px]'>
                        {userName?.name}
                    </div>
                    <div className='flex items-center text-[8px] font-poppins font-normal tracking-wider ml-[5px] text-date md:text-[9px]'>
                        <div className=' mr-[3px] lg:ml-[5px]'>
                            {/* {date} */}
                            {localDateString}
                        </div>
                        <div>
                            {/* {time} */}
                            {localTimeString}
                        </div>
                    </div>
                </div>
                <div className={`${bg_color} ml-[20px] py-[16px] px-[27px]  rounded-md `}>
                    <p className=' font-poppins text-[10px] text-primary-500 font-medium leading-4 tracking-[0.1px] md:text-[11px]  md:font-medium'>
                        {messageContent}
                    </p>
                </div>
            </div>
        </div>
    )
}
export default MessageBox;