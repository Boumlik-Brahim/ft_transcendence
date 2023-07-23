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
import Cookies from 'universal-cookie';


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


interface MessageData {
  content: string;
  senderId: string;
  recieverId: string;
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
  // const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.currentUserId);


  
  const refreshStatus = useSelector((state: RootState) => state.refreshFetchMessagesSlice.refreshFetchMessages);
  
  const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.currentUserId);
  
  //get userID from cookies 
  const dispatch = useDispatch();
  useEffect(() => {
   const cookies = new Cookies();
   const userIdFromCookie = cookies.get('id');
  //  setCurrentUser(userIdFromCookie);
  dispatch(setCurrentUser(userIdFromCookie));
}, [dispatch]);
  
  
  
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
  
//  console.log("the current userId state  : ",currentUserId);
  const socket = useRef<Socket>();
  const [arrivalMessage, setArrivalMessage] = useState<MessageData>();

  useEffect(() => {
    socket.current = io("ws://localhost:3000");
    socket.current.on("getMessage", (data) => {
      // setArrivalMessage({
      //   senderId: data.senderId,
      //   content: data.text,
      //   recieverId : otherUserId,
      // });
      console.log("THE DATA SENDED FROM SOCKET : ", data);
    });
    

  },[]);

  // useEffect(() => {
  //   console.log(" ---- here ---  : ",arrivalMessage)  
  // }, [arrivalMessage]);


  useEffect(() => {
    socket.current?.emit("addUser", currentUserId);
    console.log("test");
    socket.current?.on("getUsers", (users) => {
        console.log(users);
    });
   
  }, [currentUserId]);
  
const clickMe = () =>{
  socket.current?.emit("sendMessage", {
    senderId: "df",
    recieverId: "ds",
    text: "sfygdf",
    
  }
  );
  console.log("i'm here ")
}


  const isContactListHidden = useSelector((state: RootState) => state.toggleShowContactList);


  return (
    <div className="w-full h-[85vh] md:h-screen flex">
      <div className={`${!isContactListHidden.showContactListToggled ? "w-full h-full " : "hidden"} `}>

        {isMdScreenState && <Header
          ContactName={"Channel"}
        />}


        <div className="w-full h-[85%] bg-sender pl-[20px]  pr-[15px] py-[15px] overflow-auto no-scrollbar  md:h-[80%]">
          {conversations}
          <button onClick={clickMe}> click me </button>
        </div>
        <MessageInputBox 
            inputRef={socket}/>
      </div>
      <ContactListSm />

      {isLgScreenState && <ContactListLg />}

      {(isMdScreenState && !isLgScreenState) && <ContactListMd />}

    </div>
  );
}
export default Page;

function dispatch() {
  throw new Error("Function not implemented.");
}
