
import MessageBox from './MessageBox'
import MessageInputBox from './MessageInputBox';
import ContactList from './ContactList';
import conversationData from './conversitionData';


import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';



export const Chat = () => {
    const currentState = useSelector((state: RootState) => state.toggle.isShoFriendListToggled);

    const conversation = conversationData.map(item => {
        return (
            <MessageBox
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
            <div className='md:flex md:justify-end'>
                <div className={`${!currentState ? "h-[90vh] md:h-[100vh] w-full" : "hidden"}`}>
                    <div className='h-full w-full  bg-white ] '>
                        <div className='flex  flex-col items-start rounded h-[90%]  overflow-auto'>
                            {conversation}
                        </div>
                        <MessageInputBox
                            bgColor="bg-primary-100"
                        />
                    </div>
                </div>
                <ContactList />
            </div>
        </>
    )
}