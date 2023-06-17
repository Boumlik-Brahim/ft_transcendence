
interface Props {
    id : number;
    name: string;
    profilePicturePath: string;
    unreadMessages: number;
}

export default function Contact({name, unreadMessages, profilePicturePath}: Props) {
    return (
        <div className='w-full h-[56px] bg-primary-800 md:bg-transparent mb-2.5 flex items-center justify-between md:justify-center  md:items-start pl-[42px] pr-[42px] md:pl-0 md:pr-0 md:mb-[25px] rounded-sm'>
            <img src={`./imgs/${profilePicturePath}`} alt='profilePic' className='w-[38px] h-[38px] md:w-[65px] md:h-[65px] rounded-full '/>
            <div className='text-color font-poppins text-sm text-white  max-w-[150px]  flex items-center h-full truncate md:hidden'>
                {name}
            </div>
            <div className='w-[21px] h-[21px] rounded-full bg-red-500 flex items-center justify-center text-white font-poppins text-xs md:w-[23px] md:h-[23px]  md:relative md:top-[2px] md:right-[20px]'>
                {unreadMessages}
            </div>
        </div>
    );
}