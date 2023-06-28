
import ChannelBoxInfo from "./ChannelBoxInfo"
import ChannelBarInfo from "./ChannelBarInfo"
import { CgClose } from 'react-icons/cg'
import {BiSearch} from 'react-icons/bi'
import { MdNotifications } from 'react-icons/md'
import { channelsData, channelProps } from "../chat/tempData/channelsData"
import { onlineFriendsData, Friend } from "../chat/tempData/onlineFriendsData"

import InputText from "./InputText"
import OnlineFriendsBox from "./OnlineFriendsBox"


import { useDispatch, useSelector } from 'react-redux';
import { createChannelOff } from '../../store/reducer';
import { RootState } from '../../store/store';
import { useMediaQuery } from "@react-hook/media-query"

export  function Channels() {
    const channels = channelsData.map((channel: channelProps) => {
        return (
            <ChannelBoxInfo
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
    const onlineFriends = onlineFriendsData.map((onlineFriends : Friend) =>{
            return(
                <OnlineFriendsBox
                    id = {onlineFriends.id}
                    picture =  {onlineFriends.picture}
                    user_name = {onlineFriends.name}
                    status = {onlineFriends.online ? "text-green-400" :"text-red-400"}
                
                />
            );
    });
    const isCreateChannelOn = useSelector((state: RootState) => state.createChannelToggle);
    const dispatch = useDispatch();
    const handleCreateChannelToggleOff = () => {
        dispatch(createChannelOff());
    }
    const isMdScreen = useMediaQuery('(min-width: 768px)');
    const isLgScreen = useMediaQuery('(min-width: 1230px)');


return (
    <div className="w-full h-full lg:flex ">
        <div className="lg:w-[67%]">
            {/*----------------------- Create Channel Page : sm && md Devices ------------------------------ */}
            <div className={`${isCreateChannelOn.createChannelBtnToggled ? "w-screen h-screen bg-primary-900  flex flex-col " : "hidden"}`}>
                <div className="w-full h-[15%]  flex items-center justify-end pr-[15px] md:pr-[50px]">
                    < CgClose className="text-white text-6xl md:text-7xl" onClick={handleCreateChannelToggleOff} />
                </div>
                <div className="w-[65%] h-[30%]  self-center md:w-[30%] md:h-[25%]">
                    <div className="">
                        <h1 className="font-poppins font-bold text-base text-white text-center uppercase leading-6 tracking-wider mb-[37px]">
                            Private
                        </h1>
                        <InputText type="text" holder="name" />
                        <InputText type="password" holder="password" />
                        <button className="bg-white h-[37px] w-[81px] flex items-center justify-center font-poppins font-bold text-xs text-primary-900 leading-4 tracking-widest rounded-full ">
                            Create
                        </button>
                    </div>
                </div>
                <div className="w-[65%] h-[30%]  self-center mt-[15%] md:w-[30%] md:mt-[5%] ">
                    <h1 className="font-poppins font-bold text-base text-white text-center uppercase leading-6 tracking-wider mb-[37px]">
                        Public
                    </h1>
                    <InputText type="text" holder="name" />
                    <button className="bg-white h-[37px] w-[81px] flex items-center justify-center font-poppins font-bold text-xs text-primary-900 leading-4 tracking-widest rounded-full " >
                        Create
                    </button>
                </div>
            </div>

            {/*------------------------------------------------------------------------------------- */}

            {/*------------------------------------ Header------------------------------------------ */}
            <div className={`${(isMdScreen && !isCreateChannelOn.createChannelBtnToggled) ? "h-[10vh] flex items-center justify-between px-[25px]" : "hidden"}`}>
                <div className="font-poppins  text-lg font-bold  tracking-wider text-primary-900 ">
                    Channels
                </div>
                <div>
                    <MdNotifications className="text-[22px] text-primary-900 cursor-pointer	" />
                </div>
            </div>
            {/*------------------------------------------------------------------------------------- */}


            <div className={`${!isCreateChannelOn.createChannelBtnToggled ? "w-[full] h-[90vh]" : "hidden"}`}>
                <div className="  h-1/2 px-[20px] py-[10px]    md:px-[26px]">
                    <div className=" w-full h-full     md:px-[15px]">
                        <div className="h-[20%] w-full ">
                            <ChannelBarInfo
                                title="my channels"
                                btn_visibility=""
                            />
                        </div>
                        <div className="w-full h-[80%] overflow-auto py-[5px] px-[2px]   lg:h-[85%] ">
                            {channels}

                        </div>
                    </div>
                </div>
                <div className=" h-1/2 px-[20px] py-[10px]    md:px-[26px] ">
                    <div className=" w-full h-full    md:px-[15px] ">
                        <div className="h-[20%] w-full ">
                            <ChannelBarInfo
                                title="general"
                                btn_visibility="hidden"
                            />
                        </div>
                        <div className="w-full h-[70%] overflow-auto py-[5px] px-[2px]    lg:h-[80%] ">
                            {channels}

                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*-----------------------------------------Online Friends----------------------------------------------------------------------------------*/}
        <div className={`${isLgScreen ? "bg-primary-900 border-2 border-black w-[33%] h-[100%] flex flex-col items-center" : "hidden"}`}>
            <div className="w-[90%] h-[15%] flex flex-col justify-center pt-[15px]">
                <div className="border-[1px] border-white rounded-full flex items-center h-[34px] pl-[11px] ]">
                    <div className="pr-[10px]">
                        <BiSearch className="w-[20px] h-[20px] text-white " />
                    </div>
                    <input placeholder="Search" type="text" className=" bg-transparent text-xs tracking-wide text-white font-poppins 
                    focus:outline-none 
                    placeholder:font-poppins placeholder:font-base placeholder:text-white placeholder:text-xs placeholder:-translate-y-[1px]"
                    />
                </div>
                <hr className="border-t-1  border-gray-400 mt-[30px]" />
            </div>
            <div className=" w-[90%] h-[15%] flex items-center font-poppins font-bold text-xs text-white leading-6 tracking-wider">
                Online Friends
            </div>
            <div className=" w-full h-[70vh] px-[7px] overflow-auto pb-[10px]">

                {onlineFriends}

            </div>
        </div>

        {/*---------------------------------------------------------------------------------------------------------------------------------------------------*/}

    </div>

)
}






// <div className={`w-full h-full lg:flex  `}>
        //     <div className={`${isCreateChannelOn.createChannelBtnToggled ? "w-screen h-screen bg-primary-900  flex flex-col " : "hidden"}`}>
        //         <div className="w-full h-[15%]  flex items-center justify-end pr-[15px] md:pr-[50px]">
        //             < CgClose className="text-white text-6xl md:text-7xl" onClick={handleCreateChannelToggleOff} />
        //         </div>

        //         <div className="w-[65%] h-[30%]  self-center md:w-[30%] md:h-[25%]">
        //             <div className="">
        //                 <h1 className="font-poppins font-bold text-base text-white text-center uppercase leading-6 tracking-wider mb-[37px]">
        //                     Private
        //                 </h1>
        //                 <InputText type="text" holder="name" />
        //                 <InputText type="password" holder="password" />
        //                 <button className="bg-white h-[37px] w-[81px] flex items-center justify-center font-poppins font-bold text-xs text-primary-900 leading-4 tracking-widest rounded-full ">
        //                     Create
        //                 </button>
        //             </div>

        //         </div>
        //         <div className="w-[65%] h-[30%]  self-center mt-[15%] md:w-[30%] md:mt-[5%] ">
        //             <h1 className="font-poppins font-bold text-base text-white text-center uppercase leading-6 tracking-wider mb-[37px]">
        //                 Public
        //             </h1>
        //             <InputText type="text" holder="name" />
        //             <button className="bg-white h-[37px] w-[81px] flex items-center justify-center font-poppins font-bold text-xs text-primary-900 leading-4 tracking-widest rounded-full " >
        //                 Create
        //             </button>

        //         </div>
        //     </div>
        //     <div className={`${!isCreateChannelOn.createChannelBtnToggled ? " lg:w-[65%]" : "hidden"}`}>
        //         <div className={`${isMdScreen ? " bg-yellow-400 w-full  h-[10vh] lg:h-[15vh] flex items-center justify-between px-[4%]" : "hidden"}`}>
        //             <div className="font-poppins text-base text-primary-900 font-semibold  tracking-wider lg:text-md">
        //                 channel Name
        //             </div>
        //             <div>
        //                 <MdNotifications className="text-[20px] text-primary-900 " />
        //             </div>
        //         </div>

        //         <div className=" w-full h-[90vh] lg:h-[85vh] bg">
        //                 <ChannelBarInfo
        //                     title="My Channel"
        //                     btn_visibility=""
        //                 />
        //             <div className="w-full h-[50%]   pb-[10px] lg:h-[30%] lg:pb-0 ">
        //                 <div className="h-[70%] w-full px-[4%] overflow-auto     md:mt-[-60px] md:h-[80%] ">

        //                     {channels}

        //                 </div>
        //             </div>
        //                 <ChannelBarInfo
        //                     title="General"
        //                     btn_visibility="hidden"
        //                 />
        //             <div className=" w-full h-[50%]  lg:h-[30%] lg:pb-0 pb-[10px] ">
        //                 <div className="h-[70%]  w-full px-[4%] overflow-auto      md:mt-[-60px] md:h-[80%] lg:h-[100%] bg-green-300 ">

        //                     {channels}

        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div className={`${isMdScreen ? "border-2 border-black lg:w-[35%] bg-primary-900 flex flex-col items-center" : "hidden"}`}>
        //         <div className="w-[90%] h-[15vh] border-2 border-white flex flex-col items-center justify-center gap-[20px] pt-[26px]">
        //             <div className="h-[34px] border-[2px] border-white flex items-center  p-[5px] rounded-full w-full text-white font-poppins text-xs font-semibold">
        //                 <BiSearch className ="text-white text-xl mx-[5px] " />
        //                 <input placeholder="search " type="text" className=" bg-transparent focus:outline-none placeholder:text-white placeholder:font-poppins placeholder:text-xs  placeholder:-translate-y-[1px]"/>
        //             </div>
        //             <hr className={`border-t-2 border-white   w-full`} />
        //         </div>
        //         <div className="border-2 border-yellow-500 w-[90%] h-[85vh]">
        //             <h1 className="h-[15vh] border-2 border-green-900 pt-[50px]  font-poppins font-semibold text-xs tracking-wider text-white">Online Friends</h1>
        //             <div className="border-2 border-red-500 h-[77%] pt-[20px] overflow-auto">
        //                 <div className="text-white font-poppins font-xs mt-[10px]">
        //                     <div className="flex items-center justify-between pl-[10px]">
        //                         <div className="flex items-center">
        //                             <img src="imgs/profile.png" className="w-[40px] h-[40px] "/>
        //                             <div className="ml-[10px] tracking-wider">oussama ali</div>
        //                         </div>
        //                         <p className="mr-[15px]">icon</p>
        //                     </div>
        //                     <hr className={`border-t-1 border-light-900 mt-[15px] w-full`} />
        //                 </div>

                        



        //                 <div className="text-white font-poppins font-xs mt-[10px]">
        //                     <div className="flex items-center justify-between pl-[10px]">
        //                         <div className="flex items-center">
        //                             <img src="imgs/profile.png" className="w-[40px] h-[40px] "/>
        //                             <div className="ml-[10px] tracking-wider">Bilal Ben Aouad</div>
        //                         </div>
        //                         <p className="mr-[15px]">icon</p>
        //                     </div>
        //                     <hr className={`border-t-1 border-light-900 mt-[15px] w-full`} />
        //                 </div>
        //                 <div className="text-white font-poppins font-xs mt-[10px]">
        //                     <div className="flex items-center justify-between pl-[10px]">
        //                         <div className="flex items-center">
        //                             <img src="imgs/profile.png" className="w-[40px] h-[40px] "/>
        //                             <div className="ml-[10px] tracking-wider">Bilal Ben Aouad</div>
        //                         </div>
        //                         <p className="mr-[15px]">icon</p>
        //                     </div>
        //                     <hr className={`border-t-1 border-light-900 mt-[15px] w-full`} />
        //                 </div>
        //                 <div className="text-white font-poppins font-xs mt-[10px]">
        //                     <div className="flex items-center justify-between pl-[10px]">
        //                         <div className="flex items-center">
        //                             <img src="imgs/profile.png" className="w-[40px] h-[40px] "/>
        //                             <div className="ml-[10px] tracking-wider">Bilal Ben Aouad</div>
        //                         </div>
        //                         <p className="mr-[15px]">icon</p>
        //                     </div>
        //                     <hr className={`border-t-1 border-light-900 mt-[15px] w-full`} />
        //                 </div>
        //                 <div className="text-white font-poppins font-xs mt-[10px]">
        //                     <div className="flex items-center justify-between pl-[10px]">
        //                         <div className="flex items-center">
        //                             <img src="imgs/profile.png" className="w-[40px] h-[40px] "/>
        //                             <div className="ml-[10px] tracking-wider">Bilal Ben Aouad</div>
        //                         </div>
        //                         <p className="mr-[15px]">icon</p>
        //                     </div>
        //                     <hr className={`border-t-1 border-light-900 mt-[15px] w-full`} />
        //                 </div>
        //                 <div className="text-white font-poppins font-xs mt-[10px]">
        //                     <div className="flex items-center justify-between pl-[10px]">
        //                         <div className="flex items-center">
        //                             <img src="imgs/profile.png" className="w-[40px] h-[40px] "/>
        //                             <div className="ml-[10px] tracking-wider">Bilal Ben Aouad</div>
        //                         </div>
        //                         <p className="mr-[15px]">icon</p>
        //                     </div>
        //                     <hr className={`border-t-1 border-light-900 mt-[15px] w-full`} />
        //                 </div>
        //                 <div className="text-white font-poppins font-xs mt-[10px]">
        //                     <div className="flex items-center justify-between pl-[10px]">
        //                         <div className="flex items-center">
        //                             <img src="imgs/profile.png" className="w-[40px] h-[40px] "/>
        //                             <div className="ml-[10px] tracking-wider">Bilal Ben Aouad</div>
        //                         </div>
        //                         <p className="mr-[15px]">icon</p>
        //                     </div>
        //                     <hr className={`border-t-1 border-light-900 mt-[15px] w-full`} />
        //                 </div>
        //                 <div className="text-white font-poppins font-xs mt-[10px]">
        //                     <div className="flex items-center justify-between pl-[10px]">
        //                         <div className="flex items-center">
        //                             <img src="imgs/profile.png" className="w-[40px] h-[40px] "/>
        //                             <div className="ml-[10px] tracking-wider">Bilal Ben Aouad</div>
        //                         </div>
        //                         <p className="mr-[15px]">icon</p>
        //                     </div>
        //                     <hr className={`border-t-1 border-light-900 mt-[15px] w-full`} />
        //                 </div>
        //                 <div className="text-white font-poppins font-xs mt-[10px]">
        //                     <div className="flex items-center justify-between pl-[10px]">
        //                         <div className="flex items-center">
        //                             <img src="imgs/profile.png" className="w-[40px] h-[40px] "/>
        //                             <div className="ml-[10px] tracking-wider">Bilal Ben Aouad</div>
        //                         </div>
        //                         <p className="mr-[15px]">icon</p>
        //                     </div>
        //                     <hr className={`border-t-1 border-light-900 mt-[15px] w-full`} />
        //                 </div>

        //             </div>
        //         </div>
        //     </div>
        // </div>