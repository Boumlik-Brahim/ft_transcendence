
import ChannelBoxInfo from "./ChannelBoxInfo"
import ChannelBarInfo from "./ChannelBarInfo"
import { CgClose } from 'react-icons/cg'
import { channelsData, channelProps } from "../chat/tempData/channelsData"
import InputText from "./InputText"

import { useDispatch, useSelector } from 'react-redux';
import { createChannelOff} from '../../store/reducer';
import { RootState } from '../../store/store';

export const Channels = () => {
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
    const handleCreateChannelToggleOff = () =>{
        dispatch(createChannelOff());
    }

    return (
        <div className={`w-full h-full`}>
            <div className={`${isCreateChannelOn.createChannelBtnToggled ? "w-full h-full bg-primary-900  flex flex-col" : "hidden" }`}>
                <div className="w-full h-[15%]  flex items-center justify-end pr-[15px]">
                    < CgClose className="text-white text-6xl " onClick={handleCreateChannelToggleOff}/>
                </div>

                <div className="w-[65%] h-[30%]  self-center">
                    <div className="">
                        <h1 className="font-poppins font-bold text-base text-white text-center uppercase leading-6 tracking-wider mb-[37px]">
                            Private
                        </h1>
                        <InputText type="text" holder="name" />
                        <InputText type="password" holder="password" />
                        <button className="bg-white h-[37px] w-[81px] flex items-center justify-center font-poppins font-bold text-xs text-primary-900 leading-4 tracking-widest rounded-full ">Create</button>
                    </div>

                </div>
                <div className="w-[65%] h-[30%]  self-center mt-[15%]">
                    <h1 className="font-poppins font-bold text-base text-white text-center uppercase leading-6 tracking-wider mb-[37px]">
                        Public
                    </h1>
                    <InputText type="text" holder="name" />
                    <button className="bg-white h-[37px] w-[81px] flex items-center justify-center font-poppins font-bold text-xs text-primary-900 leading-4 tracking-widest rounded-full " >
                        Create
                    </button>

                </div>
            </div>
        <div className={`${!isCreateChannelOn.createChannelBtnToggled  ? "" : "hidden"}`}>
            <div className={`border-2 border-red-500 w-full  h-[15%] hidden`}>
                header
            </div>

            <div className=" w-full h-[90vh] ">
                <div className="w-full h-[50%] pb-[10px]">
                    <ChannelBarInfo
                        title="My Channel"
                        btn_visibility=""
                    />
                    <div className="h-[70%] w-full px-[4%] overflow-auto">

                        {channels}

                    </div>
                </div>
                <div className=" w-full h-[50%] pb-[10px]">
                    <ChannelBarInfo
                        title="General"
                        btn_visibility="hidden"
                    />
                    <div className="h-[70%]  w-full px-[4%] overflow-auto">

                        {channels}

                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}