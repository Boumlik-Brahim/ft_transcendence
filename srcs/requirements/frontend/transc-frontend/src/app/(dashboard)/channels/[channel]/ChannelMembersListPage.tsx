"use client"

import Image from "next/image";

import { useState, useEffect } from "react";

import ChannelOwnerListSm from "./components/channelMembersList/ChannelOwnerListSm";
import ChannelAdminListSm from "./components/channelMembersList/ChannelAdminListSm";
import ChannelMembersListSm from "./components/channelMembersList/ChannelMembersListSm";
import LeaveChannel from "./components/other/LeaveChannel";

import { useDispatch, useSelector } from 'react-redux';
import { ShowChannelMembers, HideChannelMembers } from '@/app/store/reducer'
import { RootState } from '@/app/store/store';
import ActionsPopUp from './components/other/ActionsPopUp'
import Cookies from 'universal-cookie';
import axios from "axios";

interface channel {
    id: string
    channelName: string,
    channelType: string,
    channelPassword: string,
    channelOwnerId: string,
    _count: any
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


function ChannelMembersListPage({ channelId, channelType }: { channelId: string, channelType:string}) {

    const dispatch = useDispatch();
    const isShowChannelMembersOn = useSelector((state: RootState) => state.toggleShowChannelMembers);

    

    const cookies = new Cookies();
    const userIdFromCookie = cookies.get('id');

    //^ ---------------- fetch channel info -------------------------
    const [channelData, setChannelData] = useState<channel>();
    const [channelOwnerUser, setChannelOwnerUser] = useState("");

    useEffect(() => {
        async function fetchPrivateChannel() {
            try {
                const response = await axios.get<channel>(`${process.env.NEXT_PUBLIC_APP_URI}:3000/channel/${channelId}`);
                console.log(response);
                response && setChannelData(response.data);
            } catch (error) {
                alert(error);
            }
        }
        fetchPrivateChannel();
    }, []);
    //^ ----------------------------------------------------------------

    const [showLeaveBtn, setShowLeaveBtn] = useState(true);
    useEffect(() => {
        (channelData?.channelOwnerId === userIdFromCookie )&& setShowLeaveBtn(false)
    },[channelData]) 

    return (
        <div className={`${isShowChannelMembersOn.showChannelMembersToggled ? "w-full h-full bg-primary" : "hidden"}`}>

            <ChannelOwnerListSm
                channelId={channelId}
            />
            <>
                <ChannelAdminListSm
                    channelId={channelId}
                />

            </>
            <ChannelMembersListSm
                channelId={channelId}
            />
            {   
                <LeaveChannel 
                    channelId={channelId}
                    userId={userIdFromCookie}
                    isOwner = {showLeaveBtn}
                    
                />
               
            }

        </div>
    )
}
export default ChannelMembersListPage;