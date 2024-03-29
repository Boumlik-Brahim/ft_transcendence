"use client"
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux';
import { ShowChannelMembers, HideChannelMembers } from '../../../store/reducer';

import { RootState } from '../../../store/store';
import { useState } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import { io } from "socket.io-client";
import {socket} from '../page'



interface MessageData {
    content: string
    userId: string
    channelId: string
}


function MessageInputChannelBox({channelId, channelMemberStatus} : {channelId: string, channelMemberStatus: string}) {
    const dispatch = useDispatch();

    const isChannelMembersHidden = useSelector((state: RootState) => state.toggleShowChannelMembers);
    const cookies = new Cookies();

    const currentUserId = cookies.get('id');
    const handleShowChannelMembers = () => {
        dispatch(ShowChannelMembers());
    }

    const [message, setMessage] = useState<MessageData>({
        content: '',
        userId: currentUserId,
        channelId: '',
    });
   

        //* function that sets the message typed in the input
        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setMessage({
                ...message,
                [event.target.name]: event.target.value, userId: currentUserId, channelId: channelId
            });
        };

    //* function that submits and sends the message typed in the input
    const handleSubmit = async () => {
        if (!message.content)
            return;
        // & sending the message in the socket 
        socket.emit("messageChannel", {
            content: message.content,
            userId:  message.userId,
            channelId: message.channelId,
        }
        );

        socket.on("error", (data:any) => {
            console.log(data)
            alert(data);
        })     
      
        // & clearing the input field after sending the message
        setMessage({ ...message, content: '' });
    };

    //* function that watch if enter clicked to send th message
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className={`${`w-full  h-[15%] md:h-[10%] bg-gray-50 flex items-center justify-between `}`}>
            <div className='
                    pr-[8px]  h-full w-[80%] flex items-center pl-[23px] 
                    md:pl-[30px] md:w-[90%] 
            '>
                <input
                    placeholder={`${`${(channelMemberStatus === "MUTED_MEMBER" || channelMemberStatus === "MUTED_ADMIN" || channelMemberStatus === "BANNED_MEMBER" || channelMemberStatus === "BANNED_ADMIN") ? "You Cannot Send Message . . ." : "Type your message"}`}`}
                    className={`
                                h-[40px] lg:h-[38px] w-full rounded-full text-primary font-poppins font-normal text-[11px] pl-3.5  
                                focus:outline-none  focus:border-primary focus:ring-2 focus:ring-primary
                                placeholder:font-normal placeholder:text-gray-500 placeholder:text-[11px] 
                                md:h-[45px] md:text-[14px]  md:placeholder:text-[13px]
                                ${(channelMemberStatus === "MUTED_MEMBER" || channelMemberStatus === "MUTED_ADMIN" || channelMemberStatus === "BANNED_MEMBER" || channelMemberStatus === "BANNED_ADMIN" ) ? "cursor-pointer pointer-events-none opacity-50" : ""}
                    `} 
                    name="content"
                    value={message.content}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}    
                    />
            </div>
            <div className='
                            h-full flex items-center justify-start w-[20%] pl-[5px]
                            md:pl-[10px] md:w-[10%] 
            '>

                <Image src={"/send_b.svg"} alt="send message" width={24} height={24} className="text-primary text-[17px]    cursor-pointer 
                            md:text-[23px]" onClick={handleSubmit} />
                <Image src={"/contacts_b.svg"} alt="send message" width={24} height={24} className=" text-primary text-[20px] ml-2.5 cursor-pointer 
                            md:hidden"  onClick={handleShowChannelMembers} />
            </div>
        </div>
    );
}
export default MessageInputChannelBox;