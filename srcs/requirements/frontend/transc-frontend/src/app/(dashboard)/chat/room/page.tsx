"use client"
import Image from "next/image";
import MessageInputChannelBox from "./MessageInputChannelBox";
import RoomMessageBox from "./RoomMessageBox";
import ChannelMembersListPage from "./ChannelMembersListPage";

import { useSelector } from 'react-redux';
import { ShowChannelMembers, HideChannelMembers } from '@/app/store/reducer';
import { RootState } from '@/app/store/store';


function Page() {
    const isShowChannelMembersOn = useSelector((state: RootState) => state.toggleShowChannelMembers);
    return (
        <div className="w-full h-[85vh] md:h-screen flex ">
            <div className={`${!isShowChannelMembersOn.showChannelMembersToggled ? "w-full h-full" : "hidden"}`}>
                <div className="w-full h-[85%] py-[10px] overflow-auto">

                    <RoomMessageBox
                        userId={1}
                        userName="Bilal Ben Aouad"
                        profilePic="bben-aou.jpeg"
                        date="08/06/2023 09:19"
                        messageContent="Hello everyone !"
                    />

                    <RoomMessageBox
                        userId={1}
                        userName="brahim alami"
                        profilePic="profile1.jpeg"
                        date="08/06/2023 09:19"
                        messageContent="first message in room *_*"
                    />

                </div>
                <MessageInputChannelBox />
            </div>

            <ChannelMembersListPage />
        </div>

    )
}
export default Page;
