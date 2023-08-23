"use client"
import Image from "next/image";
import MessageInputChannelBox from "./MessageInputChannelBox";
import RoomMessageBox from "./RoomMessageBox";
import ChannelMembersListPage from "./ChannelMembersListPage";

import { useSelector } from 'react-redux';
import { ShowChannelMembers, HideChannelMembers, setCurrentUser } from '@/app/store/reducer';
import { RootState } from '@/app/store/store';
import Sidebar from '@/../components/Sidebar'
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Socket, io } from "socket.io-client";
import Cookies from 'universal-cookie';
import { socket } from '../page'
import { useMediaQuery } from "react-responsive";
import ChannelMembersListPageMd from "./ChannelMembersListPageMd";

import { redirect, useRouter } from 'next/navigation'
import ChannelMembersListPageLg from "./ChannelMembersListPageLg";

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


interface channel {
  id: string
  channelName: string,
  channelType: string,
  channelPassword: string,
  channelOwnerId: string,
  _count: any
}

function Page({ params }: any) {


  const router = useRouter()

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


  //^ ---------------------------  fetching Messages from backend ----------------------------

  const [messages, setMessages] = useState<Message[]>([]);

  //* useEffect for fetching data of a Room
  useEffect(() => {

    async function fetchMessages() {
      try {
        const response = await axios.get<Message[]>(`${process.env.NEXT_PUBLIC_APP_URI}:3000/channel/${params.channel}/channelMessage`);
        setMessages(response.data);

      } catch (error) {
        // console.error(error);
      }
    }
    fetchMessages();
  }, [params.channel]);
  //^ ---------------------------  scroll to the last message --------------------------------------

  const autoScrollRef = useRef<HTMLDivElement>(null);

  //* useEffect for scrolling to the last msg
  useEffect(() => {
    autoScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  //^ ---------------------------------------------------------------------------------------

  //& ------- mapping for the chat conversation and make each chat in it's component ----- 
  const conversations = messages.map((item, i) => {
    return (
      <div key={i} ref={autoScrollRef} >
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

  const [refresh, setRefresh] = useState(false);

  //* useEffect for getting message from socket
  useEffect(() => {
    socket.on("onMessage", (data) => {
      setMessages((prev) => [...prev, { content: data.content, userId: data.userId, channelId: data.userId, created_at: new Date().toISOString(), }])
    });

  }, [socket]);
  //^ -----------------------------------------------------------------------------------------------

  const isShowChannelMembersOn = useSelector((state: RootState) => state.toggleShowChannelMembers);




  //^ ---------------- fetch channel info -------------------------
  const [channelInfo, setChannelInfo] = useState<channel>();
  const [channelName, setChannelName] = useState<string>("");
  const [channelType, setChannelType] = useState<string>("");

  useEffect(() => {
    async function fetchPrivateChannel() {
      try {
        const response = await axios.get<channel>(`${process.env.NEXT_PUBLIC_APP_URI}:3000/channel/${params.channel}`);
        response && setChannelInfo(response.data);
        response && setChannelName(response.data.channelName);
        response && setChannelType(response.data.channelType);

      } catch (error) {
        alert(error);
      }
    }
    fetchPrivateChannel();
  }, []);

  const [newChannelName, setNewChannelName] = useState<string>("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    value && setNewChannelName(value);
  }

  const [isFocused, setIsFocused] = useState(false);
  const [changeChannelName, setChangeChannelName] = useState(false);



  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeChannelName = () => {
    setChangeChannelName(true);

  }

  const handleConfirmChannelName = () => {
    socket.emit("editChannelName", {
      channelId: params.channel,
      userId: userIdFromCookie,
      updatedChannelName: newChannelName
    });

    socket.on('error', data => {
      alert(data);
    });

    socket.on("newChannelName", data => {
      setChannelName(data)
    })
    setChangeChannelName(false);
    setNewChannelName('');
  }

  const [editChannelPermission, setEditChannelPermission] = useState(false);
  const cookies = new Cookies();
  const userIdFromCookie = cookies.get('id');

  useEffect(() => {
    userIdFromCookie === channelInfo?.channelOwnerId ? setEditChannelPermission(true) : setEditChannelPermission(false);
  }, [channelInfo])

  //^ -------------------------------------------------------------


  //^ ------------------------------- check Member Status -----------------------------
  const [channelMemberStatus, setChannelMemberStatus] = useState("")
  const [isMuted, setIsMuted] = useState(false);

    socket.on("refrechMember", () => {
        setRefresh(!refresh);
        console.log("-------------------------- should hide input -------------------------------");
    })
    
    useEffect(() => {
        async function fetchMemberStatus() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URI}:3000/channel/${params.channel}/memberStatus/${userIdFromCookie}`);
                console.log(response);
                response && setChannelMemberStatus(response.data);
                response && console.log("=========/ ",response.data,"/========= ");

              response && ((response.data.role === "MUTED_MEMBER" ) ? setIsMuted(true) : setIsMuted(false))
            } catch (error) {
                alert(error);
            }
        }
        fetchMemberStatus();
        
    }, [refresh]);


  //^  ----------------------------------------------------------------------------------------------------------


  useEffect(() => {
    socket.on("redirectAfterGetKicked", () => {
        console.log("!! --- You have been kicked from this channel --- !!")
        router.push(`/channels/`)
    })
}, [socket])

  return (
    <>
      <Sidebar />

      <div className="w-full h-[85vh] md:h-screen flex  flex-col ">

        <div className={`${!isShowChannelMembersOn.showChannelMembersToggled ? "w-full h-full " : "hidden"}`}>
          {/*---------------------- header-------------------- */}
          {
            (isMdScreenState || isLgScreenState) &&

            <div className="w-full h-[10%] bg-gray-50 flex items-center justify-between ">
              <div className=" w-[50%] flex items-center">
                <div className=" pl-[57px] tracking-wider font-poppins font-semibold ">
                  {
                    !changeChannelName && <div className="  text-primary text-[23px]  pr-[10px]">
                      {channelName}
                    </div>
                  }
                  {
                    (changeChannelName && editChannelPermission) &&
                    <>
                      <input type="text" placeholder="Edit Channel Name"
                        className={`${`h-[30px] bg-transparent text-center border-none w-full text-primary  text-[11px] font-poppins focus:outline-none without-ring placeholder-transparent ${isFocused ? "placeholder-transparent" : "placeholder:text-center placeholder:font-normal placeholder:text-primary placeholder:text-[11px]"}`}`}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={newChannelName}
                        onChange={handleInputChange}
                      />
                      <div className="mb-[16px] w-[95%] border-b border-primary ml-[3px]"></div>
                    </>
                  }
                </div>

                {editChannelPermission && <Image src={"/editChannelName.svg"} alt="editChannelName" width={20} height={20} className=" mr-[3px] cursor-pointer"
                  onClick={handleChangeChannelName}
                />}
                {changeChannelName && <Image src={"/confirmbtn.svg"} alt="confirm" width={18} height={18} className=" mr-[3px] ml-[5px] cursor-pointer "
                  onClick={handleConfirmChannelName}
                />}

              </div>
              <div className=" flex items-center">
                <Image src={"/notification_b.svg"} alt="notification" width={24} height={24} className="mr-[73px]"
                />
              </div>
            </div>}
          {/*------------------------------------------------ */}

          <div className="w-full h-[85%] md:h-[80%] py-[10px] overflow-auto pt-[30px] no-scrollbar ">


            {conversations.length == 0
              ?
              <div className="w-full h-full font-poppins font-semibold text-2xl text-gray-500 flex items-center justify-center tracking-wider">
                Empty Conversation . . .
              </div>
              :
              conversations
            }

          </div>
         {  <MessageInputChannelBox
            channelId={params.channel}
            channelMemberStatus = {channelMemberStatus}
          />}
        </div>

        <ChannelMembersListPage
          channelId={params.channel}
          channelType = {channelType}
        />
      </div>
      {
        (isMdScreenState && !isLgScreenState) &&
        <ChannelMembersListPageMd
          channelId={params.channel}
        />
      }
       {
        ( isLgScreenState ) &&
        <ChannelMembersListPageLg
          channelId={params.channel}
          channelType = {channelType}
        />
      }

    </>
  )
}
export default Page;
