import { useMediaQuery } from "@react-hook/media-query"
import { BiSearch } from 'react-icons/bi'
import { onlineFriendsData, Friend } from "../chat/tempData/onlineFriendsData"
import OnlineFriendsBox from "./OnlineFriendsBox"

import {  useSelector } from 'react-redux';
import { RootState } from '../../store/store';


export default function OnlineFriendsList() {
    const isLgScreen = useMediaQuery('(min-width: 1230px)');
    const currentPopUpStatus = useSelector((state: RootState) => state.togglePopUp);

    const onlineFriends = onlineFriendsData.map((onlineFriends: Friend) => {
        return (
            <OnlineFriendsBox
                id={onlineFriends.id}
                picture={onlineFriends.picture}
                user_name={onlineFriends.name}
                status={onlineFriends.online ? "bg-green-400" : "bg-orange-500"}

            />
        );
    });
    return (
        <>
            <div className={`${isLgScreen ? "bg-primary-900  w-[33%] h-[100%] flex flex-col items-center relative " : "hidden"} ${currentPopUpStatus.showPopUpCreateChannel ? "blur-sm " : ""}`}>
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
                <div className=" w-full h-[70vh] px-[7px] overflow-auto no-scrollbar pb-[10px]">

                    {onlineFriends}

                </div>
            </div>
        </>
    );
}
