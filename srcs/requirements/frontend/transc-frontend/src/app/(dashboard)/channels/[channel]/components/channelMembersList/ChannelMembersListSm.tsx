"use client"

import Image from "next/image"
import ChannelMemberInfoBox from "../channelMemberBox/ChannelMemberInfoBox"


export default function ChannelMembersListSm() {
    return (
        <div className="w-full h-[35%]  px-[12%]  ">
            <div className="w-full h-[20%]   flex items-center">
                <div className="w-[75px] h-[23px] pl-[5px] flex items-center justify-center  text-white text-[15px] font-poppins font-semibold underline uppercase">
                    members
                </div>
            </div>
            <div className="w-full h-[80%] overflow-auto no-scrollbar  py-[5px]">

                <ChannelMemberInfoBox />
                <ChannelMemberInfoBox />
                <ChannelMemberInfoBox />
                <ChannelMemberInfoBox />
                <ChannelMemberInfoBox />

            </div>
            <div className="w-full flex justify-center ">
                <div className="w-[95%] h-px bg-stone-300 " />
            </div>
        </div>
    )
}
