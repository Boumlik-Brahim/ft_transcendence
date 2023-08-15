"use client"
import Input from "./Input";
import { useDispatch, useSelector } from 'react-redux'; 
import { prvChannelOn, prvChannelOff } from '../../store/reducer';
import { RootState } from '../../store/store';
import { constrainedMemory } from "process";
import { use, useEffect, useState } from "react";
import axios from "axios";
import {setCurrentUser,setRefreshChannelsOn,createChannelPopUpOff } from '@/app/store/reducer';
import { io } from "socket.io-client";
import {socket} from './page'

function CreatePrvPbcChannel() {
    const isPrivateChannelOn = useSelector((state: RootState) => state.togglePrivate);
    const dispatch = useDispatch();
    const handleClick = () => {
            dispatch(prvChannelOn())
    }
    const [channelCreationType, setChannelCreationType] = useState("");
    useEffect(() => {
        isPrivateChannelOn.privateToggled
        ?
        setChannelCreationType("Private")
        :
        setChannelCreationType("Public")

    },[isPrivateChannelOn.privateToggled])

//^ -------------------------- creating channel : (post) ------------------------------------

interface Channel{
    channelName: string,
    channelType: string,
    channelPassword: string
}
interface Channels{
  channelName: string
  channelType: string
  channelPassword: string
  channelOwnerId: string
}
    const [channelData, setChannelData] = useState<Channel>({
        channelName: '',
        channelType: '',
        channelPassword:''
    });
    const [channels, setChannels] = useState<Channels>()

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setEmptyChannelNameError(false)
        setChannelData((prevData) => ({
          ...prevData,
          [name]: value
        })); 
      }
      useEffect(()=>{
        isPrivateChannelOn.privateToggled ? 
        setChannelData((prevData) => ({
            ...prevData,
            channelType : "PRIVATE"
          }))
          :
          setChannelData((prevData) => ({
            ...prevData,
            channelType : "PUBLIC"
          }))
    },[ isPrivateChannelOn.privateToggled])
    
    const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.currentUserId);
    const refreshStatus = useSelector((state: RootState) => state.refreshFetchChannels.refreshFetchChannels);
    // const socketTest= io("ws://localhost:3000");

    const [emptyChannelNameError, setEmptyChannelNameError] = useState(false);
const handleSubmit = async () => {
    if (!channelData.channelName) {
        setEmptyChannelNameError(true)
        return;
    }
     // & sending the message in the socket 
     socket.emit("createChannel", {
        channelName: channelData.channelName,
        channelType: channelData.channelType,
        channelPassword: channelData.channelPassword,
        channelOwnerId:currentUserId,
    } );
    setChannelData({ ...channelData, channelName: '' });
    socket.on("refrechCreateChannel", (data: any) => {
        console.log("results ------- > ");
        dispatch(createChannelPopUpOff());
        dispatch(setRefreshChannelsOn());
    });
  }
//^ --------------------------------------------------------------------------------------

    return (
        <>
            <div className="w-full h-[20%] flex items-center justify-between mb-[15px] ">
                <div>
                    <h1 className="font-poppins font-bold text-base text-white  uppercase leading-6 tracking-wider md:text-[25px]">
                       {
                        isPrivateChannelOn.privateToggled 
                        ? 
                        "Private"
                        :
                        "Public"
                        }
                    </h1>
                </div>
                <div className=" flex ">
                    <span className="text-[12px] text-white font-poppins font-light pr-[10px] md:pr-[13px] tracking-wider ">
                        private
                    </span>
                    <label
                        htmlFor="toogleA"
                        className="flex items-center cursor-pointer"
                        
                    >
                        <div className="relative">
                            <input id="toogleA" type="checkbox" className="sr-only" />
                            <div className="w-[34px] h-[14px] bg-white rounded-full shadow-inner "></div>
                            <div className="dot absolute w-[22px] h-[22px] bg-channel-500 rounded-full shadow -left-1 -top-[4px] transition " onClick={handleClick}></div>
                        </div>
                    </label>
                </div>
            </div>
            {/* <Input
                holder="name"
                type="text"
                name="channelName" 
                label="Channel Name" 
                value={channelData.channelName} 
                onChange={handleChange}
            /> */}
             <input placeholder={`${!emptyChannelNameError ? "Channel Name" : "Please Enter A Name For The Channel "}`} type={`text`} className={`${`w-full h-[37px] text-primary text-xs tracking-wide font-poppins font-normal rounded-[3px] mb-[15px] pl-[22px]  placeholder:font-poppins placeholder:font-normal ${emptyChannelNameError ? "placeholder:text-red-500 outline outline-[2px] outline-red-500" : "focus:outline-none placeholder:text-date"}  placeholder:text-xs  md:h-[45px]`}`}
                name="channelName" value={channelData.channelName} onChange={handleChange}
            />
            <button className="w-full text-white font-poppins font-semibold text-xs  leading-4 tracking-widest rounded-full  h-[37px] btn-background md:h-[43px] md:border-2 lg:h-[55px] lg:text-[14px]" onClick={handleSubmit}>
                Create
            </button>
            
        </>
);
}
export default CreatePrvPbcChannel;