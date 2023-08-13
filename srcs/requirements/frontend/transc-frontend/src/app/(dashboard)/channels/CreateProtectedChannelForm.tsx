"use client"
import Input from "./Input";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { use, useEffect, useState } from "react";
import { setCurrentUser, setRefreshChannelsOn, createChannelPopUpOff } from '@/app/store/reducer';
import { io } from "socket.io-client";


interface Channel {
    channelName: string,
    channelType: string,
    channelPassword: string
}
interface Channels {
    channelName: string
    channelType: string
    channelPassword: string
    channelOwnerId: string
}



function CreateProtectedChannelForm() {

    const [channelData, setChannelData] = useState<Channel>({
        channelName: '',
        channelType: '',
        channelPassword: ''
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setEmptyChannelPasswordError(false)
        setChannelData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    useEffect(() => {
        setChannelData((prevData) => ({
            ...prevData,
            channelType: "PROTECTED"
        }))
    }, [])

    const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.currentUserId);
    const refreshStatus = useSelector((state: RootState) => state.refreshFetchChannels.refreshFetchChannels);
    const socketTest = io("ws://localhost:3000");
    const [emptyChannelNameError, setEmptyChannelNameError] = useState(false);
    const [emptyChannelPasswordError, setEmptyChannelPasswordError] = useState(false);
    
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        if (!channelData.channelName) {
            setEmptyChannelNameError(true)
            return;
        }
        if (!channelData.channelPassword) {
            setEmptyChannelPasswordError(true)
            return;
        }
        // & sending the message in the socket 
        socketTest.emit("createChannel", {
            channelName: channelData.channelName,
            channelType: channelData.channelType,
            channelPassword: channelData.channelPassword,
            channelOwnerId: currentUserId,
        });
        setChannelData({ ...channelData, channelName: '' });
        setChannelData({ ...channelData, channelPassword: '' });
        socketTest.on("refrechCreateChannel", (data: any) => {
            console.log("results ------- > ");
            dispatch(createChannelPopUpOff());
            dispatch(setRefreshChannelsOn());
        });
    }


    return (
        <>
            <h1 className="font-poppins font-bold text-base text-white  uppercase leading-6 tracking-wider mb-[25px] md:text-[25px] ">
                Protected
            </h1>

            <input placeholder={`${!emptyChannelNameError ? "Channel Name" : "Please Enter A Name For The Channel "}`} type={`text`} className={`${`w-full h-[37px] text-primary text-xs tracking-wide font-poppins font-normal rounded-[3px] mb-[15px] pl-[22px]  placeholder:font-poppins placeholder:font-normal ${emptyChannelNameError ? "placeholder:text-red-500 outline outline-[2px] outline-red-500" : "focus:outline-none placeholder:text-date"}  placeholder:text-xs  md:h-[45px]`}`}
                name="channelName" value={channelData.channelName} onChange={handleChange}
            />
            <input placeholder={`${!emptyChannelPasswordError ? "Channel Password" : "Please Set A Password To The Channel "}`} type={`password`} className={`${`w-full h-[37px] text-primary text-xs tracking-wide font-poppins font-normal rounded-[3px] mb-[15px] pl-[22px]  placeholder:font-poppins placeholder:font-normal ${emptyChannelPasswordError ? "placeholder:text-red-500 outline outline-[2px] outline-red-500" : "focus:outline-none placeholder:text-date"}  placeholder:text-xs  md:h-[45px]`}`}
                name="channelPassword" value={channelData.channelPassword} onChange={handleChange}
            />

            <button className="w-full text-white font-poppins font-semibold text-xs  leading-4 tracking-widest rounded-full  h-[37px] btn-background md:h-[43px] md:border-2 lg:h-[55px] lg:text-[14px]" onClick={handleSubmit}>
                Create
            </button>
        </>
    );
}
export default CreateProtectedChannelForm;