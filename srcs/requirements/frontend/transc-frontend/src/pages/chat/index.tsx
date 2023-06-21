
import MessageBox from './MessageBox'
import MessageInputBox from './MessageInputBox';
import ContactList from './ContactList';
import conversationData from './conversitionData';

import { MdNotifications } from 'react-icons/md'


import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useMediaQuery } from '@react-hook/media-query';

// import { useMediaQuery } from '@react-hook/media-query';

export const Chat = () => {
    const currentState = useSelector((state: RootState) => state.toggle.isShoFriendListToggled);
    const isMdScreen = useMediaQuery('(min-width: 768px)');
    const conversation = conversationData.map(item => {
        return (
            <MessageBox
                userId  ={item.id}
                messageContent={item.messageContent}
                date={item.date}
                time={item.time}
                profilePicture={item.profilePicture}
                user={item.user}
            />
        )
    });
    return (
        <>
            <div className='md:flex md:justify-end '>
                <div className={`${(!currentState) ? "h-[90vh] md:h-[100vh] w-full md:flex md:flex-col md:justify-center " : "hidden"}`}>
                    <div className={`${isMdScreen ? "h-[10%]  w-full flex items-center justify-between bg-primary-100 md:bg-transparent pl-9 pr-9 " : "hidden"}`}>
                        <div className='text-xl font-poppins font-semibold leading-normal tracking-wide text-primary-900 md:ml-[3%]'>
                            Bilal Ben Aouad
                        </div>
                        <MdNotifications className="w-5 h-5 text-primary-900 md:hidden" />
                    </div>
                    <div className='h-full w-full  bg-white md:h-[80%] md:w-[90%] md:shadow-xs md:border-2 md:border-primary-900 md:rounded-xl  md:flex md:flex-col md:self-center'>
                        <div className='flex  flex-col items-start rounded h-[90%]  md:h-[91%] overflow-auto no-scrollbar '>
                            {conversation}
                        </div>
                        <MessageInputBox
                            bgColor="bg-primary-100   md:rounded-b-[10px] "
                        />
                    </div>
                </div>
                <ContactList />
            </div>
        </>
    )
}