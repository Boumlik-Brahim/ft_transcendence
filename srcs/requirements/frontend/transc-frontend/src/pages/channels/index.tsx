
import ChannelBoxInfo from "./ChannelBoxInfo"
import ChannelBarInfo from "./ChannelBarInfo"
import { CgClose } from 'react-icons/cg'
import { MdNotifications } from 'react-icons/md'
import { channelsData, channelProps } from "../chat/tempData/channelsData"

import InputText from "./InputText"
import OnlineFriendsList from "./OnlineFriendsList"
import PopUpWindow from "./PopUpWindow"


import { useDispatch, useSelector } from 'react-redux';
import { createChannelOff } from '../../store/reducer';

import { RootState } from '../../store/store';
import { useMediaQuery } from "@react-hook/media-query"

export function Channels() {
    const channels = channelsData.map((channel: channelProps) => {
        return (
            <ChannelBoxInfo
                id={channel.id}
                bg_color={channel.bg_color}
                txt_color={channel.txt_color}
                channel_name={channel.channel_name}
                channel_owner={channel.channel_owner}
                channel_members={channel.channel_members}
                channel_mode={channel.channel_mode}
            />
        );
    });

    const isCreateChannelOn = useSelector((state: RootState) => state.createChannelToggle);
    const dispatch = useDispatch();
    const handleCreateChannelToggleOff = () => {
        dispatch(createChannelOff());
    }

    const isMdScreen = useMediaQuery('(min-width: 768px)');
    const currentPopUpStatus = useSelector((state: RootState) => state.togglePopUp);


    return (
        <div className="w-full h-full lg:flex ">
            <div className={`${"lg:w-[67%]   relative  "} ${currentPopUpStatus.showPopUpCreateChannel ? " blur-sm bg-gray-400" : ""}`} >

                {/*----------------------- Create Channel Page : sm && md Devices ------------------------------ */}
                <div className={`${isCreateChannelOn.createChannelBtnToggled ? "w-screen h-screen bg-primary-900  flex flex-col " : "hidden"}`}>
                    <div className="w-full h-[15%]  flex items-center justify-end pr-[15px] md:pr-[50px]">
                        < CgClose className="text-white text-6xl md:text-7xl" onClick={handleCreateChannelToggleOff} />
                    </div>
                    <div className="w-[65%] h-[30%]  self-center md:w-[30%] md:h-[25%]">
                        <div className="">
                            <h1 className="font-poppins font-bold text-base text-white text-center uppercase leading-6 tracking-wider mb-[37px]">
                                Private
                            </h1>
                            <InputText type="text" holder="name" />
                            <InputText type="password" holder="password" />
                            <button className="bg-white h-[37px] w-[81px] flex items-center justify-center font-poppins font-bold text-xs text-primary-900 leading-4 tracking-widest rounded-full ">
                                Create
                            </button>
                        </div>
                    </div>
                    <div className="w-[65%] h-[30%]  self-center mt-[15%] md:w-[30%] md:mt-[5%] ">
                        <h1 className="font-poppins font-bold text-base text-white text-center uppercase leading-6 tracking-wider mb-[37px]">
                            Public
                        </h1>
                        <InputText type="text" holder="name" />
                        <button className="bg-white h-[37px] w-[81px] flex items-center justify-center font-poppins font-bold text-xs text-primary-900 leading-4 tracking-widest rounded-full " >
                            Create
                        </button>
                    </div>
                </div>

                {/*------------------------------------------------------------------------------------- */}

                {/*------------------------------------ Header------------------------------------------ */}
                <div className={`${(isMdScreen && !isCreateChannelOn.createChannelBtnToggled) ? "h-[10vh] flex items-center justify-between px-[25px]" : "hidden"}`}>
                    <div className="font-poppins  text-lg font-bold  tracking-wider text-primary-900 ">
                        Channels
                    </div>
                    <div>
                        <MdNotifications className="text-[22px] text-primary-900 cursor-pointer	" />
                    </div>
                </div>
                {/*------------------------------------------------------------------------------------- */}


                <div className={`${!isCreateChannelOn.createChannelBtnToggled ? "w-[full] h-[90vh] " : "hidden"}`}>
                    <div className="  h-1/2 px-[20px] py-[10px]    md:px-[26px] ">
                        <div className=" w-full h-full     md:px-[15px]">
                            <div className="h-[20%] w-full ">
                                <ChannelBarInfo
                                    title="my channels"
                                    btn_visibility=""
                                />
                            </div>
                            <div className="w-full h-[80%] overflow-auto no-scrollbar py-[5px] px-[2px]   lg:h-[85%] ">
                                {channels}

                            </div>
                        </div>
                    </div>
                    <div className=" h-1/2 px-[20px] py-[10px]    md:px-[26px] ">
                        <div className=" w-full h-full    md:px-[15px] ">
                            <div className="h-[20%] w-full ">
                                <ChannelBarInfo
                                    title="general"
                                    btn_visibility="hidden"
                                />
                            </div>
                            <div className="w-full h-[70%] overflow-auto no-scrollbar py-[5px] px-[2px]    lg:h-[80%] ">
                                {channels}

                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className=" text-primary-900 bg-gray-200 z-40 absolute top-[50%] right-0 h-[50px] w-[50.2vw] border-2 border-red-600">hshds</div> */}
            </div>
            {/*-----------------------------------------Pop-Up window for create a channel----------------------------------------------------------------------------------*/}
                <PopUpWindow />
            {/*-----------------------------------------Online Friends----------------------------------------------------------------------------------*/}
                <OnlineFriendsList />
            {/*---------------------------------------------------------------------------------------------------------------------------------------------------*/}

        </div>

    )
}
