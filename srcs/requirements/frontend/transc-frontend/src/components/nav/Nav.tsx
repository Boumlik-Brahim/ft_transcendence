import React, { useState } from "react";


import { MdNotifications } from 'react-icons/md'

import { CgClose } from "react-icons/cg";
import { FiMenu } from 'react-icons/fi'

import { useMediaQuery } from '@react-hook/media-query';


import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function Nav({ title, setIsOpen, isOpen }: {
    title: string,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean
}) {
    const isMdScreen = useMediaQuery('(min-width: 768px)');
    const isLgScreen = useMediaQuery('(min-width: 1230px)');
    // const isShort = useMediaQuery('min-height : 637px');
    const currentState = useSelector((state: RootState) => state.toggle.isShoFriendListToggled) as boolean;
    const isCreateChannelOn = useSelector((state: RootState) => state.createChannelToggle);
    const [color, setColor] = useState("bg-primary-100");
    const toggleColor = () => {
        setIsOpen(!isOpen);
        if (color === "bg-primary-100")
            setColor("bg-primary-900");
        else
            setColor("bg-primary-100");
    };
    if (isMdScreen)
        setIsOpen(false);

    return (
        <>
            <div className={`${" md:col-span-2 lg:col-span-3 2xl:col-span-3 "}}`}>
                <div className={`${(isMdScreen || isOpen || currentState || isCreateChannelOn.createChannelBtnToggled) ? "hidden" : "flex md:grid"} ${"w-screen h-[10vh] items-center justify-between px-[27px] bg-primary-100       md:w-full md:h-full  md:col-span-2 flex md:bg-primary-900  "}`}>
                    <div className=" flex items-center">
                        <button
                            className="flex flex-col rounded justify-center items-center group  lg:hidden "
                            onClick={toggleColor}
                        >
                            < FiMenu className="text-primary-900 text-lg " />
                        </button>
                    </div>
                    <p className="text-lg font-poppins font-normal text-primary-900 ">{title}</p>
                    <MdNotifications className="text-[20px] text-primary-900 " />
                </div>



                {/* this div gonna show up when the the toggle button is clicked */}

                <div className={`${(isMdScreen || isOpen) ? " h-screen w-screen bg-primary-900 flex justify-evenly flex-col items-center       md:h-[100vh] md:w-full  lg:h-screen" : "hidden"} `}>
                    <div className="w-screen h-[100px] flex items-center justify-center px-[27px]      md:hidden">
                        <div className="flex items-center ">
                            <button
                                className="flex flex-col h-12 w-12  rounded justify-center items-center group    md:hidden lg:hidden "
                                onClick={toggleColor}
                            >
                                < CgClose className="text-white text-5xl " />
                            </button>
                        </div>

                    </div>
                    <div className={`flex flex-col items-center justify-evenly gap-[10%] self-center h-fit w-[128px]      md:justify-start md:h-full      lg:justify-between lg:w-[70%] lg:h-full      xl:w-[100%]`}>
                        <div className={`${isMdScreen ? "text-[20px] text-white font-press leading-5      md:text-center md:mt-[61px] md:h-[50px] md:w-full        lg:w-[85px] lg:h-[50px]" : "hidden"}`}>
                            PING PONG
                        </div> {/* md:mt-[61px] */}
                        <div className="flex flex-col items-center gap-[8px] w-[128px] h-full overflow-auto no-scrollbar                md:h-full md:justify-center  md:relative  md:pt-[30px]       lg:w-full lg:h-[80%] lg:justify-start lg:flex-1 lg:gap-[15px]  ">

                            <div
                                className={`${!isLgScreen ? "border-[1px] border-white w-full h-[60px] flex justify-center items-center rounded-full bg-white xs:h-[50px] xxs:h-[50px]    md:bg-transparent md:border-none   " : "hidden"}`}
                            >
                                <img src="/imgs/profile.png" alt="profile" className="w-[30px] h-[30px]     md:w-[40px] md:h-[40px]     lg:w-[30px] lg:h-[30px] " />

                            </div>
                            <div className={`${isLgScreen ? "w-[100%] h-[50px] flex items-center pl-[32px] rounded-full bg-white        lg:w-[100%] xl:w-[280px]" : "hidden"}`}>
                                <img src="/imgs/profile.png" alt="profile" className="w-[30px] h-[30px] mr-[14px]" />
                                <p className="text-black pl-[10px] font-poppins font-semibold">Profile</p>
                            </div>
                            <div className={`${!isLgScreen ? "border-[1px] border-white w-full h-[60px] flex justify-center items-center rounded-full bg-white xs:h-[50px] xxs:h-[50px]   md:bg-transparent md:border-none" : "hidden"}`}>
                                <img src="/imgs/leaderboard.png" alt="profile" className="w-[30px] h-[30px]  md:w-[40px] md:h-[40px]" />
                            </div>
                            <div className={`${isLgScreen ? "w-[230px] h-[50px] flex items-center pl-[32px] rounded-full bg-white        lg:w-[100%] xl:w-[280px]" : "hidden"}`}>
                                <img src="/imgs/leaderboard.png" alt="Leaderboard" className="w-[30px] h-[30px] mr-[14px]" />
                                <p className="text-secondary-400 pl-[10px] font-poppins font-semibold">Leaderboard</p>
                            </div>
                            <div className={`${!isLgScreen ? "border-[1px] border-white w-full h-[60px]  flex justify-center items-center rounded-full bg-white     xs:h-[50px] xxs:h-[50px]      md:border-none md:bg-transparent" : "hidden"}`}>
                                <img src="/imgs/achievements.png" alt="profile" className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]" />
                            </div>
                            <div className={`${isLgScreen ? "w-[230px] h-[50px] flex items-center pl-[32px] rounded-full bg-white         lg:w-[100%] xl:w-[280px]" : "hidden"}`}>
                                <img src="/imgs/achievements.png" alt="Achievements" className="w-[30px] h-[30px] mr-[14px]" />
                                <p className="text-secondary-800 pl-[10px] font-poppins font-semibold">Achievements</p>
                            </div>
                            <div className={`${!isLgScreen ? "border-[1px]  border-white w-full h-[60px] flex justify-center items-center rounded-full bg-white     xs:h-[50px] xxs:h-[50px]      md:bg-transparent md:border-none" : "hidden"}`}>
                                <img src="/imgs/channels.png" alt="profile" className="w-[30px] h-[30px]   md:w-[40px] md:h-[40px]" />
                            </div>
                            <div className={`${isLgScreen ? "w-[230px] h-[50px] flex items-center pl-[32px] rounded-full bg-white      lg:w-[100%] xl:w-[280px]" : "hidden"}`}>
                                <img src="/imgs/channels.png" alt="Channels" className="w-[30px] h-[30px] mr-[14px] " />
                                <p className="text-secondary-700 pl-[10px] font-poppins font-semibold">Channels</p>
                            </div>
                            <div className={`${!isLgScreen ? "border-[1px] border-white w-full h-[60px] flex justify-center items-center rounded-full bg-white      xs:h-[50px] xxs:h-[50px]      md:bg-transparent md:border-none" : "hidden"}`}>
                                <img src="/imgs/friends.png" alt="profile" className="w-[30px] h-[30px]    md:w-[40px] md:h-[40px]" />
                            </div>
                            <div className={`${isLgScreen ? "w-[230px] h-[50px] flex items-center pl-[32px] rounded-full bg-white        lg:w-[100%] xl:w-[280px]" : "hidden"}`}>
                                <img src="/imgs/friends.png" alt="Friends" className="w-[30px] h-[30px] mr-[14px]" />
                                <p className="text-secondary-200 pl-[10px] font-poppins font-semibold">Friends</p>
                            </div>
                            <div className={`${!isLgScreen ? "border-[1px] border-white w-full h-[60px] flex justify-center items-center rounded-full bg-white    xs:h-[50px] xxs:h-[50px]      md:bg-transparent md:border-none" : " hidden"}`}>
                                <img src="/imgs/settings2.png" alt="profile" className="w-[30px] h-[30px] " />
                            </div>
                            <div className={`${isLgScreen ? "w-[230px] h-[50px] flex items-center pl-[20px] rounded-full bg-white        lg:w-[100%] xl:w-[280px]" : "hidden"}`}>
                                <img src="/imgs/settings2.png" alt="Settings" className="w-[30px] h-[30px] mr-[14px] md:ml-[10px]" />
                                <p className="text-secondary-100 pl-[10px] font-poppins font-semibold">Settings</p>
                            </div>
                            <div className={`${!isLgScreen ? "border-[1px] border-white w-full h-[60px] flex justify-center items-center rounded-full bg-white   xs:h-[50px] xxs:h-[50px]      md:bg-transparent md:border-none" : "hidden"}`}>
                                <img src="/imgs/play.png" alt="profile" className="w-[30px] h-[30px]    md:w-[40px] md:h-[40px]" />
                            </div>
                            <div className={`${isLgScreen ? "w-[230px] h-[50px] flex items-center ] pl-[32px] rounded-full bg-white      lg:w-[100%] xl:w-[280px]" : "hidden"}`}>
                                <img src="/imgs/play.png" alt="Play" className="w-[30px] h-[30px] mr-[14px] " />
                                <p className="text-primary-900 pl-[10px] font-poppins font-semibold">Play</p>
                            </div>
                        </div>
                        <div className=" w-full flex justify-center ">
                            <div className={`${!isLgScreen ? `border-[1px] border-white w-full h-[50px] flex justify-center items-center rounded-full bg-white     xs:h-[50px] xxs:h-[50px]        md:pb-[40px] md:bg-transparent md:border-none ` : "hidden"}`}>
                                <img src="/imgs/logout.png" alt="profile" className="w-[25px] h-[25px]  md:w-[40px] md:h-[40px]" />
                            </div>
                            <div className={`${isLgScreen ? `w-full h-[50px] flex items-center justify-center rounded-full bg-white      xl:w-[270px] mb-[49px]      lg:mt-[10px]` : "hidden"}`}>
                                <img src="/imgs/logout.png" alt="Logout" className="w-[30px] h-[30px] mr-[14px]" />
                                <p className="text-secondary-600 pl-[10px] font-poppins font-semibold">Logout</p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
}
