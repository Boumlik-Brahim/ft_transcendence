

import { useMediaQuery } from '@react-hook/media-query';



interface Props {
    id: number;
    name: string;
    profilePicturePath: string;
    unreadMessages: number;
    activeButtonId: number | null;
    onClick: (buttonId: number) => void;
}


export default function Contact({ id, name, unreadMessages, profilePicturePath, activeButtonId, onClick }: Props) {
    const isMdScreen = useMediaQuery('(min-width: 768px)');
    const isLgScreen = useMediaQuery('(min-width: 1024px)');
    const isActive = activeButtonId === id;
    const handleClick = () => {
        onClick(id);
    };

    if (isMdScreen && !isLgScreen) {
        return (
            <>
                <div className={`${"w-full h-[80px]  flex items-center justify-center cursor-pointer"}  ${isActive ? 'bg-slate-100 ' : 'bg-transparent'}`} onClick={handleClick}>
                    <div className='relative flex items-center justify-center '>
                        <img src={`/imgs/${profilePicturePath}`} alt='profile' className='w-[60px] h-[60px] rounded-full ' />
                        <div className=' absolute top-0 right-0'>
                            <div className='w-[19px] h-19px] bg-red-500 rounded-full flex items-center justify-center text-sm font-poppins font-semibold'>
                                {unreadMessages}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else if (isLgScreen) {

        return (
            <>

                <div className={`${"w-full h-[56px] bg-primary-900 flex items-center justify-between px-[42px] mb-[10px] cursor-pointer"} ${isActive ? 'bg-slate-100 ' : 'bg-transparent'}`} onClick={handleClick}>
                    <div className='flex items-center '>
                        <img src={`/imgs/${profilePicturePath}`} alt='profile' className='mr-[21px] w-[41px] h-[41px] rounded-full' />
                        <div className={`${"max-w-[125px] h-full  font-poppins text-sm font-semibold tracking-[0.2px] truncate"} ${isActive ? 'text-primary-900 ' : 'text-white'}`}>
                            {name}
                        </div>
                    </div>
                    <div className=''>
                        <div className='w-[21px] h-[21px] bg-red-500 rounded-full flex items-center justify-center text-sm font-poppins font-semibold'>
                            {unreadMessages}
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else if (!isMdScreen && !isLgScreen) {
        return (
            <>
                <div className='w-full h-[56px]  flex items-center justify-between px-[40px] mb-[7px]  cursor-pointer'>
                    <div className='flex items-center'>
                        <img src={`/imgs/${profilePicturePath}`} alt='profile' className='w-[41px] h-[41px] flex items-center mr-[21px] rounded-full' />
                        <div className='max-w-[125px]  h-full text-white font-poppins text-sm font-semibold tracking-normal truncate'>
                            {name}
                        </div>
                    </div>
                    <div className=''>
                        <div className='w-[21px] h-[21px] bg-red-500 rounded-full flex items-center justify-center text-[12px] font-poppins font-semibold text-white '>
                            {unreadMessages}
                        </div>
                    </div>
                </div>
            </>
        )
    }

}
