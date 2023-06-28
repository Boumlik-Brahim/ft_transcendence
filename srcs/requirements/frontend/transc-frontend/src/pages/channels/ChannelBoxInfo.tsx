

interface ChannelProps {
    id: number;
    bg_color: string;
    txt_color: string;
    channel_name: string;
    channel_owner: string;
    channel_members: number;
    channel_mode: string;
}

export default function ChannelBoxInfo({ bg_color, txt_color, channel_name, channel_owner, channel_members, channel_mode }: ChannelProps) {
return (
<>
        <div className="w-full h-[46px] border-2 border-primary-900 rounded-full text-white flex items-center justify-between pl-[19px] pr-[11px] mb-[9px] cursor-pointer   md:h-[78px]     lg:h-[60px]">
            <div className="w-[80px] h-[25px]  flex flex-col justify-center md:w-[100px] md:h-[35px]">
                <div className="w-full font-poppins text-left text-[9px] text-primary-900 font-bold leading-tight tracking-wider truncate   md:text-[12px]">
                    {channel_name}
                </div>
                <div className="font-poppins text-left text-[7px] text-primary-900  pl-[2px] font-normal leading-tight tracking-wider truncate  md:text-[9px] ">
                    {channel_owner}
                </div>
            </div>
            <div className="w-[80px] h-[25px]  font-poppins text-[9px] text-primary-900 font-bold leading-tight tracking-wider flex justify-center items-center   md:w-[100px] md:h-[35px] md:text-[12px]">
                <div className="pr-[3px] truncate">
                    {channel_members}
                </div>
                <span className="uppercase truncate">
                    Member
                </span>
            </div>
            <div className={`w-[55px] h-[25px]   ${bg_color} flex justify-center items-center rounded-full  md:w-[84px] md:h-[35px]`}>
                <div className={`font-poppins text-[9px] ${txt_color} font-bold leading-tight tracking-wider uppercase md:text-[11px]`}>
                    {channel_mode}
                </div>
            </div>
        </div>
</>
);
}
        // <div className="
        //             px-[5%] w-full h-[60px] border-2 border-primary-900 rounded-full flex justify-between items-center mb-[10px]
        //             md:h-[78px] 
        //             lg:h-[60px]
        
        // ">
        //     <div className="flex flex-col items-start justify-center ">
        //         <p className="font-poppins text-[11px] text-primary-900 font-bold mb-[-1px] leading-11 tracking-wider    md:text-[13px] md:leading-12">
        //             {channel_name}
        //         </p>
        //         <p className="font-poppins text-[9px] text-primary-900 font-normal leading-3 tracking-wider md:text-[10px]">
        //             {channel_owner}
        //         </p>
        //     </div>
        //     <div className="flex items-center">
        //         <div className="font-poppins text-xs font-bold text-primary-900 pr-[3px] md:text-[13px]">
        //             {channel_members}
        //         </div>
        //         <div className="font-poppins text-xs font-bold  text-primary-900 uppercase md:text-[13px]">Member</div>
        //     </div>
        //     <div className={`w-[70px] h-[25px] ${bg_color} rounded-full flex items-center justify-center py-[15px] md:w-[80px] md:h-[35px]`}>
        //         <div className={`font-poppins text-xs font-bold ${txt_color} uppercase md:text-[13px]`}>
        //             {channel_mode}
        //         </div>
        //     </div>
        // </div>