
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
      <div className="w-full h-[85vh] md:h-screen flex">
      {/*------------------------------------------------- create channel page for small devices ------------------------------------------------------------------ */}

      <CreateChannel/>
      {/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <ChannelsList/>
     
    </div>
  )
}

export default page
