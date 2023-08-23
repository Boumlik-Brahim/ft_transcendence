"use client"

import axios from "axios";
import Image from "next/image"
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';

import AdminBoxInfo from './AdminBoxInfo'
import { socket } from "../../../page";
import AdminBoxInfoMd from "./AdminBoxInfoMd";



        

interface channelAdmins {
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


interface AdminData {
    id: string;
    name: string;
    email: string;
    IntraId: string;
    Avatar: string;
    status: string;
    created_at: string;
    updated_at: string;
}

const cookies = new Cookies();
const userIdFromCookie = cookies.get('id');



function ChannelAdminInfoBoxMd({ channelId }: { channelId: string }) {

    //  ^ ---------------------- Fetch Channel Admins --------------------------
    const [channelAdmins, setChannelAdmins] = useState<channelAdmins[]>([]);
    const [adminData, setAdminData] = useState<AdminData[]>([]);
    const [channelAdminsCheck, setChannelAdminsCheck] = useState(false);
    const [refresh, setRefresh] = useState(false);

    socket.on("memberKickedSuccessfully", () => {
        setRefresh(!refresh);
        setAdminData([]);

    })
    socket.on("refrechMember", () => {
        setRefresh(!refresh);
        setAdminData([]);
    })


    //* fetching Channel Admins  
    useEffect(() => {
        async function fetchAdmins() {
            try {
                const response = await axios.get<channelAdmins[]>(`http://localhost:3000/channel/${channelId}/admin`);
                setChannelAdmins(response.data);
            } catch (error) {
                alert(error);
            }
        }
        fetchAdmins();
    }, [refresh]);


    useEffect(() => {
        const fetchAdminData = async (userId: string) => {
            try {
                const response = await axios.get<AdminData>(`http://localhost:3000/users/${userId}`);
                const adminData: AdminData = response.data;
                setAdminData((prevData) => [...prevData, adminData]);
            } catch (error) {
                alert(error);
            }
        };
        setAdminData([]);
        channelAdmins.map((admin) => {
            fetchAdminData(admin.userId);
        });

    }, [channelAdmins])

    const admins = adminData.map((admin) => {
        return (
            <AdminBoxInfoMd
                userId={admin.id}
                channelId={channelId}
                userName={admin.name}
                profilePic={admin.Avatar}
                key={admin.id}
            />
        )
    })


    //  ^ ----------------------------------------------------------------------


    return (
        <>
            {
                admins.length !== 0
                    ?
                    admins
                    :
                    <div className="w-full h-full text-channel-500 text-[9px] flex items-center justify-center font-poppins font-light tracking-wide ">
                        No admins available
                    </div>
            }
            
        </>
    )
}
export default ChannelAdminInfoBoxMd;
