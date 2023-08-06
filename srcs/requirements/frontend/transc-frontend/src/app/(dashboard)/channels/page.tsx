"use client"
import ChannelBarInfo from "./ChannelBarInfo"
import ChannelBoxInfo from "./ChannelBoxInfo"
import CreateProtectedChannelForm from "./CreateProtectedChannelForm";
import CreatePrvPbcChannel from "./CreatePrvPbcChannel"
import CreateChannel from "./CreateChannel";
import CreateChannelLg from "./CreateChannelLg";
import OnlineFriends from "./OnlineFriends";
import Sidebar from '@/../components/Sidebar'


import Image from "next/image";
import { channelsData, channelProps } from './TempData/channelsData'
import ChannelsList from "./ChannelsList";


import { useMediaQuery } from 'react-responsive';
import { useEffect, useState, useRef } from "react";
import { Socket, io } from "socket.io-client";

import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { RootState } from '@/app/store/store';
import { setCurrentUser } from '@/app/store/reducer';


function Page() {


    const channels = channelsData.map((channel: channelProps) => {
        return (
            <ChannelBoxInfo
                key={channel.id}
                id={channel.channel_name}
                channel_name={channel.channel_name}
                channel_owner={channel.channel_owner}
                channel_members={channel.channel_members}
                channel_mode={channel.channel_mode}
            />
        );
    });
    const isMdScreen = useMediaQuery({ minWidth: 768 });
    const isLgScreen = useMediaQuery({ minWidth: 1200 });

    const [isMdScreenState, setIsMdScreen] = useState(false);
    const [isLgScreenState, setIsLgScreen] = useState(false);
    useEffect(() => {
        setIsMdScreen(isMdScreen);
        setIsLgScreen(isLgScreen);
    }, [isMdScreen, isLgScreen]);

//^ ------------------------------------- socket Io ----------------------------------------
const socket = useRef<Socket>();
const dispatch = useDispatch();

const cookies = new Cookies();
    const userIdFromCookie = cookies.get('id');
    dispatch(setCurrentUser(userIdFromCookie));
  //* useEffect for creating socket
  useEffect(() => {
    socket.current = io("ws://localhost:3000");
  }, [])
//^ ----------------------------------------------------------------------------------------


    return (
        <>
            <Sidebar />
            <div className="w-full h-[85vh]  md:h-screen flex flex-col ">
                {/*------------------------------------------------- create channel page for small devices ------------------------------------------------------------------ */}

                {(!isLgScreenState) && <CreateChannel />}
                {/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                <ChannelsList 
                />

                {isLgScreenState && <CreateChannelLg />}

            </div>

            {/*--------------------------------------------------------- side friend list------------------------------------------------------------------------------- */}
            {(isLgScreenState) && <OnlineFriends />}
            {/*---------------------------------------------------------------------------------------------------------------------------------------------------------- */}
        </>
    )
}

export default Page
