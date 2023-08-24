"use client"

import Image from "next/image";

import { useState, useEffect } from "react";

import ChannelAdminListSm from "./components/channelMembersList/ChannelAdminListSm";
import ChannelMembersListSm from "./components/channelMembersList/ChannelMembersListSm";
import LeaveChannel from "./components/other/LeaveChannel";

import { useDispatch, useSelector } from 'react-redux';
import { ShowChannelMembers, HideChannelMembers } from '@/app/store/reducer'
import { RootState } from '@/app/store/store';
import ActionsPopUp from './components/other/ActionsPopUp'
import Cookies from 'universal-cookie';
import axios from "axios";
import ChannelOwnerListMd from "./components/channelMembersList/ChannelOwnerListMd";
import ChannelAdminListMd from "./components/channelMembersList/ChannelAdminListMd";
import ChannelMembersListMd from "./components/channelMembersList/ChannelMembersListMd";
import { socket } from "../page";
import { redirect, useRouter } from 'next/navigation'

interface channel {
    id: string
    channelName: string,
    channelType: string,
    channelPassword: string,
    channelOwnerId: string,
    _count: any
}

interface channelInfo {
    id: string,
    userId: string,
    channelId: string,
    role: string,
    bannedTime: string,
    unbanneTime: string,
    mutedTime: string,
    unmuteTime: string,
    created_at: string
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

const cookies = new Cookies();
const userIdFromCookie = cookies.get('id');


function ChannelMembersListPage({ channelId }: { channelId: string }) {
    const router = useRouter()

    //^ ---------------- fetch channel info -------------------------
    const [channelData, setChannelData] = useState<channel>();
    const [channelOwnerUser, setChannelOwnerUser] = useState("");
    const [channelType, setChannelType] = useState<string>("");
    const [channelOwnerId, setChannelOwnerId] = useState<string>("");
    const [channelInfo, setChannelInfo] = useState<channelInfo>();


    useEffect(() => {
        async function fetchPrivateChannel() {
            try {
                const response = await axios.get<channel>(`${process.env.NEXT_PUBLIC_APP_URI}:3000/channel/${channelId}`);
                
                response && setChannelData(response.data);
                response && setChannelType(response.data.channelType);
                response && setChannelOwnerId(response.data.channelOwnerId);

            } catch (error) {
                alert(error);
            }
        }
        fetchPrivateChannel();

        async function fetchChannelInfo() {
            try {
                const response = await axios.get<channelInfo>(`${process.env.NEXT_PUBLIC_APP_URI}:3000/channel/${channelId}/member/${userIdFromCookie}`);
                response && setChannelInfo(response.data);
            } catch (error) {
                alert(error);
            }
        }
        fetchChannelInfo();
    }, []);
    //^ ----------------------------------------------------------------

    const [showLeaveBtn, setShowLeaveBtn] = useState(true);
    useEffect(() => {
        (channelData?.channelOwnerId === userIdFromCookie) && setShowLeaveBtn(false)
    }, [channelData])

    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        (((userIdFromCookie === channelInfo?.userId) && (channelInfo?.role === "OWNER")) || ((userIdFromCookie !== channelInfo?.userId) && (channelInfo?.role === "ADMIN" || channelInfo?.role === "OWNER"))) ? setIsOwner(true) : setIsOwner(false);
    }, [channelInfo])




    //& ------------------ leave channel -----------------------------
    const handleLeaveChannel = ({ channelId, userIdFromCookie }: { channelId: string, userIdFromCookie: string }) => {
        socket.emit("leaveChannel", {
            channelId: channelId,
            userId: userIdFromCookie
        });

    }
    useEffect(() => {
        socket.on("leavedSuccessfully", () => {
            router.push(`/channels/`)
        })
    }, [socket])
    //& --------------------------------------------------------------

    //& ---------------- copy private channel Id ---------------------
    const [isCopied, setIsCopied] = useState(false);
    const [channelIdState, setChannelIdState] = useState(channelId);
    
    const handleCopyClick = () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(channelIdState).then(() => {
            setIsCopied(true);
            setTimeout(() => {
              setIsCopied(false);
            }, 2000);
          }).catch((error) => {
            console.error("Failed to copy text: ", error);
          });
        } else {
          // Fallback for browsers that don't support navigator.clipboard
          const textArea = document.createElement("textarea");
          textArea.value = channelIdState;
          document.body.appendChild(textArea);
          textArea.select();
    
          try {
            const successful = document.execCommand('copy');
            if (successful) {
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 2000);
            } else {
              console.error("Copying text using document.execCommand('copy') failed.");
            }
          } catch (error) {
            console.error("Failed to copy text using document.execCommand: ", error);
          }
    
          document.body.removeChild(textArea);
        }
      };
    //$ --------------------------------------------------------------


    return (
        <div className="w-[25%] md:w-[20%] h-screen bg-primary ">
            <div className="w-full h-[10vh] flex items-center justify-center text-white">
                {<Image src={"/logoutIcon.svg"} width={40} height={40} alt={"leave"} className={`${`${(channelType !== "PRIVATE" || isOwner) ? "hidden" : ""}`}`}  onClick={() => { handleLeaveChannel({ channelId, userIdFromCookie }) }} />}
            </div>
            <div className="w-full h-[80vh] ">

                <ChannelOwnerListMd
                    channelId={channelId}

                />


                <ChannelAdminListMd
                    channelId={channelId}
                />
                <div className="w-[80%] h-px bg-stone-300 ml-[10%]" />


                <ChannelMembersListMd
                    channelId={channelId}
                />
                <div className="w-[80%] h-px bg-stone-300 ml-[10%]" />


            </div>
            <div className="w-full h-[10vh] flex items-center justify-center text-white">
                {
                    (channelType === "PRIVATE")
                        ?
                        <Image src={`${` ${!isCopied ? "/copyIcon.svg" : "/copied.svg"}`}`} width={40} height={40} alt={"copyLink"} className="" onClick={handleCopyClick}/>
                        :
                        <Image src={"/logoutIcon.svg"} width={40} height={40} alt={"leave"} className={`${`${!isOwner ? "" : "hidden"}`}`} onClick={() => {handleLeaveChannel({ channelId, userIdFromCookie }) }} />
                }
            </div>


        </div>

    )
}
export default ChannelMembersListPage;