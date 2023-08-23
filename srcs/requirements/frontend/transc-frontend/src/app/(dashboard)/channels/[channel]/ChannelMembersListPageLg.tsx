"use client"

import Image from "next/image";

import { useState, useEffect } from "react";

import ChannelOwnerListSm from "./components/channelMembersList/ChannelOwnerListSm";
import ChannelAdminListSm from "./components/channelMembersList/ChannelAdminListSm";
import ChannelMembersListSm from "./components/channelMembersList/ChannelMembersListSm";
import LeaveChannel from "./components/other/LeaveChannel";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import ActionsPopUp from './components/other/ActionsPopUp'
import Cookies from 'universal-cookie';
import axios from "axios";
import ChannelOwnerListLg from "./components/channelMembersList/ChannelOwnerListLg";
import ChannelAdminListLg from "./components/channelMembersList/ChannelAdminListLg";
import ChannelMembersListLg from "./components/channelMembersList/ChannelMembersListLg";

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


function ChannelMembersListPageLg({ channelId, channelType }: { channelId: string, channelType:string}) {


    const cookies = new Cookies();
    const userIdFromCookie = cookies.get('id');

    //^ ---------------- fetch channel info -------------------------
    const [channelData, setChannelData] = useState<channel>();
    const [channelOwnerUser, setChannelOwnerUser] = useState("");

    useEffect(() => {
        async function fetchPrivateChannel() {
            try {
                const response = await axios.get<channel>(`http://localhost:3000/channel/${channelId}`);
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
        <div className={` w-[25%] h-screen bg-primary`}>

            <ChannelOwnerListLg
                channelId={channelId}
            />
            <>
                <ChannelAdminListLg
                    channelId={channelId}
                />

            </>
            <ChannelMembersListLg
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
export default ChannelMembersListPageLg;