
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { socket } from '../../../page';
import Cookies from 'universal-cookie';
import axios from 'axios';



interface popUpProps {
    userId: string;
    channelId: string;
    isOwner: boolean;
    isMember: boolean;
    show: boolean;
    clicks: number;
    memberMd : boolean;
    memberLg : boolean;
    setClicks: React.Dispatch<React.SetStateAction<number>>
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const cookies = new Cookies();
const userIdFromCookie = cookies.get('id');

function ActionsPopUp({ userId, channelId, isOwner, isMember, show, clicks, memberMd, memberLg ,setClicks, setShow }: popUpProps) {


    const [refresh, setRefresh] = useState(false);

   
    socket.on("refrechMember", () => {
        setRefresh(!refresh);
    })
  

    // ^ ---------------------------- states for clicks --------------------------------------
    const [channelMemberStatus, setChannelMemberStatus] = useState("")
    const [kickBtnToggled, setKickBtnToggled] = useState(false);
    const [muteBtnToggled, setMuteBtnToggled] = useState(false);
    const [banBtnToggled, setBanBtnToggled] = useState(false);
    const [adminBtnToggled, setAdminBtnToggled] = useState(false);
    // ^ -------------------------------------------------------------------------------------

    const [durationSeconds, setDurationSeconds] = useState<number>(0);
    const [durationSecondsMute, setDurationSecondsMute] = useState<number>(0);

    const [totalDuration, setTotalDuration] = useState<number>(60);

    function updateDurationSeconds(newDurationSeconds: number) {
        setDurationSeconds(newDurationSeconds);
    }

    function formatDurationString(durationSeconds: number): string {
        if (durationSeconds >= 3600) {
            // Display duration in hours and minutes
            const hours = Math.floor(durationSeconds / 3600);
            const minutes = Math.floor((durationSeconds - hours * 3600) / 60);
            return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')} min`;
        } else {
            // Display duration in minutes
            const minutes = Math.floor(durationSeconds / 60);
            return `${minutes.toString().padStart(1, '0')} min`;
        }
    }

    function handleAddButtonClick() {
        updateDurationSeconds(durationSeconds + 60);
    }

    function handleSubtractButtonClick() {
        updateDurationSeconds(Math.max(durationSeconds - 60, 0));
    }

    useEffect(() => {
        setTotalDuration(Math.ceil(durationSeconds / 60));
    }, [durationSeconds]);

    function updateMuteDurationSeconds(newDurationSeconds: number) {
        setDurationSecondsMute(newDurationSeconds);
    }
    function handleSubtractMuteButtonClick() {
        updateMuteDurationSeconds(Math.max(durationSecondsMute - 60, 0));
    }

    function handleAddMuteButtonClick() {
        updateMuteDurationSeconds(durationSecondsMute + 60);
    }
    

    useEffect(() => {

        async function fetchMemberStatus() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URI}:3000/channel/${channelId}/memberStatus/${userId}`);
                
                response && setChannelMemberStatus(response.data);
            } catch (error) {
                alert(error);
            }
        }
        fetchMemberStatus();

    }, [refresh])

    useEffect(()=>{
        if(channelMemberStatus === "MUTED_MEMBER" || channelMemberStatus === "MUTED_ADMIN")
            setMuteBtnToggled(true);
        else if(channelMemberStatus === "BANNED_MEMBER" || channelMemberStatus === "BANNED_ADMIN")
            setBanBtnToggled(true)
    },[channelMemberStatus, refresh])


    const handleKickMember = () => {

        setKickBtnToggled(true);
        socket.emit("kickMember", {
            channelId: channelId,
            userId: userId,
        })

        setClicks(clicks + 1)
        setShow(false);
    }

    useEffect(() => {
        
        socket.on("memberKickedSuccessfully", () => {
        })
    }, [socket])



    const handleSetAdmin = () => {
        setAdminBtnToggled(true);
        if (isMember){
            socket.emit("createAdmin", {
                channelId: channelId, 
                userId: userId,
            })
        }
        else{
            socket.emit("createMember", {
                channelId: channelId, 
                userId: userId,
            })
        }

    }



    const handleMute = () => {
        setMuteBtnToggled(!muteBtnToggled);

        const currentTime: Date = new Date();
        const timeInMilliseconds: number = durationSecondsMute * 1000;
        const date: Date = new Date(timeInMilliseconds);
        const minutes: number = date.getMinutes();
        const futureTime = new Date(currentTime.getTime() + minutes* 60000); 
        const formattedTime = futureTime.toISOString();
        socket.emit("muteMember", {
            channelId: channelId,
            userId: userId,
            mutedTime:formattedTime
        });

        
    }



    const handleBan = () => {
        setBanBtnToggled(!banBtnToggled);

        const currentTime: Date = new Date();
        const timeInMilliseconds: number = durationSeconds * 1000;
        const date: Date = new Date(timeInMilliseconds);
        const minutes: number = date.getMinutes();
        const futureTime = new Date(currentTime.getTime() + minutes* 60000); 
        const formattedTime = futureTime.toISOString();

        socket.emit("banMember", {
            channelId: channelId,
            userId: userId,
            bannedTime: formattedTime
        });
    }


    const [muteActive , setMuteActive] = useState(false);

    useEffect(()=>{
       if (muteBtnToggled )
            setMuteActive(true);
    },[muteBtnToggled, refresh])

    const [banActive , setBanActive] = useState(false);

    useEffect(()=>{
       if ( banBtnToggled)
            setBanActive(true);
    },[banBtnToggled, refresh])

    return (
        <>
            <div className={`${`w-[146px] h-[120px] bg-white absolute  top-[5%] left-[29%] rounded-xl ${memberLg ? "lg:top-0 lg:left-[20%]" : "lg:top-0 lg:left-[20%]" } ${memberMd ? " md:top-[58%] md:left-[78%] " : "md:top-[23%] md:left-[78%] "} md:z-10 md:drop-shadow-md`}`}>
                <div className="w-full h-full flex   ">

                    <div className="w-[41px] h-full  flex flex-col items-center justify-center mt-[5px] ">

                        <div className="w-full h-[20px] mb-[10px] border-r-[1px] border-channel-700 flex items-center justify-center cursor-pointer">
                            {
                                !muteBtnToggled
                                    ?
                                    <Image src={"/unmute.svg"} alt="delete_channel" width={20} height={20} className={`${`${(muteActive || banActive) ? "cursor-pointer pointer-events-none opacity-50" : ""}`}`} onClick={handleMute} />
                                    :
                                    <Image src={"/mute_b.svg"} alt="delete_channel" width={20} height={20} className={`${`${(muteActive || banActive) ? "cursor-pointer pointer-events-none opacity-50" : ""}`}`}  />

                            }
                        </div>
                        <div className="w-full h-[20px] mb-[10px] border-r-[1px] border-channel-700 flex items-center justify-center cursor-pointer ">
                            {
                                !banBtnToggled
                                    ?
                                    <Image src={"/ban1.svg"} alt="ban" width={20} height={20} className={`${`${(muteActive || banActive) ? "cursor-pointer pointer-events-none opacity-50" : ""}`}`} onClick={handleBan} />
                                    :
                                    <Image src={"/unBan.svg"} alt="ban" width={20} height={20} className={`${`${(muteActive || banActive) ? "cursor-pointer pointer-events-none opacity-50" : ""}`}`}  />
                            }
                        </div>
                        <div className={`${`w-full h-[20px] mb-[10px] border-r-[1px] border-channel-700 flex items-center justify-center ${muteActive || banActive ? "cursor-pointer pointer-events-none opacity-50" : ""} `}`} onClick={handleKickMember}>
                            <Image src={"/kick.svg"} alt="kick" width={20} height={20} className=" " />
                        </div>

                        {
                            (isOwner) &&
                            <div className="w-full h-[20px] mb-[10px] border-r-[1px] border-channel-700 flex items-center justify-center cursor-pointer " >
                                {

                                    (isMember)
                                        ?
                                        <Image src={"/setAdmin.svg"} alt="setAdmin" width={20} height={20} className=" " onClick={handleSetAdmin} />
                                        :
                                        <Image src={"/setMember.svg"} alt="setMember" width={20} height={20} className=" " onClick={handleSetAdmin} />
                                }

                            </div>
                        }

                    </div>
                    <div className="w-[105px] h-full flex flex-col items-center justify-center   mt-[5px] ">
                        <div className="w-full h-[20px] mb-[10px] flex items-center px-[4px]">
                            <div className={`${`h-full w-[17px]  text-primary text-[7px] flex items-center  font-poppins font-medium ${banActive ? "cursor-pointer pointer-events-none opacity-50" : ""} `}`}>
                                {
                                    !muteBtnToggled
                                        ?
                                        "Mute"
                                        :
                                        "muted"
                                }
                            </div>
                            <div className={`${`w-[63px] h-[14px]  ml-[13px] flex items-center  ${muteActive || banActive ? "cursor-pointer pointer-events-none opacity-50 justify-center" : ""}`}`}>
                                <Image src={"/arrowLeft.svg"} alt="time" width={7} height={7} className={`${`${muteActive || banActive ? "hidden" : "mr-[3px] cursor-pointer"} `}`} onClick={handleSubtractMuteButtonClick} />
                                <div className="w-[45px] h-[14px] bg-channel-600 rounded-sm flex items-center justify-center ">
                                    <span className="text-primary text-[5px] font-poppins font-medium mr-[2px]">
                                        {formatDurationString(durationSecondsMute)}
                                    </span>
                                </div>

                                <Image src={"/arrowRight.svg"} alt="time" width={7} height={7} className={`${`${muteActive || banActive ? "hidden" : "ml-[3px] cursor-pointer"} `}`} onClick={handleAddMuteButtonClick} />
                            </div>
                        </div>

                        <div className="w-full h-[20px] mb-[10px] flex items-center px-[4px] ">
                            <div className={`${`h-full w-[17px]  text-primary text-[7px] flex items-center  font-poppins font-medium ${(muteActive ) ? "cursor-pointer pointer-events-none opacity-50" : ""}`}`}>
                                {
                                    !banBtnToggled
                                        ?
                                        "Ban"
                                        :
                                        "Banned"
                                }
                            </div>
                            <div className={`${`w-[63px] h-[14px]  ml-[13px] flex items-center ${muteActive || banActive ? "cursor-pointer pointer-events-none opacity-50 justify-center" : ""}`}`}>
                                <Image src={"/arrowLeft.svg"} alt="time" width={7} height={7} className={`${`${muteActive || banActive ? "hidden" : "mr-[3px] cursor-pointer"} `}`} onClick={handleSubtractButtonClick} />
                                <div className="w-[45px] h-[14px] bg-channel-600 rounded-sm flex items-center justify-center ">
                                    <span className="text-primary text-[5px] font-poppins font-medium mr-[2px]">
                                        {formatDurationString(durationSeconds)}
                                    </span>

                                </div>
                                <Image src={"/arrowRight.svg"} alt="time" width={7} height={7} className={`${`${muteActive || banActive ? "hidden" : "ml-[3px] cursor-pointer"} `}`} onClick={handleAddButtonClick} />

                            </div>
                        </div>


                        <div className={`${`w-full h-[20px] mb-[10px] flex items-center px-[4px] ${muteActive || banActive ? "cursor-pointer pointer-events-none opacity-50" : ""}`}`}>
                            <div className="h-full w-[17px]  text-primary text-[7px] flex items-center  font-poppins font-medium">
                                Kick
                            </div>
                        </div>


                        {
                            (isOwner) &&
                            <div className="w-full h-[20px] mb-[10px] flex items-center px-[4px] ">
                                <div className="h-full w-[17px]  text-primary text-[7px] flex items-center  font-poppins font-medium" onClick={handleSetAdmin}>
                                    {
                                        (isMember)
                                            ?
                                            "Admin"
                                            :
                                            "member"
                                    }
                                </div>
                            </div>
                        }


                    </div>
                </div>
            </div>

        </>
    )
}
export default ActionsPopUp;