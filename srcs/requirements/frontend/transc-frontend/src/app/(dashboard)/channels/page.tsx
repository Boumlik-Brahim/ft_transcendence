
import ChannelBarInfo from "./ChannelBarInfo"      
import ChannelBoxInfo from "./ChannelBoxInfo"
import CreateProtectedChannelForm from "./CreateProtectedChannelForm";
import CreatePrvPbcChannel from "./CreatePrvPbcChannel"
import CreateChannel from "./CreateChannel";
import Image from "next/image";
import { channelsData, channelProps } from './TempData/channelsData'
import ChannelsList from "./ChannelsList";

function page() {
  const channels = channelsData.map((channel: channelProps) => {
    return (
      <ChannelBoxInfo
      key={channel.id}
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
      <div className="w-full h-[85vh] md:h-screen flex  ">
      {/*------------------------------------------------- create channel page for small devices ------------------------------------------------------------------ */}

      <CreateChannel/>
      {/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <ChannelsList/>
      {/*--------------------------------------------------------- side friend list------------------------------------------------------------------------------- */}
     <div className="w-[25%] h-full bg-primary">

     </div>
      {/*---------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <div className={`fixed inset-0 bg-gray-900 bg-opacity-20 flex justify-center items-center `}>
            <div className="relative text-primary-900 w-[61%] h-[80%] pl-[3%] bg-transparent transform transition-transform duration-1000 ease-in-out animate-show-up " >
                <div className="w-full h-[10%] flex items-center justify-end">
                </div>
                <div className="w-[95%] h-[90%] bg-white rounded-lg flex items-center justify-center">
                    <div className="h-[65%] w-[35%] flex flex-col items-center">
                        <div className="w-full h-[20%] mb-[10px] flex items-center justify-center font-poppins text-base font-bold leading-6 tracking-normal uppercase">
                            Private
                        </div>
                        <div className="w-full h-[50%] flex flex-col justify-center">
                            <input
                                placeholder="name"
                                type="text"
                                className="text-primary-900 w-full h-[40px] font-poppins text-sm pl-[22px] mb-[15px] rounded-[5px] border-[1px] border-primary-900 focus:outline-none placeholder:font-poppins placeholder:font-bold placeholder:text-light-900 placeholder:text-xs placeholder:-translate-y-[1px]"
                            />
                            <input
                                placeholder="password"
                                type="password"
                                className="text-primary-900 w-full h-[40px] pl-[22px] rounded-[5px] border-[1px] border-primary-900  focus:outline-none placeholder:font-poppins placeholder:font-bold placeholder:text-light-900 placeholder:text-xs placeholder:-translate-y-[1px]"
                            />
                        </div>
                        <div className="w-full h-[30%] pt-[10px] flex items-center justify-start">
                            <button className="w-[87px] h-[37px] font-poppins text-xs font-bold leading-4 tracking-normal text-white rounded-full bg-primary-900">create</button>
                        </div>
                    </div>
                    <div className="w-[5%] h-[100%] flex justify-center items-center">
                        <div className="h-[80%] border-l-[1px] border-primary-900"></div>
                    </div>
                    <div className="h-[50%] w-[35%] flex flex-col items-center">
                        <div className="w-full h-[20%] flex items-center justify-center font-poppins text-base font-bold leading-6 tracking-normal uppercase">
                            public
                        </div>
                        <div className="w-full h-[50%] flex items-center">
                            <input
                                placeholder="name"
                                type="text"
                                className="text-primary-900 w-full h-[40px] font-poppins text-sm pl-[22px] rounded-[5px] border-[1px] border-primary-900 focus:outline-none placeholder:font-poppins placeholder:font-bold placeholder:text-light-900 placeholder:text-xs placeholder:-translate-y-[1px]"
                            />
                        </div>
                        <div className="w-full h-[30%] flex items-center">
                            <button className="w-[87px] h-[37px] font-poppins text-xs font-bold leading-4 tracking-normal text-white rounded-full bg-primary-900">create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
  )
}

export default page
