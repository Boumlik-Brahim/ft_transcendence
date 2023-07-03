
import { useState } from 'react';
import Contact from './components/Contact';
import { contactFriendList, ContactFriend } from './tempData/contactsData'


export default function ContactListLg() {

    const [activeButtonId, setActiveButtonId] = useState<number | null>(null);
    const handleButtonClick = (buttonId: number) => {
        setActiveButtonId(buttonId);
    };
    const contacts = contactFriendList.map((item: ContactFriend) => {
        return (
            <Contact
                id={item.id}
                name={item.name}
                unreadMessages={item.unreadMessages}
                profilePicturePath={item.profilePicturePath}
                activeButtonId={activeButtonId}
                onClick={handleButtonClick}
            />
        );
    });

    return (
        <div className='w-[50%] bg-primary-900 h-screen flex flex-col'>
            <div className='text-white w-full h-[10vh]  flex items-end pl-[28px]'>
                <span className='font-poppins font-bold text-sm text-white '>
                    Contacts
                </span>
            </div>
            <div className='text-white w-full h-[87vh]  overflow-auto no-scrollbar pt-[12px]'>
                {/* <div className={`${"w-full h-[56px] bg-yellow-500 flex items-center justify-between px-[42px] mb-[10px]"} ${isActive ? '' : 'bg-white'}`} onClick={handleClick}>
                    <div className='flex items-center '>
                        <img src={`/imgs/${profilePicturePath}`} alt='profile' className='mr-[21px] w-[41px] h-[41px] rounded-full' />
                        <div className='max-w-[125px] h-full text-white font-poppins text-sm font-semibold tracking-[0.2px] truncate'>
                            {name}
                        </div>
                    </div>
                    <div className=''>
                        <div className='w-[21px] h-[21px] bg-red-500 rounded-full flex items-center justify-center text-sm font-poppins font-semibold'>
                            {unreadMessages}
                        </div>
                    </div>
                </div> */}
                {contacts}
            </div>
        </div>
    )
}
