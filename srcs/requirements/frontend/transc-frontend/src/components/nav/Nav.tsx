import React, { useState } from "react";


import {MdNotifications} from 'react-icons/md'

import {CgClose}  from "react-icons/cg";
import {FiMenu} from 'react-icons/fi'



export default function Nav({title, setIsOpen, isOpen}: {title :string,
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
    isOpen : boolean
} ){
   
    const [color, setColor] = useState("bg-primary-100");
    const toggleColor = () => {
        setIsOpen(!isOpen);
        if (color === "bg-primary-100")
            setColor("bg-primary-900");
        else
            setColor("bg-primary-100");
    };

    return(
<>
    <div className={`${isOpen ? "hidden" : "flex"} ${"w-screen h-[100px] flex items-center justify-between px-[27px] bg-primary-100"}`}>
        <div className=" flex items-center">
            <button
                className="flex flex-col   rounded justify-center items-center group lg:hidden "
                onClick={toggleColor}
            >
                < FiMenu className="text-primary-900 text-lg "/> 
            </button>
        </div>
        <p className="text-lg font-poppins font-normal text-primary-900">{title}</p>
        <MdNotifications className="text-[20px] text-primary-900"/>
    </div>

                    {/* this div gonna show up when the the toggle button is clicked */}

    <div className={`${isOpen ? "h-screen w-screen bg-primary-900 flex  flex-col items-center justify-center" : "hidden"}`}>
        <div className="w-screen h-[100px] flex items-center justify-center px-[27px] ">
            <div className="flex items-center ">
                <button
                    className="flex flex-col h-12 w-12  rounded justify-center items-center group lg:hidden "
                    onClick={toggleColor}
                >
                        < CgClose className="text-white text-5xl"/>
                </button>
            </div>
        </div>
        <div className="flex flex-col items-center justify-evenly  h-full w-[128px]">
            <div className="flex flex-col items-center gap-[8px] w-[128px]">
                    <div className="border-[1px] border-white w-full h-[60px] xs:h-[50px] xxs:h-[50px] flex justify-center items-center rounded-full bg-white">
                        <img src="/imgs/profile.png" alt="profile" className="w-[30px] h-[30px]"/>
                    </div>
                    <div className="border-[1px] border-white w-full h-[60px] xs:h-[50px] xxs:h-[50px] flex justify-center items-center rounded-full bg-white">
                        <img src="/imgs/leaderboard.png" alt="profile" className="w-[30px] h-[30px]"/>
                    </div>
                    <div className="border-[1px] border-white w-full h-[60px]  xs:h-[50px] xxs:h-[50px] flex justify-center items-center rounded-full bg-white">
                        <img src="/imgs/achievements.png" alt="profile" className="w-[30px] h-[30px]"/>
                    </div>
                    <div className="border-[1px] border-white w-full h-[60px] xs:h-[50px] xxs:h-[50px] flex justify-center items-center rounded-full bg-white">
                        <img src="/imgs/channels.png" alt="profile" className="w-[30px] h-[30px]"/>
                    </div>
                    <div className="border-[1px] border-white w-full h-[60px]  xs:h-[50px] xxs:h-[50px] flex justify-center items-center rounded-full bg-white">
                        <img src="/imgs/friends.png" alt="profile" className="w-[30px] h-[30px]"/>
                    </div>
                    <div className="border-[1px] border-white w-full h-[60px] xs:h-[50px] xxs:h-[50px]  flex justify-center items-center rounded-full bg-white">
                        <img src="/imgs/settings.png" alt="profile" className="w-[54px] h-[56px]"/>
                    </div>
                    <div className="border-[1px] border-white w-full h-[60px] xs:h-[50px] xxs:h-[50px] flex justify-center items-center rounded-full bg-white">
                        <img src="/imgs/play.png" alt="profile" className="w-[30px] h-[30px]"/>
                    </div>
            </div>
                   
            <div className="flex flex-col items-center w-[128px] ">
                <div className="border-[1px] border-white w-full h-[60px] xs:h-[50px] xxs:h-[50px] flex justify-center items-center rounded-full bg-white">
                            <img src="/imgs/logout.png" alt="profile" className="w-[30px] h-[30px]"/>
                </div>
            </div>
        </div>
    </div>      
    
</>
);
};
