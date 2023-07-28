"use client"

import Image from "next/image"

function LeaveChannel() {
    return (
        <div className="w-full h-[15%] flex items-center justify-center">
            <button className="w-[70%] h-[50px] bg-white rounded-full flex items-center ">
                <div className="pl-[16px] mr-[32%] flex items-center">
                    <Image src={"/vector-1.svg"} width={14} height={8} alt={"leave"} className="absolute" />
                    <Image src={"/vector.svg"} width={14} height={21} alt={"leave"} className="relative left-[50%]" />

                </div>
                <div className="text-leave text-[17px] font-poppins font-medium uppercase">
                    Leave
                </div>
            </button>
        </div>
    )
}
export default LeaveChannel;
