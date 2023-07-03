

import Contact from './components/Contact';
import { contactFriendList, ContactFriend } from './tempData/contactsData'
import { useState } from 'react';



export default function ContactListMd() {
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
        <div className={`${"h-screen w-[23%] bg-primary-900 flex items-center"}`}  >
            <div className='text-white w-full h-[87vh]  overflow-auto no-scrollbar '>
                {/* <div className=' w-full h-[80px]  flex items-center justify-center '>
                    <div className='relative flex items-center justify-center '>
                        <img src={`/imgs/${profilePicturePath}`} alt='profile' className='w-[60px] h-[60px] rounded-full ' />
                        <div className=' absolute top-0 right-0'>
                            <div className='w-[19px] h-19px] bg-red-500 rounded-full flex items-center justify-center text-sm font-poppins font-semibold'>
                               {unreadMessages}
                            </div>
                        </div>
                    </div>
                </div> */}
                {contacts}
            </div>
        </div>
    )
}
