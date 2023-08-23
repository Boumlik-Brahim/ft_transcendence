"use client"

import Image from "next/image"

import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import axios from "axios";
import MemberBoxInfo from './MemberBoxInfo'
import { redirect, useRouter } from 'next/navigation'
import { socket } from "../../../page";
import MemberBoxInfoMd from "./MemberBoxInfoMd";

interface channelMembers {
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

interface MemberData {
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



function ChannelMemberInfoBoxMd({ channelId }: { channelId: string }) {

    //  ^ ---------------------- Fetch Channel Admins --------------------------
    const [channelMembers, setChannelMembers] = useState<channelMembers[]>([]);
    const [memberData, setMemberData] = useState<MemberData[]>([]);
    const [channelMembersCheck, setChannelMembersCheck] = useState(false);

    const [refresh, setRefresh] = useState(false);

  
    socket.on("memberKickedSuccessfully", () => {
        setRefresh(!refresh);
        setMemberData([]);

    })

    socket.on("refrechMember", () => {
        setRefresh(!refresh);
        setMemberData([]);

    })
   


    //* fetching Channel Members  
    useEffect(() => {
        async function fetchMembers() {
            try {
                const response = await axios.get<channelMembers[]>(`http://localhost:3000/channel/${channelId}/member`);
                setChannelMembers(response.data);
            } catch (error) {
                alert(error);
            }
        }
        fetchMembers();
    }, [refresh]);


    useEffect(() => {
        const fetchMemberData = async (userId: string) => {
            try {
                const response = await axios.get<MemberData>(`http://localhost:3000/users/${userId}`);
                const memberDataTemp: MemberData = response.data;
                setMemberData((prevData) => [...prevData, memberDataTemp]);
            } catch (error) {
                alert(error);
            }
        };
        setMemberData([]);
        channelMembers.map((member) => {
            fetchMemberData(member.userId);
        });
    }, [channelMembers])



    const members = memberData.map((member, i) => {

        return (
            <MemberBoxInfoMd
                userId={member.id}
                channelId={channelId}
                userName={member.name}
                profilePic={member.Avatar}
                key={i}
            />
        )
    })




    //  ^ ----------------------------------------------------------------------

    return (
        <>
            {
                members.length !== 0
                    ?
                    members
                    :
                    <div className="w-full h-[85%] text-channel-500 text-[8px] flex items-center justify-center font-poppins font-light tracking-wide ">
                        No regular members here
                    </div>
            }
        </>
    )
}
export default ChannelMemberInfoBoxMd;