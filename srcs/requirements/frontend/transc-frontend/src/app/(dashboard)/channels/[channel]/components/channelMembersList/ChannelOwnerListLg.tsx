"use client"

import Image from "next/image"
import { useDispatch, useSelector } from 'react-redux';
import { ShowChannelMembers, HideChannelMembers } from '@/app/store/reducer'
import { RootState } from '@/app/store/store';
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import {socket} from '../../../page'

import { redirect, useRouter } from 'next/navigation'

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

function ChannelOwnerListLg({ channelId }: { channelId: string }) {


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
    //^ ---------------- fetch channel Owner info -------------------------

    const [channelOwnerData, setChannelOwnerData] = useState<Owner>();

    useEffect(() => {
        async function fetchChannelOwnerData() {
            try {
                const response = channelData && await axios.get<Owner>(`http://localhost:3000/users/${channelData?.channelOwnerId}`);
                response && setChannelOwnerData(response.data);
            } catch (error) {
                alert(error);
            }
        }
        fetchChannelOwnerData();
    }, [channelData]);

    const [removeChannelPermission, setRemoveChannelPermission] = useState(false);
    useEffect(() => {
        (userIdFromCookie === channelOwnerData?.id) ? setRemoveChannelPermission(true) : setRemoveChannelPermission(false);
    },[channelData,channelOwnerData])



    const dispatch = useDispatch();
    const isShowChannelMembersOn = useSelector((state: RootState) => state.toggleShowChannelMembers);

    const handleShowChannelMembers = () => {
        dispatch(ShowChannelMembers());
    }

    const handleRemoveChannel = () =>{
        socket.emit("removeChannel", {
            channelId: channelId,
            userId: userIdFromCookie,
        })  
        console.log("!! -- remove btn has been clicked  --!!")
    }

    const router = useRouter()

    useEffect(()=>{
        socket.on("channelDeletedSuccessfully", () => {
            console.log("!! Channel removed !!");
            router.push(`/channels/`)
        })
    },[socket])


    return (
        <div className="w-full h-[20%] ">
            <div className="w-full h-[40%]  flex items-end justify-between pl-[12%] ">
                <div className="w-[75px] h-[23px] flex items-center justify-center  text-white text-[15px] font-poppins font-semibold  uppercase">
                    Owner
                </div>
            </div>
            <div className="w-[90%] h-[60%]  flex items-center  mx-[10%]">
                   <div className="h-full w-[20%] flex items-center justify-center">
                   <Image src={`${channelOwnerData ? channelOwnerData?.Avatar : "https://cdn.pixabay.com/photo/2017/07/03/09/54/dog-2467149_1280.jpg"}`} alt="Owner avatar" width={41} height={41} className="rounded-full" />
                    </div> 
                   <div className="h-full w-[80%]  flex items-center">
                       <div className="h-full w-[70%] flex items-center pl-[10px] text-white text-[15px] font-poppins font-medium truncate">
                            {channelOwnerData?.name}
                       </div>
                       <div className={`${(removeChannelPermission) ? "h-full w-[30%] flex items-center " : "hidden"}`}>
                                <Image src={"/trash.svg"} alt="delete channel" className="cursor-pointer" width={16} height={16} onClick={handleRemoveChannel}/>
                       </div>
                    </div>
            </div>
            <div className="w-full flex justify-center ">
                <span className="w-[75%] h-px bg-stone-300 " />
            </div>
        </div>
    )
}
export default ChannelOwnerListLg; 