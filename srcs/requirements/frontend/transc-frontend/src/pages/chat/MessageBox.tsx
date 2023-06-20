

export default function MessageBox({ userId,messageContent, date, time, profilePicture, user, }: {
    userId : number,
    messageContent: string,
    date: string,
    time: string,
    user: string,
    profilePicture: string,

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
            <div className="flex flex-col items-start md:w-[60%]  xxs:w-[100%] ">
                <div className=" relative top-[22px]  left-[45px]  flex items-center md:left-[50px] ">
                    <div className="font-poppins font-bold text-[11px] leading-5   text-primary-900 max-w-[120px] truncate mr-[8px]  md:text-[12px] md:leading-6">
                        {user}
                    </div>
                    <div className="font-poppins font-light tracking-wider text-[9px] leading-5 text-light-900 max-w-[90px] md:text[11px] md:leading-6 md:tracking-widest ">
                        <span className="md:pl-[3px]">
                            {date}
                        </span>
                        <span className="pl-[5px] md:pl-[7px] ">
                            {time}
                        </span>
                    </div>
                </div>
                <div className="p-[10px] relative flex w-[280px] md:w-full justify-start  xxs:w-full">
                    <div className={`mt-[10px]  ml-[5px] ${bgColor} w-full min-h-[30px] flex gap-[5px] items-start pl-[30px]   rounded-lg pt-2.5  pb-1.5  md:min-h-[50px] md:pt-3.5 md:pl-[33px] `}>
                        <p className="pb-[7px] font-poppins text-primary-500 font-semibold text-[10px] leading-4 pr-[10px]  md:text-[11px] ">
                            {messageContent}
                        </p>
                    </div>
                    <img src={`/imgs/${profilePicture}`} alt="profilePic" className="absolute top-0 md:top-[-3px] left-0 w-[40px] md:w-[45px] md:h-[45px] h-[40px] rounded-full" />
                </div>
            </div>

        </div>
    );

}