
import MessageBox from './MessageBox'
import MessageInputBox from './MessageInputBox';
import ContactList from './ContactList';
import conversationData from './conversitionData';

import { MdNotifications } from 'react-icons/md'


import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import { useMediaQuery } from '@react-hook/media-query';

export const Chat = () => {
    const currentState = useSelector((state: RootState) => state.toggle.isShoFriendListToggled);
    const isMdScreen = useMediaQuery('(min-width: 768px)');
    const isLgScreen = useMediaQuery('(min-width: 1024px)');

    const conversation = conversationData.map(item => {
        return (
            <MessageBox
                userId={item.id}
                messageContent={item.messageContent}
                date={item.date}
                time={item.time}
                profilePicture={item.profilePicture}
                user={item.user}
            />
        )
    });
    return (
        <div className='md:flex md:justify-end'>
            <div className={`${!currentState ? "w-full h-full" : "hidden"}`}>
                {/*---------------------------------------- Header for Md devices ---------------------------------------------------------------- */}
                <div className={`   ${isMdScreen ? 
                                    "w-full  h-[10vh] lg:h-[15vh] md:pl-[65px]  bg-primary-100 lg:bg-transparent flex items-center justify-between px-[34px]" 
                                    : "hidden"}`}>
                    <div className='font-poppins text-[20px] font-semibold leading-5 tracking-normal text-primary-900'>
                        Bilal Ben Aouad
                    </div>
                    <MdNotifications className="text-[21px] text-primary-900 cursor-pointer" />
                </div>

                {/*-------------------------------------------------------------------------------------------------------------------------------- */}

                {/*---------------------------------------- Chat Box------------------------------------------------------------------------------- */}
                <div className={`${!isLgScreen ? "w-full h-[80vh]  overflow-auto no-scrollbar px-[23px] py-[15px]" : "hidden"}`}>
                   
                    {conversation}

                </div>
                {/*--------------------------------------------------------------------------------------------------------------------------------- */}

                <div className={`${!isLgScreen ? "w-full h-[10vh] bg-primary-100 flex items-center" : "hidden"}`}>

                    <MessageInputBox />
                </div>
                <div className={`${isLgScreen ? "w-full h-[85vh]  flex justify-center" : "hidden"}`}>
                    <div className='w-full h-full '>
                        <div className='w-full h-[88%]  overflow-auto no-scrollbar px-[28px] py-[10px]'>
                            {conversation}
                        </div>
                        <div className='w-[full] h-[12%] bg-gray-100 flex'>
                            <MessageInputBox />
                        </div>
                    </div>
                </div>
            </div>
            <ContactList />
        </div>
    )
}
// <div className='md:flex md:justify-end '>
//     <div className={`${(!currentState) ? "h-[90vh] md:h-[100vh] w-full md:flex md:flex-col md:justify-center " : "hidden"}`}>
//         <div className={`${isMdScreen ? "h-[10%]  w-full flex items-center justify-between bg-primary-100 md:bg-transparent pl-9 pr-9 " : "hidden"}`}>
//             <div className='text-xl font-poppins font-semibold leading-normal tracking-wide text-primary-900 md:ml-[3%]'>
//                 Bilal Ben Aouad
//             </div>
//             <MdNotifications className="w-5 h-5 text-primary-900 md:hidden" />
//         </div>
//         <div className='h-full w-full  bg-white md:h-[80%] md:w-[90%] md:shadow-xs md:border-2 md:border-primary-900 md:rounded-xl  md:flex md:flex-col md:self-center '>
//             <div className='flex  flex-col items-start rounded h-[90%]  md:h-[91%] overflow-auto no-scrollbar '>
//                 {conversation}
//             </div>
//             <MessageInputBox
//                 bgColor="bg-primary-100   md:rounded-b-[10px] "
//             />
//         </div>
//     </div>
//     <ContactList />
// </div>