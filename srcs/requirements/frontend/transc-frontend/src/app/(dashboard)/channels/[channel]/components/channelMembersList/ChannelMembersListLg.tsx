"use client"

import Image from "next/image"
import ChannelMemberInfoBox from "../channelMemberBox/ChannelMemberInfoBox"
import ChannelMemberInfoBoxLg from "../channelMemberBox/ChannelMemberInfoBoxLg"


export default function ChannelMembersListLg({channelId}:{ channelId : string}) {
    return (
        <div className="w-full h-[35%]  px-[12%]  ">
            <div className="w-full h-[20%]   flex items-center">
                <div className="w-[75px] pl-[4%] h-[23px] flex items-center justify-center  text-white text-[15px] font-poppins font-semibold  uppercase">
                    members
                </div>
            </div>
            <div className="w-full h-[80%] overflow-auto no-scrollbar  relative py-[5px]">

                <ChannelMemberInfoBoxLg
                    channelId ={channelId}
                />
                

            </div>
            <div className="w-full flex justify-center ">
                <div className="w-[95%] h-px bg-stone-300 " />
            </div>
        </div>
    )
}
