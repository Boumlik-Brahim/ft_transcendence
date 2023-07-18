"use client"
import ChannelBarInfo from "./ChannelBarInfo"
import ChannelBoxInfo from "./ChannelBoxInfo"
import CreateProtectedChannelForm from "./CreateProtectedChannelForm";
import CreatePrvPbcChannel from "./CreatePrvPbcChannel"
import CreateChannel from "./CreateChannel";
import CreateChannelLg from "./CreateChannelLg";
import OnlineFriends from "./OnlineFriends";


import Image from "next/image";
import { channelsData, channelProps } from './TempData/channelsData'
import ChannelsList from "./ChannelsList";


import { useMediaQuery } from 'react-responsive';
import { useEffect , useState} from "react";


function Page() {
 

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
    const isMdScreen = useMediaQuery({ minWidth: 768 });
    const isLgScreen = useMediaQuery({ minWidth: 1200 });
   
    const [isMdScreenState, setIsMdScreen] = useState(false);
    const [isLgScreenState, setIsLgScreen] = useState(false);
    useEffect(() => {
        setIsMdScreen(isMdScreen);
        setIsLgScreen(isLgScreen);
      }, [isMdScreen, isLgScreen]);


    return (
        <div className="w-full h-[85vh] md:h-screen flex ">
            {/*------------------------------------------------- create channel page for small devices ------------------------------------------------------------------ */}

           { (!isLgScreenState) && <CreateChannel />}
            {/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */}

            <ChannelsList />
            {/*--------------------------------------------------------- side friend list------------------------------------------------------------------------------- */}
               {(isLgScreenState ) &&  <OnlineFriends />}
            {/*---------------------------------------------------------------------------------------------------------------------------------------------------------- */}

           {isLgScreenState && <CreateChannelLg />}


        </div>
    )
}

export default Page
