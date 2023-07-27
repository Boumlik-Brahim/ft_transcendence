"use client"

import Image from "next/image";
import ChannelAdminInfoBox from "../channelMemberBox/ChannelAdminInfoBox";

function ChannelAdminListSm() {
    return (
        <div className="w-full h-[30%]  px-[12%]">
            <div className="w-full h-[20%]   flex items-center">
                <div className="w-[75px] h-[23px] flex items-center justify-center  text-white text-[15px] font-poppins font-semibold underline uppercase">
                    admins
                </div>
            </div>
            <div className="w-full h-[80%] overflow-auto no-scrollbar py-[5px] ">


                <ChannelAdminInfoBox />
                <ChannelAdminInfoBox />
                <ChannelAdminInfoBox />
                <ChannelAdminInfoBox />
                <ChannelAdminInfoBox />

            </div>
            <div className="w-full flex justify-center ">
                <div className="w-[95%] h-px bg-stone-300 " />
            </div>
        </div>
    )
}
export default ChannelAdminListSm;