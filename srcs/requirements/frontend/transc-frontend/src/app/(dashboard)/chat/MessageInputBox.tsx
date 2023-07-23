"use client"
import Image from "next/image";

import { useDispatch, useSelector } from 'react-redux';
import { show, hide, setRefreshOn } from '../../store/reducer';

import { RootState } from '../../store/store';

import { useState } from 'react';
import axios from "axios";

import { setCurrentUser, setOtherUser } from '@/app/store/reducer';
import { Socket } from "socket.io-client";


interface MessageData {
    content: string;
    senderId: string;
    recieverId: string;
}

interface Props {
    inputRef: any ;
  }

function MessageInputBox({ inputRef }: Props) {
    const isContactListHidden = useSelector((state: RootState) => state.toggleShowContactList);
    const dispatch = useDispatch();
    const handleShowContactList = () => {
        dispatch(show());
        // console.log(isContactListHidden.showContactListToggled)

    }

  

    const [messageContent, setMessageContent] = useState('');
    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessageContent(event.target.value);
    };

    const handleSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();

        inputRef.current.emit("sendMessage", {
            senderId: currentUserId,
            recieverId: otherUserId,
            text: message.content,
            
          }
          );

          console.log("i'm inside the sendMessage")
        try {
            if (!message.content) {
                return;
            }
            const response = await axios.post('http://localhost:3000/chat', message);
            dispatch(setRefreshOn());
            // Clear the message input field after sending
            setMessage({ ...message, content: '' });
        } catch (error) {
            console.error(error);
        }
    };

    const otherUserId = useSelector((state: RootState) => state.EditUserIdsSlice.otherUserId);
    const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.currentUserId);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage({
            ...message,
            [event.target.name]: event.target.value, senderId: otherUserId, recieverId: currentUserId
        });
    };


    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit(event);
        }
    };



    const [message, setMessage] = useState<MessageData>({
        content: '',
        senderId: '',
        recieverId: '',
    });

    return (
        <div className="w-full h-[15%] bg-channel-600 flex items-center justify-between md:h-[10%] ">

            <div className='
                    pr-[8px]  h-full w-[80%] flex items-center pl-[23px] 
                    md:pl-[30px] md:w-[90%] 
            '>
                <input
                    placeholder="Type your message"
                    className={`
                                h-[40px] lg:h-[38px] w-full rounded-full text-primary font-poppins font-semibold text-[11px] pl-3.5  
                                focus:outline-none  focus:border-primary focus:ring-2 focus:ring-primary
                                placeholder:font-semibold placeholder:text-gray-500 placeholder:text-[11px] 
                                md:h-[45px] md:text-[14px]  md:placeholder:text-[13px]
                    `} name="content"
                    value={message.content}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown} />
            </div>
            <div className='
                            h-full flex items-center justify-start w-[20%] pl-[5px]
                            md:pl-[10px] md:w-[10%] 
            '>

                <Image src={"./send_b.svg"} alt="send message" width={24} height={24} className="text-primary text-[17px]    cursor-pointer 
                            md:text-[23px]" onClick={(e) => {handleSubmit}} />
                <Image src={"./contacts_b.svg"} alt="send message" width={24} height={24} className=" text-primary text-[20px] ml-2.5 cursor-pointer 
                            md:hidden" onClick={handleShowContactList} />
            </div>
        </div>

    )
}
export default MessageInputBox;