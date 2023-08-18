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


import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';


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


  const wrongChannelIdStyling = "red-400"

  //^ ---------------------------------- fetch  channels --------------------------------
  interface channel {
    id: string
    channelName: string,
    channelType: string,
    channelPassword: string,
    channelOwnerId: string,
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
        const response = currentUserId && await axios.get<channel[]>(`${process.env.NEXT_PUBLIC_APP_URI}/channel/${currentUserId}/myAllChannels`);
        response && setChannels(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchChannels();
  }, [currentUserId, refreshStatus]);

  const MyChannelsList = channels.map((channel: channel, i) => {
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
        const response = currentUserId && await axios.get<channel[]>(`${process.env.NEXT_PUBLIC_APP_URI}/channel/${currentUserId}/allChannels`);
        response && setGeneralChannels(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchChannels();
  }, [refreshStatus]);

  const GeneralChannelsList = generalChannels.map((channel: channel, i) => {
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

  //& ------------------ handle click get private channel by ID --------------------
  const [privateChannel, setPrivateChannel] = useState<channel>();
  const [privateInputId, setPrivateInputId] = useState("");
  const [results, setResults] = useState(false);
  const [find, setFind] = useState(false);


  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setCheck(true);
    value && setPrivateInputId(value);
  }

  const [check, setCheck] = useState(true);

  useEffect(() => {
    async function fetchPrivateChannel() {
      try {
        const response = privateInputId && await axios.get<channel>(`${process.env.NEXT_PUBLIC_APP_URI}/channel/${privateInputId}`);
        response && setPrivateChannel(response.data);
        response && setResults(true);
        response && setCheck(true)
      } catch (error) {
        setPrivateInputId('')
        setCheck(false)
        // console.error(error);
        alert(error);
      }
    }
    fetchPrivateChannel();
    setPrivateInputId('')
  }, [find]);



  useEffect(() => {
    setPrivateInputId('')
  }, [results])

  const handleGetPrivateChannelById = async () => {
    setPrivateChannel(undefined)
    setFind(!find);
  }
  //& ------------------------------------------------------------------------------


  //* ------------------------------popUp  password for private channel -------------------------


    const [openModal, setOpenModal] = useState<string | undefined>();
    const [email, setEmail] = useState("");
    const props = { openModal, setOpenModal, email, setEmail };


    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
      setIsFocused(true);
    };
    const handleBlur = () => {
      setIsFocused(false);
    };

    function handleInputPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
      const value = event.target.value;
      setCheck(true);
      value && setPrivateInputId(value);
    }
  //* -------------------------------------------------------------------------------------------
  
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
                <div className={`${`h-[54px] w-[397px] border-2 ${!check ? " border-red-500" : " border-gray-300"}  rounded-[61px] flex items-center `}`}>
                  <div className="h-full w-[15%]  flex items-center justify-center">
                    <Image src={"/search_b.svg"} alt="search" width={24} height={24} />
                  </div>
                  <input
                    placeholder={`${!check ? "Oops! No channel found with the specified ID" : "Search By Private Channel ID"}`}
                    className={`${`h-full  w-[65%]  text-primary font-poppins  pl-[3px] rounded-[61px] font-normal text-[11px] focus:outline-none  placeholder:font-normal ${!check ? "placeholder:text-red-500 " : "focus:outline-none placeholder:text-gray-500"} placeholder:text-[11px] `}`}
                    name="content" value={privateInputId} onChange={handleInputChange}
                  />
                  <button className="w-[15%] h-[60%] rounded-[61px] bg-channel-700 ml-[4px] flex items-center justify-center text-primary  font-poppins text-xs" onClick={handleGetPrivateChannelById}>
                    find
                  </button>
                </div>
              </div>

              <div className="h-[10vh] w-full  flex items-center ">
                {privateChannel && privateChannel.channelType === "PRIVATE" && <ChannelBoxInfo
                  key={15}
                  id={privateChannel.id}
                  channel_name={privateChannel.channelName}
                  channel_owner={privateChannel.channelOwnerId}
                  channel_members={privateChannel._count.channelMember}
                  channel_mode={privateChannel.channelType}
                />}
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
                  <div className=" w-full  h-full text-primary text-[13px] md:text-xl flex items-center justify-center p-0 m-0 font-poppins ">
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
                  <div className=" w-full  h-full text-primary text-[13px] md:text-xl flex items-center justify-center p-0 m-0 font-poppins ">
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






      
      <Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 flex flex-col  ">
            <div className=" w-full flex  flex-col items-center ">
              <Image src={"/passwordIcon.svg"} alt="password" width={45} height={45} />
              <h1 className="pt-[3px] text-xs font-poppins text-gray-600">Protected Channel </h1>
            </div>
           
            <div className="h-[30px] flex justify-center items-center ">
             
              <input
                    type={`password`}
                    placeholder={`${"Enter The Channel Password"}`}
                    className={`${`h-full pl-[10px]  border-[1px] border-black w-[65%] rounded-xs text-primary font-poppins  rounded-xs font-normal text-[11px] focus:outline-none ${isFocused ? " placeholder-transparent focus:outline-none  focus:ring-0 focus:border-primary" : "focus:outline-none placeholder:pl-0 placeholder:text-center  placeholder:font-normal  placeholder:text-gray-500 placeholder:text-[11px]"}`}`}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
            </div>
            
            <div className=" self-center w-[20%]  rounded-[20px] h-[30px] flex justify-center bg-channel-500 hover:bg-hover ">
              <button className= "text-xs font-normal text-primary font-poppins hover:text-white" >Confirm</button>
            </div>
            
          </div>
        </Modal.Body>
      </Modal>

    </>
  )
}
export default ChannelsList;