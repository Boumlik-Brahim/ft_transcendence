"use client"

import Image from "next/image"
import ChannelMemberInfoBoxMd from "../channelMemberBox/ChannelMemberInfoBoxMd"



export default function ChannelMembersListMd({channelId}:{channelId:string}) {
    return (
        <div className="w-full h-[35vh] overflow-auto">

            <ChannelMemberInfoBoxMd
                channelId={channelId}
                />
        </div>
    )
}
