"use client"
import Image from "next/image";
import MessageInputChannelBox from "./MessageInputChannelBox";
import RoomMessageBox from "./RoomMessageBox";
import ChannelMembersListPage from "./ChannelMembersListPage";

import { useSelector } from 'react-redux';
import { ShowChannelMembers, HideChannelMembers } from '@/app/store/reducer';
import { RootState } from '@/app/store/store';
import Sidebar from '@/../components/Sidebar'
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Socket, io } from "socket.io-client";
import Cookies from 'universal-cookie';
import {socket} from '../page'


interface Message {
  id?: string,
  content: string,
  userId: string,
  channelId: string,
  created_at: string;
}

interface MessageData {
  content: string
  userId: string
  channelId: string
}


function Page({ params }: any) {

  //^ ---------------------------  fetching Messages from backend ----------------------------

  const [messages, setMessages] = useState<Message[]>([]);

  //* useEffect for fetching data of a Room
  useEffect(() => {

    async function fetchMessages() {
      try {
        const response = await axios.get<Message[]>(`http://localhost:3000/channel/${params.channel}/channelMessage`);
        setMessages(response.data);

      } catch (error) {
        console.error(error);
      }
    }
    fetchMessages();
  }, [params.channel]);


  //& ------- mapping for the chat conversation and make each chat in it's component ----- 
  const conversations = messages.map((item, i) => {
    return (
      <div key={i} >
        {
          item.content &&
          <RoomMessageBox
            userId={item.userId}
            messageContent={item.content}
            date={item.created_at}
          />
        }
      </div>
    )
  });

  //^ ----------------------------------------------------------------------------------------------


  //^ ----------------------------------------------- Socket Io -------------------------------------
  // const socket = useRef<Socket>();

  // const socket = useRef<Socket>();
  const [refresh, setRefresh] = useState(false);
  //* useEffect for creating socket
  // useEffect(() => {
  //   const cookies = new Cookies();
  //   socket.current = io("ws://localhost:3000", { auth: { userId: cookies.get('id') } });
  // }, [])

  // socket.current?.on("refrechMsg", (data) => {
  //   setRefresh(!refresh)
  //   console.log("i'm herre !!!! ")
  // });

    //* useEffect for getting message from socket
    useEffect(() => {
      socket.on("onMessage", (data) => {
        setMessages((prev) => [...prev, { content: data.content, userId: data.userId, channelId: data.userId, created_at: new Date().toISOString(), }])
        console.log(data)
      });
    
    }, [ socket]);
  //^ -----------------------------------------------------------------------------------------------

  const isShowChannelMembersOn = useSelector((state: RootState) => state.toggleShowChannelMembers);
  return (
    <>
      <Sidebar />
      <div className="w-full h-[85vh] md:h-screen flex ">
        <div className={`${!isShowChannelMembersOn.showChannelMembersToggled ? "w-full h-full" : "hidden"}`}>
          <div className="w-full h-[85%] py-[10px] overflow-auto">

            {/* <RoomMessageBox
                            userId={1}
                            userName="Bilal Ben Aouad"
                            profilePic="bben-aou.jpeg"
                            date="08/06/2023 09:19"
                            messageContent="Hello everyone !"
                        />

                        <RoomMessageBox
                            userId={1}
                            userName="brahim alami"
                            profilePic="profile1.jpeg"
                            date="08/06/2023 09:19"
                            messageContent="first message in room *_*"
                        /> */}

            {conversations.length == 0
              ?
              <div className="w-full h-full font-poppins font-semibold text-2xl text-gray-500 flex items-center justify-center tracking-wider">
                Empty Conversation . . .
              </div>
              :
              conversations
            }

          </div>
          <MessageInputChannelBox
            channelId={params.channel}
            
          />
        </div>

        <ChannelMembersListPage />
      </div>
    </>
  )
}
export default Page;
