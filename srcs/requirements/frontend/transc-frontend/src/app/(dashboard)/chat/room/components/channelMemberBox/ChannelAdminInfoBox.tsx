"use client"

import Image from "next/image"


function ChannelAdminInfoBox() {
    return (
        <>
            <div className="w-full h-[40%] flex ">

                <div className="w-[80%] h-full flex items-center px-[20px]">
                    <Image src={"/chatAvatars/profile1.jpeg"} alt="delete channel" width={41} height={41} className="rounded-full" />
                    <div className="w-[130px] h-full flex items-center ml-[16px] text-white text-[15px] font-poppins font-medium truncate">
                        Bilal Ben Aouad
                    </div>
                </div>
                <div className="w-[20%] h-full  flex items-center pl-[3px]">
                    <Image src={"/morecircle.svg"} alt="delete_channel" width={16} height={16} className="mr-[10px]" />
                    <Image src={"/microphoneslash.svg"} alt="delete_channel" width={16} height={16} className=" mr-[10px]" />
                    <Image src={"/ban.svg"} alt="delete_channel" width={15} height={15} className="hidden" />

                </div>
            </div>
        </>
    )
}
export default ChannelAdminInfoBox;
