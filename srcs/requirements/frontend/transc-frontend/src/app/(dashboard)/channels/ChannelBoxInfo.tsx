interface ChannelProps {
    id: number;
    bg_color: string;
    txt_color: string;
    channel_name: string;
    channel_owner: string;
    channel_members: number;
    channel_mode: string;
}


function ChannelBoxInfo({id,bg_color,txt_color,channel_name,channel_owner, channel_members, channel_mode} : ChannelProps) {
    return (
        <div className="w-full h-[46px] border-2 border-primary rounded-full text-white flex items-center justify-between pl-[19px] pr-[11px] mb-[9px] cursor-pointer   md:h-[78px]     lg:h-[70px] ">
            <div className="w-[80px] h-[25px]  flex flex-col justify-center md:w-[100px] md:h-[35px] lg:h-[40px] ">
                <div className="w-full text-[9px] text-primary font-bold leading-tight tracking-wider truncate   md:text-[12px] lg:w-[120px] lg:text-xs  ">
                    {channel_name}
                </div>
                <div className=" text-left text-[7px] text-primary  pl-[2px] font-normal leading-tight tracking-wider truncate  md:text-[9px] ">
                    {channel_owner}
                </div>
            </div>
            <div className="w-[80px] h-[25px]  text-[9px] text-primary font-bold leading-tight tracking-wider flex justify-center items-center   md:w-[100px] md:h-[35px] md:text-[12px] lg:w-[120px] lg:h-[40px] ">
                <div className="pr-[3px] truncate">
                    {channel_members}
                </div>
                <span className="uppercase truncate text-primary">
                    Member
                </span>
            </div>
            <div className={`w-[65px] h-[25px]   ${bg_color} flex justify-center items-center rounded-full  md:w-[84px] md:h-[35px]`}>
                <div className={` text-[8px] ${txt_color} font-bold leading-tight tracking-wider uppercase md:text-[11px] `}>
                    {channel_mode}
                </div>
            </div>
        </div>
    );
};

export default ChannelBoxInfo;