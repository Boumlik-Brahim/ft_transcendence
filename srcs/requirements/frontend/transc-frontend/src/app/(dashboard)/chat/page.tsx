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
import { useEffect, useState, useRef, useReducer } from "react";

import axios from "axios";

import {io, Socket} from 'socket.io-client'

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

  const otherUserId = useSelector((state: RootState) => state.EditUserIdsSlice.otherUserId);
  const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.currentUserId);
  const refreshStatus = useSelector((state: RootState) => state.refreshFetchMessagesSlice.refreshFetchMessages);




  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get<Message[]>(`http://localhost:3000/chat?senderId=${otherUserId}&receiverId=${currentUserId}`);
        setMessages(response.data);

      } catch (error) {
        console.error(error);
      }
    }
    fetchMessages();
  }, [currentUserId, otherUserId,refreshStatus]);


  const autoScrollRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    autoScrollRef.current?.scrollIntoView({behavior : "smooth"});
  },[messages])
  
  const conversations = messages.map(item => {
    return (
      <div key={item.id} ref={autoScrollRef} >

        <MessageBox
          key={item.id}
          userId={item.senderId}
          messageContent={item.content}
          date={item.created_at}
        />
      </div>

    )
  });




  // ---------------- socket.io----------------------
  
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
      setSocket(io("ws://localhost:3000"))
  },[])


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