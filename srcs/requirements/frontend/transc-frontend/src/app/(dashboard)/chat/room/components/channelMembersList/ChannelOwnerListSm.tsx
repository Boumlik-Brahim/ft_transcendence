"use client"

import Image from "next/image"
import { useDispatch, useSelector } from 'react-redux';
import { ShowChannelMembers, HideChannelMembers } from '@/app/store/reducer'
import { RootState } from '@/app/store/store';


function ChannelOwnerListSm() {
    const dispatch = useDispatch();
    const isShowChannelMembersOn = useSelector((state: RootState) => state.toggleShowChannelMembers);

    const handleShowChannelMembers = () => {
        dispatch(ShowChannelMembers());
    }
    return (
        <div className="w-full h-[20%] ">
            <div className="w-full h-[40%]  flex items-end justify-between px-[12%]">
                <div className="w-[75px] h-[23px] flex items-center justify-center  text-white text-[15px] font-poppins font-semibold underline uppercase">
                    Owner
                </div>
                <Image key={1} src={"/close_w.svg"} width={25} height={25} alt={"close"} className="md:w-[34px] md:h-[34px] cursor-pointer" onClick={handleShowChannelMembers} />
            </div>
            <div className="w-full h-[60%]  flex items-center justify-center">
                <div className="h-full w-[80%] flex ">
                    <div className="w-[80%] h-full flex items-center px-[27px]">
                        <Image src={"/chatAvatars/profile1.jpeg"} alt="delete channel" width={41} height={41} className="rounded-full" />
                        <div className="w-[130px] h-full flex items-center ml-[16px] text-white text-[15px] font-poppins font-medium truncate">
                            Bilal Ben Aouad
                        </div>
                    </div>
                    <div className="w-[20%] h-full  flex items-center ">
                        <Image src={"/trash.svg"} alt="delete channel" width={16} height={16} />
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center ">
                <span className="w-[75%] h-px bg-stone-300 " />
            </div>
        </div>
    )
}
export default ChannelOwnerListSm; 