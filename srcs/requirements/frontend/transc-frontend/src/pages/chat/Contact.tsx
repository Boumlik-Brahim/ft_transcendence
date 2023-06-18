
import { useMediaQuery } from '@react-hook/media-query';
interface Props {
    id: number;
    name: string;
    profilePicturePath: string;
    unreadMessages: number;
}


export default function Contact({ name, unreadMessages, profilePicturePath }: Props) {}
    const isMdScreen = useMediaQuery('(min-width: 768px)');

    return (
        <div className='w-full h-[56px] md:h-[93px] md:w-full  bg-primary-800 md:bg-transparent mb-2.5  flex items-center justify-between  md:justify-center md:items-center pl-[42px] pr-[42px] rounded-sm md:pl-[0px] md:pr-[0px]  md:mb-0  md:rounded-none '>
            <div className='md:pt-[18%]'>
                <img src={`./imgs/${profilePicturePath}`} alt='profilePic' className='w-[38px] h-[38px] md:w-[65px] md:h-[65px] rounded-full' />
                <div className={`${isMdScreen ? "w-[19px] h-[19px] bg-red-500  rounded-full flex justify-center items-center relative top-[-60px] right-[-50px] font-poppins text-xs text-white" : "hidden"}`}>
                    {unreadMessages}
                </div>
            </div>

            <div className='text-color font-poppins text-sm text-white  max-w-[150px] md:w-full flex items-center h-full truncate md:hidden'>
                {name}
            </div>
            <div className='w-[21px] h-[21px] rounded-full bg-red-500 flex items-center justify-center text-white font-poppins text-xs md:hidden  md:w-[23px] md:h-[23px] '>
                {unreadMessages}
            </div>
        </div>
    );
}