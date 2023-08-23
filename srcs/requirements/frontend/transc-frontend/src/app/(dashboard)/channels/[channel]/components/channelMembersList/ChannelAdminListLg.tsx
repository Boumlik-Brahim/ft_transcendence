"use client"

import Image from "next/image";
import ChannelAdminInfoBox from "../channelMemberBox/ChannelAdminInfoBox";
import ChannelAdminInfoBoxLg from "../channelMemberBox/ChannelAdminInfoBoxLg";

function ChannelAdminListLg({ channelId }: { channelId: string }) {
    return (
        <>
            <div className="w-full h-[30%]  px-[12%] ">
                <div className="w-full h-[20%] flex items-center  ">
                    <div className="w-[75px] h-[23px] flex items-center justify-center  text-white text-[15px] font-poppins font-semibold  uppercase">
                        admins
                    </div>
                </div>
                <div className="w-full h-[80%] overflow-auto no-scrollbar py-[5px] relative ">

                    <ChannelAdminInfoBoxLg
                        channelId={channelId}
                    />

                </div>
                <div className="w-full flex justify-center ">
                    <div className="w-[95%] h-px bg-stone-300 " />
                </div>
            </div>

        </>
    )
}
export default ChannelAdminListLg;