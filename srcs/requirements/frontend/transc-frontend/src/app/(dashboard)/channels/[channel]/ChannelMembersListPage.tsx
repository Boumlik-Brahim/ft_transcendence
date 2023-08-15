"use client"

import Image from "next/image";

import { useState, useEffect } from "react";

import ChannelOwnerListSm from "./components/channelMembersList/ChannelOwnerListSm";
import ChannelAdminListSm from "./components/channelMembersList/ChannelAdminListSm";
import ChannelMembersListSm from "./components/channelMembersList/ChannelMembersListSm";
import LeaveChannel from "./components/other/LeaveChannel";

import { useDispatch, useSelector } from 'react-redux';
import { ShowChannelMembers, HideChannelMembers } from '@/app/store/reducer'
import { RootState } from '@/app/store/store';


interface channel {
    id: string
    channelName: string,
    channelType: string,
    channelPassword: string,
    channelOwnerId: string,
    _count: any
  }


function ChannelMembersListPage({channelId} : {channelId: string}) {

    const dispatch = useDispatch();
    const isShowChannelMembersOn = useSelector((state: RootState) => state.toggleShowChannelMembers);

    const [durationSeconds, setDurationSeconds] = useState<number>(0);
    const [durationSecondsMute, setDurationSecondsMute] = useState<number>(0);

    const [totalDuration, setTotalDuration] = useState<number>(60);

    function updateDurationSeconds(newDurationSeconds: number) {
        setDurationSeconds(newDurationSeconds);
    }

    function formatDurationString(durationSeconds: number): string {
        if (durationSeconds >= 3600) {
            // Display duration in hours and minutes
            const hours = Math.floor(durationSeconds / 3600);
            const minutes = Math.floor((durationSeconds - hours * 3600) / 60);
            return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')} min`;
        } else {
            // Display duration in minutes
            const minutes = Math.floor(durationSeconds / 60);
            return `${minutes.toString().padStart(1, '0')} min`;
        }
    }

    function handleAddButtonClick() {
        updateDurationSeconds(durationSeconds + 60);
    }

    function handleSubtractButtonClick() {
        updateDurationSeconds(Math.max(durationSeconds - 60, 0));
    }

    useEffect(() => {
        setTotalDuration(Math.ceil(durationSeconds / 60));
    }, [durationSeconds]);

    function updateMuteDurationSeconds(newDurationSeconds: number) {
        setDurationSecondsMute(newDurationSeconds);
    }
    function handleSubtractMuteButtonClick() {
        updateMuteDurationSeconds(Math.max(durationSecondsMute - 60, 0));
    }

    function handleAddMuteButtonClick() {
        updateMuteDurationSeconds(durationSecondsMute + 60);
    }

    return (
    <div className={`${isShowChannelMembersOn.showChannelMembersToggled ? "w-full h-full bg-primary" : "hidden"}`}>

        <ChannelOwnerListSm 
            channelId ={channelId}
        />
            <>
                <ChannelAdminListSm />
                <div className="w-[146px] h-[120px] bg-white absolute top-[38%] right-[27%] rounded-xl hidden">
                    <div className="w-full h-full flex   ">

                        <div className="w-[41px] h-full  flex flex-col items-center justify-center mt-[5px] ">

                            <div className="w-full h-[20px] mb-[10px] border-r-[1px] border-channel-700 flex items-center justify-center">
                                <Image src={"/mute_b.svg"} alt="delete_channel" width={20} height={20} className=" " />
                            </div>
                            <div className="w-full h-[20px] mb-[10px] border-r-[1px] border-channel-700 flex items-center justify-center">
                                <Image src={"/forbidden_b.svg"} alt="delete_channel" width={20} height={20} className=" " />
                            </div>
                            <div className="w-full h-[20px] mb-[10px] border-r-[1px] border-channel-700 flex items-center justify-center">
                                <Image src={"/kick.svg"} alt="delete_channel" width={20} height={20} className=" " />
                            </div>

                        </div>
                        <div className="w-[105px] h-full flex flex-col items-center justify-center   mt-[5px] ">
                            <div className="w-full h-[20px] mb-[10px] flex items-center px-[4px]">
                                <div className="h-full w-[17px]  text-primary text-[7px] flex items-center  font-poppins font-medium">
                                    Mute
                                </div>
                                <div className="w-[63px] h-[14px]  ml-[7px] flex items-center">
                                    <Image src={"/arrowLeft.svg"} alt="time" width={7} height={7} className=" mr-[3px]" onClick={handleSubtractMuteButtonClick} />
                                    <div className="w-[45px] h-[14px] bg-channel-600 rounded-sm flex items-center justify-center ">
                                        <span className="text-primary text-[5px] font-poppins font-medium mr-[2px]">
                                            {formatDurationString(durationSecondsMute)}
                                        </span>
                                        {/* <span className="text-primary text-[5px] font-poppins font-medium">min</span> */}
                                    </div>
                                    <Image src={"/arrowRight.svg"} alt="time" width={7} height={7} className=" ml-[3px]" onClick={handleAddMuteButtonClick} />

                                </div>
                            </div>

                            <div className="w-full h-[20px] mb-[10px] flex items-center px-[4px]">
                                <div className="h-full w-[17px]  text-primary text-[7px] flex items-center  font-poppins font-medium">
                                    Ban
                                </div>
                                <div className="w-[63px] h-[14px]  ml-[7px] flex items-center">
                                    <Image src={"/arrowLeft.svg"} alt="time" width={7} height={7} className=" mr-[3px]" onClick={handleSubtractButtonClick} />
                                    <div className="w-[45px] h-[14px] bg-channel-600 rounded-sm flex items-center justify-center ">
                                        <span className="text-primary text-[5px] font-poppins font-medium mr-[2px]">
                                            {formatDurationString(durationSeconds)}
                                        </span>
                                        {/* <span className="text-primary text-[5px] font-poppins font-medium">
                                            min
                                        </span> */}
                                    </div>
                                    <Image src={"/arrowRight.svg"} alt="time" width={7} height={7} className=" ml-[3px]" onClick={handleAddButtonClick} />

                                </div>
                            </div>


                            <div className="w-full h-[20px] mb-[10px] flex items-center px-[4px]">
                                <div className="h-full w-[17px]  text-primary text-[7px] flex items-center  font-poppins font-medium">
                                    Kick
                                </div>

                            </div>


                        </div>

                    </div>

                </div>
            </>
            <ChannelMembersListSm />
        <LeaveChannel />

    </div>
    )
}
export default ChannelMembersListPage;











