"use client"

import Image from "next/image";

interface Props {
    id: number;
    profilePicturePath: string;
    unreadMessages: number;
    activeButtonId: number | null;
    onClick: (buttonId: number) => void;

}

function ContactMd({ id, unreadMessages, profilePicturePath,activeButtonId, onClick }: Props) {
    const isActive = activeButtonId === id;
    const handleClick = () => {
        onClick(id);
      };
    return (
        
                <div className={`${"w-full h-[93px]  flex items-center justify-center cursor-pointer"} ${isActive ? "bg-white rounded-r-full":"bg-transparent" } `} onClick={handleClick}>
                    <div className="w-[65px] h-[65px] relative">
                        <Image src={`${profilePicturePath}`} alt="profile" width={65} height={65} className="rounded-full" />
                        <div className=" absolute top-1 right-0 w-[17px] h-[17px] bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-poppins font-semibold">
                            {unreadMessages}
                        </div>
                    </div>
                </div>

    );
}
export default ContactMd;