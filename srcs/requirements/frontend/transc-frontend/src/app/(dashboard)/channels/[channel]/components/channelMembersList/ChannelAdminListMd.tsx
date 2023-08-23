"use client"

import Image from "next/image";
import ChannelAdminInfoBoxMd from "../channelMemberBox/ChannelAdminInfoBoxMd";

function ChannelAdminListMd({channelId}:{channelId:string}) {
    return (
        <div className="w-full h-[35vh] overflow-auto no-scrollbar">


              <ChannelAdminInfoBoxMd
                        channelId={channelId}
                />
                


                 
           

        </div>

    )
}
export default ChannelAdminListMd;