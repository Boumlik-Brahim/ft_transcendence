"use client"

import ChannelOwnerListSm from "./components/channelMembersList/ChannelOwnerListSm";
import ChannelAdminListSm from "./components/channelMembersList/ChannelAdminListSm";
import ChannelMembersListSm from "./components/channelMembersList/ChannelMembersListSm";
import LeaveChannel from "./components/other/LeaveChannel";

import { useDispatch, useSelector } from 'react-redux';
import { ShowChannelMembers, HideChannelMembers } from '@/app/store/reducer'
import { RootState } from '@/app/store/store';

function ChannelMembersListPage() {
    const dispatch = useDispatch();
    const isShowChannelMembersOn = useSelector((state: RootState) => state.toggleShowChannelMembers);

    return (
        <div className={`${isShowChannelMembersOn.showChannelMembersToggled ? "w-full h-full bg-primary" : "hidden"}`}>

            <ChannelOwnerListSm />
            <>
                <ChannelAdminListSm />
                <div className="w-[146px] h-[137px] bg-white absolute top-[38%] right-[27%] rounded-xl">
                    <div></div>

                </div>
            </>
            <ChannelMembersListSm />
            <LeaveChannel />

        </div>
    )
}
export default ChannelMembersListPage;
