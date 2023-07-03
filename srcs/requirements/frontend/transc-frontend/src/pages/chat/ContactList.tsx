// import Contact from './Contact';
import { contactFriendList, ContactFriend } from './tempData/contactsData'



import { useMediaQuery } from '@react-hook/media-query';
import { useState } from 'react';

import ContactListSm from './ContactListSm';
import ContactListMd from './ContactListMd';
import ContactListLg from './ContactListLg';
import Contact from './components/Contact';

export default function ContactList() {
   
    const isMdScreen = useMediaQuery('(min-width: 768px)');
    const isLgScreen = useMediaQuery('(min-width: 1300px)');


   
    const [activeButtonId, setActiveButtonId] = useState<number | null>(null);
    const handleButtonClick = (buttonId: number) => {
        setActiveButtonId(buttonId);
    };
    // const contacts = contactFriendList.map((item: ContactFriend) => {
    //     return (
    //         <Contact
    //             id={item.id}
    //             name={item.name}
    //             unreadMessages={item.unreadMessages}
    //             profilePicturePath={item.profilePicturePath}
    //             activeButtonId={activeButtonId}
    //             onClick={handleButtonClick}
    //         />
    //     );
    // });
    return (
        <>
            {/*<div className={`${(currentState || isMdScreen) ? "h-screen w-screen md:w-[19%] xl:w-[40%] bg-primary-900 md:flex md:items-center md:justify-end " : "hidden"}`}>
                 <div className=' w-full h-[13%] flex items-center justify-between pl-[8%] pr-[8%] md:hidden '>
                    <div className='font-poppins font-bold text-sm text-white leading-5 md:hidden'>
                        Contacts
                    </div>
                    <MdOutlineClose className='text-white  text-2xl cursor-pointer md:hidden ' onClick={toggleFriendList} />
                </div>
                <div className=' w-full h-[87%] md:h-[92%] overflow-auto no-scrollbar pl-[8%] pr-[8%] md:pl-0 md:pr-0 ' >
                   {contacts}
                </div> 
            </div> */}




            {/*-------------------------------------------- Friend List for the large screen ---------------------------------------------------------- */}

            {( isLgScreen ) && <ContactListLg/>}
            {/*-------------------------------------------------------------------------------------------------------------------------------------------------*/}
            
            {/*----------------------------------------- Online friend list for medium devices -----------------------------------------------------------------*/}

                {(isMdScreen && !isLgScreen) && <ContactListMd/> }
            {/*-------------------------------------------------------------------------------------------------------------------------------------------------*/}
            
                <ContactListSm/>
                </>
    );

}