import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios from "axios";
import { current } from "@reduxjs/toolkit";
interface ChannelProps {
    id: string;
    channel_name: string;
    channel_owner: string;
    channel_members: number;
    channel_mode: string;
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


function ChannelBoxInfo({id,channel_name,channel_owner, channel_members, channel_mode} : ChannelProps) {
    let channelTypeStyling = "";
   ( channel_mode === "PUBLIC"  || channel_mode === "PRIVATE")
    ?
    channelTypeStyling = 'bg-channel-800 text-primary'
    :
    channelTypeStyling = "bg-channel-100 text-channel-300"


// ^ ---------------------------------  fetch channel owner user ------------------------------
const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.currentUserId);

    const [channelOwnerUser, setChannelOwnerUser] = useState("");
// const link = `http://localhost:3000/users/${channel_owner}`
    //* useEffect to fetch User data 
    useEffect(() => {
        async function fetchOwner() {
            try {
                const response = await axios.get<Owner>(`http://localhost:3000/users/${channel_owner}`);
                setChannelOwnerUser(response.data.name);
            } catch (error) {
                console.error(error);
            }
        }
        fetchOwner();
    }, []);
    //* check if the current user is a member of the channel
    interface MemberChannelInfo {
        id: string,
        userId: string,
        channelId: string,
        role: string,
    }

    const [existingStatus,setExistingStatus] = useState<MemberChannelInfo>({
        id : '',
        userId : '',
        channelId : '',
        role : '',    
    }
    )
    useEffect(() => {
        async function fetchMemberExistence() {
            try {
                const response = await axios.get<MemberChannelInfo>(`http://localhost:3000/channel/${id}/member/${currentUserId}`);
                setExistingStatus(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchMemberExistence();
    }, []);

    !existingStatus ? channelTypeStyling = "bg-channel-700  text-primary" : channelTypeStyling 
// ^ ------------------------------------------------------------------------------------------


    return (
        <div className="w-full h-[46px] border-2 border-primary rounded-full text-white flex items-center justify-between pl-[19px] pr-[11px] mb-[9px] cursor-pointer   md:h-[78px]     lg:h-[70px] ">
            <div className="w-[80px] h-[25px]  flex flex-col justify-center md:w-[100px] md:h-[35px] lg:h-[40px] ">
                <div className="w-full text-[9px] text-primary font-bold leading-tight tracking-wider truncate   md:text-[12px] lg:w-[120px] lg:text-xs  ">
                    {channel_name}
                </div>
                <div className=" text-left text-[7px] text-primary  pl-[2px] font-normal leading-tight tracking-wider truncate  md:text-[9px] ">
                    { "🧑🏻‍💻  " +channelOwnerUser }
                </div>
            </div>
            <div className="w-[80px] h-[25px]  text-[9px] text-primary font-bold leading-tight tracking-wider flex justify-center items-center   md:w-[100px] md:h-[35px] md:text-[12px] lg:w-[120px] lg:h-[40px] ">
                <div className="pr-[3px] truncate">
                    {channel_members}
                </div>
                <span className="uppercase truncate text-primary">
                    Member
                </span>
            </div>
            <div className={`w-[65px] h-[25px]   ${channelTypeStyling} flex justify-center items-center rounded-full  md:w-[84px] md:h-[35px]`}>
                <div className={`${`text-[8px] font-bold leading-tight tracking-wider uppercase md:text-[11px]` }`}>
                    { !existingStatus ?  "join" : channel_mode}
                </div>
            </div>
        </div>
    );
};

export default ChannelBoxInfo;