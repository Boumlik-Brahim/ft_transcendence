"use client"
import Image from "next/image";

function Header({ContactName} : {ContactName: string}){
return(
    <div className="w-full h-[10%] bg-channel-600 flex items-center justify-between">
        <div className="text-primary text-xl font-poppins font-semibold tracking-wide pl-[34px]">
            {ContactName}
        </div>
        <Image src={"./notification_b.svg"} alt="send message" width={24} height={24} className="text-primary text-[17px] cursor-pointer mr-[42px]" />
    </div>
);
}

export default Header;