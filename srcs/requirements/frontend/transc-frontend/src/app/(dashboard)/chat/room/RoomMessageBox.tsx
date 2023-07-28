"use client"
import Image from "next/image";


interface Props {
    userId: number,
    userName: string,
    date: string,
    profilePic: string,
    messageContent: string,
}

function RoomMessageBox({ userId, userName, date, profilePic, messageContent }: Props) {
    return (
        <div className="w-[90%] min-h-[50px]  mx-[5%] flex mb-[17px] ">
            <div className="w-[15%] h-full flex justify-center">
                <Image src={`/chatAvatars/${profilePic}`} height={41} width={41} alt="profile" className="rounded-full " />
            </div>
            <div className="w-[83%] min-h-[10px]  ml-[8px] ">
                <div className="w-[184px] h-[15px] flex mb-[4px]">
                    <div className="w-[90px] h-full flex items-center  text-primary text-[10px] font-poppins font-bold truncate">
                        {userName}
                    </div>
                    <div className="w-[84px] h-full text-date text-[8px] font-poppins font-light flex items-center ">
                        {date}
                    </div>
                </div>
                <div className="w-full min-h-[20px] ">
                    <p className="w-full h-full text-neutral-700 text-[8px] font-poppins font-medium  tracking-[0.2px]">
                        {messageContent}
                    </p>
                </div>
            </div>
        </div>
    );
}
export default RoomMessageBox;
