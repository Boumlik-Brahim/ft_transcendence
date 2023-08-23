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

function MemberBoxInfoMd({ userId, channelId, userName, profilePic }: { userId: string, channelId: string, userName: string, profilePic: string }) {
    const [showActionsBtn, setShowActionsBtn] = useState(false);
    const [channelInfo, setChannelInfo] = useState<channelInfo>();
    const [isOwner, setIsOwner] = useState(false);
    const [channelMemberStatus, setChannelMemberStatus] = useState("")
    const [refresh, setRefresh] = useState(false);


    socket.on("refrechMember", () => {
        setRefresh(!refresh);
    })

    useEffect(() => {
        async function fetchChannelInfo() {
            try {
                const response = await axios.get<channelInfo>(`${process.env.NEXT_PUBLIC_APP_URI}:3000/channel/${channelId}/member/${userIdFromCookie}`);
                response && setChannelInfo(response.data);
                (userIdFromCookie === response.data.userId && response.data.role === "OWNER") ? setIsOwner(true) : setIsOwner(false);
            } catch (error) {
                alert(error);
            }
        }
        fetchChannelInfo();

        async function fetchMemberStatus() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URI}:3000/channel/${channelId}/memberStatus/${userId}`);
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




    const [show, setShow] = useState(false);
    const [clicks, setClicks] = useState<number>(0);
    const actionsBtnHandler = () => {
        setClicks(clicks + 1)
        if (clicks % 2 == 0) {
            setShow(true);
        }
        else
            setShow(false)

    }

    return (
        <>  
         <div className="w-full h-[20%] ">
                <div className="w-full h-full  flex">
                    <div className={`${`h-full  ${showActionsBtn ? "w-[70%] justify-end"  :" w-full justify-center" }  flex items-center justify-end  relative`}`}>
                            <Image src={`${profilePic ? profilePic : "/chatAvatars/profile1.jpeg"}`} alt="admin avatar" width={50} height={50} className="rounded-full " />
                        <div className="absolute bottom-[15%] w-[70%] flex items-center justify-end  ">
                            <div  className={`${(channelMemberStatus === "BANNED_MEMBER" || channelMemberStatus === "BANNED_ADMIN" || channelMemberStatus === "MUTED_MEMBER" || channelMemberStatus === "MUTED_ADMIN" ) ? "w-[11px] h-[11px] bg-white rounded-full flex items-center justify-center relative" : "hidden"}`}> 
                                <Image src={"/micMd.svg"} alt="actions" width={6} height={6} className={`${(channelMemberStatus === "MUTED_MEMBER" || channelMemberStatus === "MUTED_ADMIN") ? "absolute" : "hidden"}`}/>
                                <Image src={"/banMd.svg"} alt="actions" width={6} height={6} className={`${(channelMemberStatus === "BANNED_MEMBER" || channelMemberStatus === "BANNED_ADMIN") ? "absolute" : "absolute"}`}/>
                            </div>
                        </div>
                    </div>
                    {
                        showActionsBtn
                        &&
                        <div className="h-full w-[30%] flex items-center  pl-[7px] ">
                            <Image src={"/morecircle.svg"} alt="actions" width={15} height={16} onClick={actionsBtnHandler} />
                        </div>
                    }
                </div>

            </div>
            
            {
                show && 
                <ActionsPopUp
                userId={userId}
                channelId={channelId}
                show={show}
                isOwner={isOwner}
                setShow={setShow}
                clicks={clicks}
                setClicks={setClicks}
                isMember={true}
                memberMd = {true}
                />
                // <div className="w-[146px] h-[120px] bg-white absolute  top-[23%] right-[5%] rounded-xl z-10 drop-shadow-md">test</div>
            
            
            
            }

        </>
    )
}

export default MemberBoxInfoMd;