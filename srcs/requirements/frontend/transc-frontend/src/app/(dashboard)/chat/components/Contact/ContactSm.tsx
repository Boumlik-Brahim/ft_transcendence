"use client"

import Image from "next/image";
interface Props {
    id : number;
    name: string;
    profilePicturePath: string;
    unreadMessages: number;

}

function ContactSm({id,name, unreadMessages, profilePicturePath }: Props) {
    return (
        <div className="w-[90%]  h-[56px]  pl-[42px] mt-[10px] ml-[27px] flex items-center justify-between ">
            <div className="h-full w-[183px] flex items-center  ">
                <Image src={`/chatAvatars/${profilePicturePath}`} width={41} height={41} alt="avatar" className="w-[41px] h-[41px] rounded-full" />
                <div className="h-full max-w-[121px] pl-[25px] flex items-center text-white text-xs font-poppins font-semibold truncate ">
                    {name}
                </div>
            </div>
            <div className="w-[20px] h-[20px] bg-red-500 rounded-full mr-[11.5%] flex items-center justify-center">
                <span className="text-white text-xs font-poppins font-semibold">
                    {unreadMessages}
                </span>
            </div>
        </div>
    );
}
export default ContactSm;