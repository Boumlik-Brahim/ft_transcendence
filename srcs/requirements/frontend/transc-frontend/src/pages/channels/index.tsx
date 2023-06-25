
import ChannelBoxInfo from "./ChannelBoxInfo"
import ChannelBarInfo from "./ChannelBarInfo"
import { CgClose } from 'react-icons/cg'
import { channelsData, channelProps } from "../chat/tempData/channelsData"

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
    return (
        <div className="w-full h-full ">
            <div className="w-full h-full bg-primary-900  flex flex-col">
                <div className="w-full h-[15%]  flex items-center justify-end pr-[15px]">
                    < CgClose className="text-white text-6xl " />
                </div>

                <div className="w-[65%] h-[30%]  self-center">
                    <div className="">
                        <h1 className="font-poppins font-bold text-base text-white text-center uppercase leading-6 tracking-wider mb-[37px]">
                            Private
                        </h1>
                        <input placeholder="name" type="text" className="w-full h-[37px] rounded-[3px] mb-[15px] pl-[22px]
                            focus:outline-none 
                            placeholder:font-bold placeholder:text-light-900 placeholder:text-xs placeholder:-translate-y-[2px]"
                        />
                        <input placeholder="password" type="password" className="w-full h-[37px] rounded-[3px] mb-[15px] pl-[22px]
                            focus:outline-none  
                            placeholder:font-bold placeholder:text-light-900 placeholder:text-xs placeholder:-translate-y-[2px] "
                        />
                        <button className="bg-white h-[37px] w-[81px] flex items-center justify-center font-poppins font-bold text-xs text-primary-900 leading-4 tracking-widest rounded-full ">Create</button>
                    </div>

                </div>
                <div className="w-[65%] h-[30%]  self-center mt-[15%]">
                    <h1 className="font-poppins font-bold text-base text-white text-center uppercase leading-6 tracking-wider mb-[37px]">
                        Public
                    </h1>
                    <input placeholder="name" type="text" className="w-full h-[37px] rounded-[3px] mb-[15px] pl-[22px]
                            focus:outline-none 
                            placeholder:font-bold placeholder:text-light-900 placeholder:text-xs placeholder:-translate-y-[2px]"
                    />
                    <button className="bg-white h-[37px] w-[81px] flex items-center justify-center font-poppins font-bold text-xs text-primary-900 leading-4 tracking-widest rounded-full ">Create</button>

                </div>
            </div>

            <div className="border-2 border-red-500 w-full  h-[15%] hidden">
                header
            </div>

            <div className=" w-full h-[90vh] hidden">
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
    )
}