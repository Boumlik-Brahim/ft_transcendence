"use client"
import Image from "next/image";
import MessageInputBox from './MessageInputBox'
import MessageBox from "./MessageBox";
import ContactListSm from "./components/ContactList/ContactListSm";
import ContactListMd from "./components/ContactList/ContactListMd";
import ContactListLg from "./components/ContactList/ContactListLg";

import Header from "./components/others/Header";
import { useMediaQuery } from 'react-responsive';

import { useDispatch, useSelector } from 'react-redux';
import { show, hide } from '@/app/store/reducer';
import { RootState } from '@/app/store/store';
import { useEffect, useState, useRef, useReducer } from "react";

import axios from "axios";
import Cookies from 'universal-cookie';


import { setCurrentUser, setOtherUser, setRefreshOn, setRoomId } from '@/app/store/reducer';
import { useRouter } from 'next/router'
import Sidebar from '@/../components/Sidebar'
import {socketChat} from '../../../../../components/FriendAction'
import { socket } from "../../../../../components/Notification";
interface Message {
  id?: string;
  content: string;
  created_at: string;
  senderId: string;
  recieverId: string;
  room: string;
}

interface MessageData {
  content: string;
  senderId: string;
  recieverId: string;
}


function Page({ params }: any) {



  const isContactListHidden = useSelector((state: RootState) => state.toggleShowContactList);

  const roomIdFromParam = useSelector((state: RootState) => state.roomIdSlice.roomId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRoomId(params.conversation))
  }, [dispatch, params.conversation])


  //^ ---------------------------  screen sizes states ----------------------------
  const isMdScreen = useMediaQuery({ minWidth: 768 });
  const isLgScreen = useMediaQuery({ minWidth: 1200 });

  const [isMdScreenState, setIsMdScreen] = useState(false);
  const [isLgScreenState, setIsLgScreen] = useState(false);


  //* useEffect for screen sizes state
  useEffect(() => {
    setIsMdScreen(isMdScreen);
    setIsLgScreen(isLgScreen);
  }, [isMdScreen, isLgScreen]);
  //^ -------------------------------------------------------------------------------


  //* useEffect to hide contact List in Lg mad Md screen
  useEffect(() => {
    (isMdScreenState || isLgScreenState) && dispatch(hide());
  }, [dispatch, isLgScreenState, isMdScreenState])


  //^ ---------------------------  get user Id  part ----------------------------

  const otherUserId = useSelector((state: RootState) => state.EditUserIdsSlice.otherUserId);
  const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.currentUserId);
  //* useEffect for extracting my id from the cookie
  useEffect(() => {
    const cookies = new Cookies();
    const userIdFromCookie = cookies.get('id');
    dispatch(setCurrentUser(userIdFromCookie));
  }, [dispatch]);
  //^ -----------------------------------------------------------------------------



  //^ ---------------------------  fetching Messages from backend ----------------------------

  const [messages, setMessages] = useState<Message[]>([]);
  //* useEffect for fetching data of a Room
  useEffect(() => {


    async function fetchMessages() {
      try {
        const response = await axios.get<Message[]>(`http://localhost:3000/chat?hashedRoomId=${roomIdFromParam}`);
        setMessages(response.data);


      } catch (error) {
        console.error(error);
      }
    }
    fetchMessages();

  }, [roomIdFromParam, params.conversation]);


  //^ ----------------------------------------------------------------------------------------------

  //^ ---------------------------  scroll to the last message --------------------------------------

  const autoScrollRef = useRef<HTMLDivElement>(null);

  //* useEffect for scrolling to the last msg
  useEffect(() => {
    autoScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  //^ ---------------------------------------------------------------------------------------

  //& ------- mapping for the chat conversation and make each chat in it's component ----- 
  const conversations = messages.map((item, i) => {
     async function seen() {
        try {
          const cookies = new Cookies();
          const userIdFromCookie = cookies.get('id');
          const res = await axios.put(`http://localhost:3000/chat/${userIdFromCookie}/${item.senderId}`, { "seen": true });

        } catch (err) {
            console.log(err);
        }
      }
      seen();
    return (
      <div key={i} ref={autoScrollRef} >
        {
          item.content &&
          <MessageBox
            userId={item.senderId}
            messageContent={item.content}
            date={item.created_at}
          />
        }
      </div>
    )
  });

  //^ -----------------------------------  Socket IO Part --------------------------------------

  //* useEffect for getting message from socket
  useEffect(() => {
    socketChat.on("getMessage", (data) => {
      setMessages((prev) => [...prev, { senderId: data.senderId, content: data.text, recieverId: data.receiverId, created_at: new Date().toISOString(), room: data.room }])

    });
  }, [socketChat]);

  //* useEffect for getting channel Id from socket
  useEffect(() => {
    socketChat.on("joined", (data) => {
      dispatch(setRoomId(data.roomName))
    });
  }, [dispatch]);
  
  useEffect(() => {
    socketChat.on("refresh", () => {
      dispatch(setRefreshOn());
    });
  }, [dispatch]);
  
  //^ -----------------------------------------------------------------------------------------



  return (
<>
    <Sidebar/>
    <div className="w-full h-[85vh] md:h-screen  flex">
      <div className={`${!isContactListHidden.showContactListToggled ? "w-full h-full " : "hidden"} `}>

        {isMdScreenState && <Header
          ContactName={"Direct Chat"}
        />}


        <div className="w-full h-[85%] bg-sender pl-[20px]  pr-[15px] py-[15px] overflow-auto no-scrollbar  md:h-[80%] ">
          {conversations}
        </div>
        <MessageInputBox/>
      </div>
      {<ContactListSm
        
      />
      }
      {(isMdScreenState && !isLgScreenState) && <ContactListMd
       
      />}
      {isLgScreenState && <ContactListLg
        
      />}



    </div>
    </>
  );
}
export default Page;
