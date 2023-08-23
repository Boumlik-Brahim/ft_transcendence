import axios from "axios";
import Image from "next/image"
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import ActionsPopUp from "../other/ActionsPopUp";
import { socket } from "../../../page";
import ActionsPopUpOwner from "../other/ActionsPopUpOwner";


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




const cookies = new Cookies();
const userIdFromCookie = cookies.get('id');

function MemberBoxInfo({ userId ,channelId, userName, profilePic }: {userId:string ,channelId: string, userName: string, profilePic: string }) {
    const [showActionsBtn, setShowActionsBtn] = useState(false);
    const [channelInfo, setChannelInfo] = useState<channelInfo>();
    const [isOwner , setIsOwner] = useState(false);
    const [channelMemberStatus, setChannelMemberStatus] = useState("")
    const [refresh, setRefresh] = useState(false);


    socket.on("refrechMember", () => {
        setRefresh(!refresh);
    })
    
    useEffect(() => {
        async function fetchChannelInfo() {
            try {
                const response = await axios.get<channelInfo>(`http://localhost:3000/channel/${channelId}/member/${userIdFromCookie}`);
                response && setChannelInfo(response.data);
                (userIdFromCookie ===response.data.userId && response.data.role === "OWNER") ? setIsOwner(true) : setIsOwner(false);
            } catch (error) {
                alert(error);
            }
        }
        fetchChannelInfo();

        async function fetchMemberStatus() {
            try {
                const response = await axios.get(`http://localhost:3000/channel/${channelId}/memberStatus/${userId}`);
                console.log(response);
                response && setChannelMemberStatus(response.data);
            } catch (error) {
                alert(error);
            }
        }
        fetchMemberStatus();
        
    }, [refresh]);


    useEffect(() => {
        (userIdFromCookie === channelInfo?.userId && (channelInfo?.role === "ADMIN" || channelInfo?.role === "OWNER")) ? setShowActionsBtn(true) : setShowActionsBtn(false);
    }, [channelInfo])




    const [show , setShow] = useState(false);
    const [clicks, setClicks] = useState<number>(0);
    const   actionsBtnHandler = () => {
        setClicks(clicks + 1)
        if (clicks % 2 == 0) {
            setShow(true);
        }
        else 
        setShow(false)
            
    }

    return (
        <>
            <div className="w-full h-[32%] flex ">
                <div className="w-[80%] h-full flex items-center px-[20px]">
                    <Image src={`${profilePic ? profilePic : "/chatAvatars/profile1.jpeg"}`} alt="channel member avatar" width={41} height={41} className="rounded-full" />
                    <div className="w-[130px] h-full flex items-center ml-[16px] text-white text-[15px] font-poppins font-medium truncate">
                        {userName}
                    </div>
                </div>
                <div className="w-[20%] h-full  flex items-center pl-[3px]">
                    <div className={`${showActionsBtn ? "" : "hidden"}`}>
                        <Image src={"/morecircle.svg"} alt="delete_channel" width={16} height={16} className="mr-[10px] cursor-pointer" onClick={actionsBtnHandler}/>
                    </div>
                    <Image src={"/microphoneslash.svg"} alt="delete_channel" width={16} height={16} className={`${(channelMemberStatus === "MUTED_MEMBER" || channelMemberStatus === "MUTED_ADMIN") ? "mr-[10px]" : "hidden"}`} />
                    <Image src={"/ban.svg"} alt="delete_channel" width={15} height={15} className={`${(channelMemberStatus === "BANNED_MEMBER" || channelMemberStatus === "BANNED_ADMIN") ? "mr-[10px]" : "hidden"}`} />
                </div>
            </div>
            {show && 
             
                <ActionsPopUp
                    userId = {userId}
                    channelId = {channelId}
                    show = {show}
                    isOwner = {isOwner}
                    setShow = {setShow}
                    clicks = {clicks}
                    setClicks={setClicks}
                    isMember={true}
                    memberMd = {false}
                />
               
            }
           
        </>
    )
}

export default MemberBoxInfo;