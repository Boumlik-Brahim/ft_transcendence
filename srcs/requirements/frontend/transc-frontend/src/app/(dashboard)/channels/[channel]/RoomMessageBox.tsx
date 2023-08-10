"use client"
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";


interface Props {
    userId: string,
    date: string,
    messageContent: string,
}

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

function RoomMessageBox({ userId,  date, messageContent }: Props) {
    
    
     //^ ----------------------- converting date format  ----------------------

     const utcDateString = date
     const dateToConv = new Date(utcDateString);
     const localDateString = dateToConv.toLocaleDateString();
     const localTimeString = dateToConv.toLocaleTimeString();
    //^  -----------------------------------------------------------------------

     //^ ----------------------- fetch current User data ----------------------
     const currentUser = `http://localhost:3000/users/${userId}`
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
    
    
    return (
        <div className="w-[90%] min-h-[50px]  mx-[5%] flex mb-[17px] ">
            <div className="w-[15%] h-full flex justify-center">
                <Image src={`${ CurrentUserName ? CurrentUserName?.Avatar :"https://cdn.pixabay.com/photo/2017/07/03/09/54/dog-2467149_1280.jpg" }`} height={41} width={41} alt="profile" className="rounded-full " />
            </div>
            <div className="w-[83%] min-h-[10px]  ml-[8px] ">
                <div className="w-[184px] h-[15px] flex mb-[4px]">
                    <div className="  max-w-[90px] h-full flex items-center  text-primary text-[10px] font-poppins font-bold truncate">
                         {CurrentUserName?.name}
                    </div>
                    <div className=" pl-[2px] w-[84px] h-full text-date text-[8px] font-poppins font-light flex items-center ">
                        <div className=' '>
                            {localDateString}
                        </div>
                        <div className=' pl-[2px]'>
                            {localTimeString}
                        </div>
                    </div>
                </div>
                <div className="w-full min-h-[20px] ">
                    <p className="w-full h-full text-neutral-700 text-[8px] font-poppins font-medium  tracking-[0.2px]">
                        {messageContent}
                    </p>
                </div>
            </div>
        </div>
    );
}
export default RoomMessageBox;
