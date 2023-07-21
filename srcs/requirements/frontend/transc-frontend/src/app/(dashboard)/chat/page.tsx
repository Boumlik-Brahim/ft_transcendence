"use client"
import Image from "next/image";
import MessageInputBox from './MessageInputBox'
import { conversation } from "./TempData/conversation"
import MessageBox from "./MessageBox";
import ContactListSm from "./components/ContactList/ContactListSm";
import ContactListMd from "./components/ContactList/ContactListMd";
import ContactListLg from "./components/ContactList/ContactListLg";

import Header from "./components/others/Header";
import { useMediaQuery } from 'react-responsive';

import { useDispatch, useSelector } from 'react-redux';
import { show, hide } from '../../store/reducer';
import { RootState } from '../../store/store';
import { useEffect, useState } from "react";

import axios from "axios";



import { setCurrentUser, setOtherUser } from '@/app/store/reducer';





interface Message {
  id: string;
  content: string;
  created_at: string;
  senderId: string;
  recieverId: string;
}

interface Pic {
  id: string
  name: string
  email: string
  IntraId: string
  Avatar: string
  status: string
  created_at: string
  updated_at: string
}


function Page() {
  const isMdScreen = useMediaQuery({ minWidth: 768 });
  const isLgScreen = useMediaQuery({ minWidth: 1200 });

  const [isMdScreenState, setIsMdScreen] = useState(false);
  const [isLgScreenState, setIsLgScreen] = useState(false);
  useEffect(() => {
    setIsMdScreen(isMdScreen);
    setIsLgScreen(isLgScreen);
  }, [isMdScreen, isLgScreen]);



  const [path, setPath] = useState("");

  const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.otherUserId);


 console.log(currentUserId)


  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get<Message[]>(`http://localhost:3000/chat?senderId=${currentUserId}&receiverId=5e56a41b-3354-4529-940c-c2a3e4f54bff`);
  
        setMessages(response.data);

      } catch (error) {
        console.error(error);
      }
    }
    fetchMessages();
  }, [currentUserId]);

  const conversations = messages.map(item => {
    return (
      <MessageBox
        key={item.id}
        userId={item.senderId}
        messageContent={item.content}
        date={item.created_at}
      />

    )
  });


  const isContactListHidden = useSelector((state: RootState) => state.toggleShowContactList);


  return (
    <div className="w-full h-[85vh] md:h-screen flex">
      <div className={`${!isContactListHidden.showContactListToggled ? "w-full h-full " : "hidden"} `}>

        {isMdScreenState && <Header
          ContactName={"Channel"}
        />}


        <div className="w-full h-[85%] bg-sender pl-[20px]  pr-[15px] py-[15px] overflow-auto no-scrollbar  md:h-[80%]">
          {conversations}
        </div>
        <MessageInputBox />
      </div>
      <ContactListSm />

      {isLgScreenState && <ContactListLg />}

      {(isMdScreenState && !isLgScreenState) && <ContactListMd />}

    </div>
  );
}
export default Page;