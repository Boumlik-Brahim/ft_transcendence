"use client"

import Image from "next/image"
import { socket } from "../../../page";
import { redirect, useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';

interface leaveChannelProps {
    channelId: string,
    userId: string,
    isOwner: boolean,
   
}

interface Owner {
    id: string
    name: string
    email: string
    IntraId: string
    Avatar: string
    status: string
    created_at: string
    updated_at: string
}

interface channel {
    id: string
    channelName: string,
    channelType: string,
    channelPassword: string,
    channelOwnerId: string,
    _count: any
}


function LeaveChannel({ channelId, userId, isOwner }: leaveChannelProps) {

    const router = useRouter()
    const [isPrivateChannel, setIsPrivateChannel] = useState(false);

      //^ ---------------- fetch channel info -------------------------
  const [channelInfo, setChannelInfo] = useState<channel>();
  const [channelType, setChannelType] = useState<string>("");

  useEffect(() => {
    async function fetchPrivateChannel() {
      try {
        const response = await axios.get<channel>(`http://localhost:3000/channel/${channelId}`);
        response && setChannelInfo(response.data);
        response && setChannelType(response.data.channelType);

      } catch (error) {
        alert(error);
      }
    }
    fetchPrivateChannel();
  }, []);
//^----------------------------------------------------------------------------------
    const handleLeaveChannel = ({ channelId, userId }: {channelId :string, userId:string}) => {
        socket.emit("leaveChannel", {
            channelId: channelId,
            userId: userId
        });

    }
    useEffect(() => {
        socket.on("leavedSuccessfully", () => {
            console.log("!! --- You leaved the channel --- !!")
            router.push(`/channels/`)
        })
    }, [socket])



    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = () => {
        navigator.clipboard.writeText(channelId).then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000); // Reset the "Copied" state after 2 seconds
        }).catch((error) => {
            console.error("Failed to copy text: ", error);
        });
    };



    return (
        <div className="w-full h-[15%] flex flex-col justify-evenly ">
            <div className={`${isOwner ? "w-[80%] flex items-center justify-center self-center" : "hidden"}`} onClick={() => { handleLeaveChannel({ channelId, userId }) }}>
                <button className="w-[70%] h-[35px] lg:h-[55px] bg-white rounded-full flex items-center ">
                    <div className="pl-[16px] mr-[27%]  flex items-center">
                        <Image src={"/vector-1.svg"} width={14} height={8} alt={"leave"} className="absolute" />
                        <Image src={"/vector.svg"} width={14} height={21} alt={"leave"} className="relative left-[50%]" />

                    </div>
                    <div className="text-leave text-[17px] font-poppins font-medium uppercase">
                        Leave
                    </div>
                </button>
            </div>


           {(channelType === "PRIVATE") &&  <div className=" w-[80%] flex items-center justify-center  self-center " >
                <button className="w-[71%] h-[35px] lg:h-[55px] bg-white rounded-full flex items-center pl-[16px]">
                    <div className="w-[10%] h-full flex items-center ">
                        <Image src={"/shareLink.svg"} width={22} height={22} alt={"leave"} className="" />
                    </div>
                    <div className="w-[75%] h-full flex items-center justify-center  text-date text-[7px] font-poppins font-normal uppercase  ">
                        {!isCopied ? channelId : "Channel Id copied !"}
                    </div>
                    <div className=" w-[10%] h-full flex items-center justify-end ">
                        <Image src={"/copy.svg"} width={22} height={22} alt={"leave"} className="" onClick={handleCopyClick} />
                    </div>
                </button>
            </div>}
        </div>
    )
}
export default LeaveChannel;
