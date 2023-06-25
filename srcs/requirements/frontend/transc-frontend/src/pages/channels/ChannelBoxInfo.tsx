

interface ChannelProps {
    id : number;
    bg_color: string;
    txt_color: string;
    channel_name:string;
    channel_owner:string;
    channel_members:number;
    channel_mode :string;
}

export default function ChannelBoxInfo({bg_color, txt_color, channel_name, channel_owner, channel_members, channel_mode}:ChannelProps) {
    return (
        <div className="px-[5%] w-full h-[60px] border-2 border-primary-900 rounded-full flex justify-between items-center mb-[10px]">
            <div className="flex flex-col items-start justify-center ">
                <p className="font-poppins text-[11px] text-primary-900 font-bold mb-[-1px] leading-11 tracking-wider">
                    {channel_name}
                </p>
                <p className="font-poppins text-[9px] text-primary-900 font-normal leading-3 tracking-wider ">
                    {channel_owner}
                </p>
            </div>
            <div className="flex items-center">
                <div className="font-poppins text-xs font-bold text-primary-900 pr-[3px] ">
                    {channel_members}
                </div>
                <div className="font-poppins text-xs font-bold  text-primary-900 uppercase">Member</div>
            </div>
            <div className={`w-[25%] h-[50%] ${bg_color} rounded-full flex items-center justify-center py-[15px]`}>
                <div className={`font-poppins text-xs font-bold ${txt_color} uppercase`}>
                    {channel_mode}
                </div>
            </div>
        </div>
    );
}