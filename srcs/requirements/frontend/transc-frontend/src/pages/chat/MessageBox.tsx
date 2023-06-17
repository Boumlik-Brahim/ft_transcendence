

export default function MessageBox({ messageContent, date, time, profilePicture, user }: {
    messageContent: string,
    date: string,
    time: string,
    user: string,
    profilePicture: string
}) {
    let position: string;
    let bgColor: string;
    if (user === 'Bilal Ben Aouad') {
        position = "justify-start";
        bgColor = "bg-light-800";
    }
    else {
        position = "justify-end pr-[25px]";
        bgColor = "bg-light-700";
    }
    return (
        <div className={`flex w-full ${position} pl-[23px]`}>
            <div className="flex flex-col items-start">
                <div className=" relative top-[22px] left-[45px]  flex items-center ">
                    <div className="font-poppins font-bold text-[11px] leading-5  text-primary-900 max-w-[120px] truncate mr-[8px] ">
                        {user}
                    </div>
                    <div className="font-poppins font-light tracking-wider text-[9px] leading-5 text-light-900  max-w-[90px]">
                        <span>{date}</span>
                        <span className="pl-[5px]">{time}</span>
                    </div>
                </div>
                <div className="p-[10px] relative flex w-[280px] justify-start  ">
                    <div className={`mt-[10px] ml-[5px] ${bgColor} w-full min-h-[30px] flex gap-[5px] items-start pl-[30px]  rounded-lg pt-2.5 pb-1.5`}>
                        <p className="pb-[7px] font-poppins text-primary-500 font-semibold text-[10px] leading-4 pr-[10px]">{messageContent}</p>
                    </div>
                    <img src={`/imgs/${profilePicture}`} alt="profilePic" className="absolute top-0 left-0 w-[40px] h-[40px] rounded-full" />
                </div>
            </div>

        </div>
    );

}