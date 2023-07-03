

export default function MessageBox({ userId, messageContent, date, time, profilePicture, user, }: {
    userId: number,
    messageContent: string,
    date: string,
    time: string,
    user: string,
    profilePicture: string,

}) {
    let position: string;
    let bgColor: string;
    if (user === 'Bilal Ben Aouad') {
        position = "items-start";
        bgColor = "bg-light-800";
    }
    else {
        position = "items-end";
        bgColor = "bg-light-700";
    }


    return (
        <div className={`flex flex-col ${position}  mb-[28px] pr-[13px]`}>
            <div className='relative  w-[280px]  min-h-[30px]'>
                <img src={`imgs/${profilePicture}`} alt='profile' className=' absolute  w-[40px] h-[40px] rounded-full' />
                <div className='w-full h-[24px]  flex pl-[46px]'>
                    <div className='h-full w-[80px] text-[10px] text-primary-900 flex items-center font-poppins font-bold truncate'>
                        {user}
                    </div>
                    <div className='flex items-center text-[8px] font-poppins font-normal tracking-wider ml-[5px] text-light-900'>
                        <div className=' mr-[3px]'>
                            {date}
                        </div>
                        <div>
                            {time}
                        </div>
                    </div>
                </div>
                <div className={`${bgColor} ml-[20px] py-[16px] px-[27px]  rounded-md `}>
                    <p className=' font-poppins text-[10px] text-primary-500 font-semibold leading-4 tracking-[0.1px]'>
                        {messageContent}
                    </p>
                </div>
            </div>
        </div>
    );

}
