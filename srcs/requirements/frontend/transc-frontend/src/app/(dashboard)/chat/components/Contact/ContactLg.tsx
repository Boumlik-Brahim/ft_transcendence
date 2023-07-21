"use client"

import Image from "next/image";
interface Props {
    id: string;
    name: string;
    profilePicturePath: string;
    unreadMessages: number;
    activeButtonId: string | null;
    onClick: (buttonId: string) => void;

}

function ContactLg({ id, name, unreadMessages, profilePicturePath,activeButtonId, onClick }: Props) {
    const isActive = activeButtonId === id;
    const handleClick = () => {
        onClick(id);
      };
    return (
        <div className={`${"w-full h-[56px]  flex items-center justify-between  mb-[10px] cursor-pointer"} ${isActive ? "bg-white   rounded-r-full":"bg-transparent" }`} onClick={handleClick}>
            <div className="w-[80%] h-full pl-[28px] flex items-center">
                <Image src={`${profilePicturePath}`} alt="profile" width={41} height={41} className="rounded-full w-[41px] h-[41px] bg-center	bg-cover" />
                <div className="w-[130px] h-full  ml-[15px] flex items-center truncate">
                    <span className={`${" text-[15px] font-poppins font-medium"}  ${isActive ? "text-primary":"text-white" }`}>
                       {name}
                    </span>
                </div>
            </div>
            <div className="w-[20%] h-full flex items-center justify-center">
                <div className="w-[23px] h-[23px] bg-red-500 rounded-full flex justify-center items-center  text-white text-xs font-medium">
                    {unreadMessages}
                </div>
            </div>
        </div>
    );
}
export default ContactLg;