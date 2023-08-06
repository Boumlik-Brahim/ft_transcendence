"use client"

import ChannelBarInfo from "./ChannelBarInfo"
import ChannelBoxInfo from "./ChannelBoxInfo"
import { channelsData, channelProps } from './TempData/channelsData'

import { useDispatch, useSelector } from 'react-redux';
import { createChannelOn, createChannelOff } from '../../store/reducer';
import { RootState } from '../../store/store';

import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from "react";

import Image from "next/image"
import axios from "axios";

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


  // const channelsList = channelsData.map((channel: channelProps) => {
  //   return (
  //     <ChannelBoxInfo
  //       key={channel.id}
  //       id={channel.channel_name}
  //       channel_name={channel.channel_name}
  //       channel_owner={channel.channel_owner}
  //       channel_members={channel.channel_members}
  //       channel_mode={channel.channel_mode}
  //     />
  //     );
  //   });
    // if (channels.length == 0)
    // console.log("Empty channels")
  
  //@ ------------------ handle click get private channel by ID --------------------

  const handleGetPrivateChannelById = () => {
    console.log("btn clicked !");
  }
  //@ ------------------------------------------------------------------------------
const wrongChannelIdStyling = "red-400"

//^ ---------------------------------- fetch  channels --------------------------------
    interface channel{
    id: string
    channelName : string,
    channelType : string,
    channelPassword : string,
    channelOwnerId : string,
    _count: any
    }

  //& ------------------------------- fetch my channels ----------------------------
  const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.currentUserId);
  const refreshStatus = useSelector((state: RootState) => state.refreshFetchChannels.refreshFetchChannels);

    const [channels, setChannels] = useState<channel[]>([]);

  //* fetching  MY Channel List 
  useEffect(() => {
    async function fetchChannels() {
      try {
        const response = currentUserId && await axios.get<channel[]>(`http://localhost:3000/channel/${currentUserId}/myAllChannels`);
        response && console.log(response.data) 
        response && setChannels(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchChannels();
  }, [currentUserId, refreshStatus]);

    const MyChannelsList = channels.map((channel:channel, i) => {
    return (
      <ChannelBoxInfo
        key={channel.id}
        id={channel.id}
        channel_name={channel.channelName}
        channel_owner={channel.channelOwnerId}
        channel_members={channel._count.channelMember}
        channel_mode={channel.channelType}
      />
      );
    });
  //& --------------------------------------------------------------------------------


  //& ------------------------------- fetch General channels ----------------------------
    const [generalChannels, setGeneralChannels] = useState<channel[]>([]);
    
    //* fetching  MY Channel List 
  useEffect(() => {
    async function fetchChannels() {
      try {
        const response = currentUserId && await axios.get<channel[]>(`http://localhost:3000/channel/${currentUserId}/allChannels`);
        response && console.log(response.data) 
        response && setGeneralChannels(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchChannels();
  }, [ refreshStatus]);

    const GeneralChannelsList = generalChannels.map((channel:channel, i) => {
    return (
      <ChannelBoxInfo
        key={channel.id}
        id={channel.id}
        channel_name={channel.channelName}
        channel_owner={channel.channelOwnerId}
        channel_members={channel._count.channelMember}
        channel_mode={channel.channelType}
      />
      );
    });
  //& -----------------------------------------------------------------------------------



//^ ----------------------------------------------------------------------------------



  return (
    <>
      <div className={`${(!isCreateChannelOn.createChannelBtnToggled) ? "flex-1  w-full h-full " : "hidden"} ${isCreateChannelPopUpOn.createChannelPopUpToggled ? "blur-sm " : ""} `}>
        {
          isLgScreenState && <>
            <div className="w-full h-[30vh] bg-white flex flex-col items-center justify-between px-[7%]">
              <div className="w-full h-[50%] flex items-center justify-between">
                <h1 className="text-primary text-xl font-press font-normal uppercase">
                  Channels
                </h1>
                <Image src={"/notification_b.svg"} alt="search" width={24} height={24} />
              </div>
              <div className="w-full h-[50%] flex items-center" >
                <div className="h-[54px] w-[397px] border-2 border-gray-300 rounded-[61px] flex items-center ">
                  <div className="h-full w-[15%]  flex items-center justify-center">
                    <Image src={"/search_b.svg"} alt="search" width={24} height={24} />
                  </div>
                  <input
                    placeholder="Search By Private Channel ID "
                    className={`
                                h-full  w-[65%]  text-primary font-poppins  pl-[3px] rounded-[61px] font-normal text-[11px]  
                                focus:outline-none  
                                placeholder:font-normal placeholder:text-gray-500 placeholder:text-[11px] 
                                
                    `} name="content"
                  />
                  <button className="w-[15%] h-[60%] rounded-[61px] bg-channel-700 ml-[4px] flex items-center justify-center text-primary  font-poppins text-xs" onClick={handleGetPrivateChannelById}> find </button>
                </div>
              </div>

              <div className="h-[10vh] w-full  flex items-center ">
                {/* <ChannelBoxInfo
                  key={15}
                  id={"15"}
                  channel_name={"Worriers"}
                  channel_owner={"Bilal Ben Aouad"}
                  channel_members={130}
                  channel_mode={"protected"}
                /> */}
              </div>
            </div>
          </>
        }
        <div className={`${isLgScreenState ? "w-full h-[70vh]  " : "w-full h-[90%]"}`}>
          <div className="w-full h-1/2  px-[22px] ">

            <ChannelBarInfo
              title="My channels"
              btnVisibility=""
            />

            <div className="w-full h-[82%] overflow-auto no-scrollbar  py-[7px] px-[2px] lg:py-[10px] lg:px-[48px]">
              {
                (MyChannelsList.length == 0)
                  ?
                  <div className=" w-full  h-full text-primary text-xl flex items-center justify-center p-0 m-0 font-poppins ">
                    You are not currently a member of any channels
                  </div>
                  :
                  MyChannelsList
              }
              {/*----------------------------------------- channel info box ------------------------------------------------------------------------------------------------------------- */}
              {/* {channels} */}
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
              {/* {channels} */}
              {
                (GeneralChannelsList.length == 0)
                  ?
                  <div className=" w-full  h-full text-primary text-xl flex items-center justify-center p-0 m-0 font-poppins ">
                    No channels available to join at this time !
                  </div>
                  :
                  GeneralChannelsList
              }
              {/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ChannelsList;