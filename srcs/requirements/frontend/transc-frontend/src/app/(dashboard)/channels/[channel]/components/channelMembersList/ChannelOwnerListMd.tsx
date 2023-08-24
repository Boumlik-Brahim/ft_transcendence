"use client"

import Image from "next/image"
import { useDispatch, useSelector } from 'react-redux';
import { ShowChannelMembers, HideChannelMembers } from '@/app/store/reducer'
import { RootState } from '@/app/store/store';
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import { socket } from '../../../page'

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

function ChannelOwnerListMd({ channelId }: { channelId: string }) {


    const cookies = new Cookies();
    const userIdFromCookie = cookies.get('id');

    //^ ---------------- fetch channel info -------------------------
    const [channelData, setChannelData] = useState<channel>();
    const [channelOwnerUser, setChannelOwnerUser] = useState("");

    useEffect(() => {
        async function fetchPrivateChannel() {
            try {
                const response = await axios.get<channel>(`${process.env.NEXT_PUBLIC_APP_URI}:3000/channel/${channelId}`);
                
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
                const response = channelData && await axios.get<Owner>(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${channelData?.channelOwnerId}`);
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


    return (
        <div className="w-full h-[10vh] ">
            <div className="w-full h-full flex">
                <div className={`${`h-full  ${removeChannelPermission ? "w-[70%] justify-end" : "w-full justify-center"} flex items-center `}`}>
                    <img src={`${channelOwnerData ? channelOwnerData.Avatar : "https://cdn.pixabay.com/photo/2017/07/03/09/54/dog-2467149_1280.jpg"}`} alt="delete channel" className="rounded-full w-[50px] h-[50px] object-fill" />
                </div>
               { removeChannelPermission && 
                    <div className="h-full w-[30%]  flex items-center justify-start pl-[7px]">
                        <Image src={"/trash.svg"} alt="delete channel" width={15} height={15} />
                    </div>
                }
            </div>
            <div className="w-[80%] h-px bg-stone-300 ml-[10%]" />
            
        </div>
    )
}
export default ChannelOwnerListMd; 