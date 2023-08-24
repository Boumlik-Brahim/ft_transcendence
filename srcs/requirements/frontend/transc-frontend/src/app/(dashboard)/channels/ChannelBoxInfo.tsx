import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios from "axios";
import { current } from "@reduxjs/toolkit";
import Link from "next/link";
import Image from "next/image"

import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { Socket, io } from "socket.io-client";
import Cookies from 'universal-cookie';
import { redirect, useRouter } from 'next/navigation'
import {socket} from   './page'

interface ChannelProps {
    id: string;
    channel_name: string;
    channel_owner: string;
    channel_members: number;
    channel_mode: string;
}

interface Owner {
    id: string
    name: string
    email: string
    IntraId: string
    Avatar: string
    status: string
    created_at: string
    updated_at: string
}


function ChannelBoxInfo({ id, channel_name, channel_owner, channel_members, channel_mode }: ChannelProps) {
    let channelTypeStyling = "";
    (channel_mode === "PUBLIC" || channel_mode === "PRIVATE")
        ?
        channelTypeStyling = 'bg-channel-800 text-primary'
        :
        channelTypeStyling = "bg-channel-100 text-channel-300"


    // ^ ---------------------------------  fetch channel owner user ------------------------------
    const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.currentUserId);
    const cookies = new Cookies();
    const userIdFromCookie = cookies.get('id');


    const [channelOwnerUser, setChannelOwnerUser] = useState("");
    //* useEffect to fetch User data 
    useEffect(() => {
        async function fetchOwner() {
            try {
                const response = await axios.get<Owner>(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${channel_owner}`);
                setChannelOwnerUser(response.data.name);
            } catch (error) {
                console.error(error);
            }
        }
        fetchOwner();
    }, []);
    //* check if the current user is a member of the channel
    interface MemberChannelInfo {
        id: string,
        userId: string,
        channelId: string,
        role: string,
    }

    const [existingStatus, setExistingStatus] = useState<MemberChannelInfo>({
        id: '',
        userId: '',
        channelId: '',
        role: '',
    }
    )
    useEffect(() => {
        async function fetchMemberExistence() {
            try {
                const response =  await axios.get<MemberChannelInfo>(`${process.env.NEXT_PUBLIC_APP_URI}:3000/channel/${id}/member/${userIdFromCookie}`);
                setExistingStatus(response.data);
            } catch (error) {
                alert(error);
            }
        }
        fetchMemberExistence();
    }, []);

    !existingStatus ? channelTypeStyling = "bg-channel-700  text-primary" : channelTypeStyling

    const [isProtected, setIsProtected] = useState(false);
    const [accessPermission, setAccessPermission] = useState(false)



    useEffect(() => {
        channel_mode === "PROTECTED" ? setAccessPermission(false)  : setAccessPermission(true);
    }, [])
    //* ----------- join channel ------------------
    




   
    //   const cookies = new Cookies();
    //   const socket = io("ws://localhost:3000", { auth: { userId: cookies.get('id') } });

    const handleJoinPbPvChannel = ( ) =>{
        socket.emit("joinChannel", {
            userId: userIdFromCookie,
            channelId: id,
            channelPasword: '',
        })  
        
        socket.on("joinedSuccessfully",()=>{
                router.push(`/channels/${id}`)
        })

        socket.on("error", (data) => {
            alert(data);
        })
    }
    
    const [redirectionUrl, setRedirectionUrl] = useState("")

    const clickHandler = () => {
        !accessPermission
         ?
         props.setOpenModal('form-elements')
        :
        handleJoinPbPvChannel();

    }
    // ^ ------------------------------------------------------------------------------------------
    //* ------------------------------popUp  password for private channel -------------------------


    const [openModal, setOpenModal] = useState<string | undefined>();
    const [password, setPassword] = useState("");
    const props = { openModal, setOpenModal, password, setPassword: setPassword };
    const router = useRouter()


    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleBlur = () => {
        setIsFocused(false);
    };


    function handleInputPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        console.log(value)
        value && setPassword(value);
      }
;


    const handleConfirm = () => {
        socket.emit("joinChannel", {
            userId: userIdFromCookie,
            channelId: id,
            channelPasword: password,
        })  
        
        socket.on("joinedSuccessfully",()=>{
                router.push(`/channels/${id}`)
        })

        socket.on("error", (data) => {
            alert(data);
        })      
    }


    //* -------------------------------------------------------------------------------------------

    return (
        <>

            <div className="transform transition-transform duration-1000 ease-in-out animate-show-up  w-full h-[46px] border-2 border-primary rounded-full text-white flex items-center justify-between pl-[19px] pr-[11px] mb-[9px] cursor-pointer   md:h-[78px]     lg:h-[70px] ">
                <div className=" w-[80px] h-[25px]  flex flex-col justify-center md:w-[100px] md:h-[35px] lg:h-[40px] ">
                    <div className="w-full text-[9px] text-primary font-bold leading-tight tracking-wider truncate   md:text-[12px] lg:w-[120px] lg:text-xs  ">
                        {channel_name}
                    </div>
                    <div className=" text-left text-[7px] text-primary  pl-[2px] font-normal leading-tight tracking-wider truncate  md:text-[9px] ">
                        {"🧑🏻‍💻  " + channelOwnerUser}
                    </div>
                </div>
                <div className="w-[80px] h-[25px]  text-[9px] text-primary font-bold leading-tight tracking-wider flex justify-center items-center   md:w-[100px] md:h-[35px] md:text-[12px] lg:w-[120px] lg:h-[40px] ">
                    <div className="pr-[3px] truncate">
                        {channel_members}
                    </div>
                    <span className="uppercase truncate text-primary">
                        Member
                    </span>
                </div>
                {
                    accessPermission
                    ?
                    <div className={`w-[65px] h-[25px]   ${channelTypeStyling} flex justify-center items-center rounded-full  md:w-[84px] md:h-[35px]`} onClick={clickHandler}>
                        <div className={`${`text-[8px] font-bold leading-tight tracking-wider uppercase md:text-[11px]`}`}>
                            {!existingStatus ? "join" : channel_mode}
                        </div>
                    </div>
                    :
                    <div className={`w-[65px] h-[25px]   ${channelTypeStyling} flex justify-center items-center rounded-full  md:w-[84px] md:h-[35px]`} onClick={clickHandler}>
                        <div className={`${`text-[8px] font-bold leading-tight tracking-wider uppercase md:text-[11px]`}`}>
                            {!existingStatus ? "join" : channel_mode}
                        </div>
                    </div>
                    }
            </div>



            <Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6 flex flex-col ">
                        <div className=" w-full flex  flex-col items-center">
                            <Image src={"/passwordIcon.svg"} alt="password" width={45} height={45} />
                            <h1 className="pt-[3px] text-xs font-poppins text-gray-600">Protected Channel </h1>
                        </div>

                        <div className="h-[30px] flex justify-center items-center ">

                            <input
                                type={`password`}
                                placeholder={`${"Enter The Channel Password"}`}
                                className={`${`h-full pl-[10px]  border-[1px] rounded-[5px] border-black w-[65%] rounded-xs text-primary font-poppins  rounded-xs font-normal text-[11px] focus:outline-none ${isFocused ? " placeholder-transparent focus:outline-none  focus:ring-0 focus:border-primary" : "focus:outline-none placeholder:pl-0 placeholder:text-center  placeholder:font-normal  placeholder:text-gray-600 placeholder:text-[11px]"}`}`}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onChange={handleInputPasswordChange}
                            />
                        </div>

                        <div className=" self-center w-[20%]  rounded-[20px] h-[30px] flex justify-center bg-channel-500 hover:bg-hover " onClick={handleConfirm}>
                                <button className="text-xs font-normal text-primary font-poppins hover:text-white">
                                    Confirm 
                                </button>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>



        </>
    );
};

export default ChannelBoxInfo;