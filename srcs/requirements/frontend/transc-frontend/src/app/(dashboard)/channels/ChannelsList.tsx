"use client"

import ChannelBarInfo from "./ChannelBarInfo"      
import ChannelBoxInfo from "./ChannelBoxInfo"
import { channelsData, channelProps } from './TempData/channelsData'

import { useDispatch, useSelector } from 'react-redux'; 
import { createChannelOn, createChannelOff } from '../../store/reducer';
import { RootState } from '../../store/store';

import { useMediaQuery } from 'react-responsive';
import { useEffect , useState} from "react";

function ChannelsList() {
  const isCreateChannelOn = useSelector((state: RootState) => state.createChannelToggle);
  const isCreateChannelPopUpOn = useSelector((state: RootState) => state.createChannelPopUpToggle);


  const isMdScreen = useMediaQuery({ minWidth: 768 });
  const isLgScreen = useMediaQuery({ minWidth: 1200 });
 
  const [isMdScreenState, setIsMdScreen] = useState(false);
  const [isLgScreenState, setIsLgScreen] = useState(false);
  useEffect(() => {
      setIsMdScreen(isMdScreen);
      setIsLgScreen(isLgScreen);
    }, [isMdScreen, isLgScreen]);

    
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
        <div className={`${(!isCreateChannelOn.createChannelBtnToggled ) ? "flex-1  w-full h-full " : "hidden"} ${isCreateChannelPopUpOn.createChannelPopUpToggled ? "blur-sm bg-gray-400" : ""} `}>
        <div className="w-full h-1/2  px-[22px] ">

          <ChannelBarInfo
            title="My channels"
            btnVisibility=""
          />

          <div className="w-full h-[82%] overflow-auto no-scrollbar  py-[7px] px-[2px] lg:py-[10px] lg:px-[48px]">
            {/*----------------------------------------- channel info box ------------------------------------------------------------------------------------------------------------- */}
            {channels}
            {/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
          </div>
        </div>
        <div className="w-full h-1/2 px-[22px]">

          <ChannelBarInfo
            title="general"
            btnVisibility="hidden"
          />
          <div className="w-full h-[81%] overflow-auto  no-scrollbar pt-[7px]  px-[2px]  lg:py-[10px] lg:px-[48px]">

            {/*----------------------------------------- channel info box ------------------------------------------------------------------------------------------------------------- */}
            {channels}
            {/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
          </div>
        </div>
      </div>
    )
}
export default ChannelsList;