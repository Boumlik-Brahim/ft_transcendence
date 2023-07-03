
import { CgClose } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { off } from '../../store/reducer';
import { useMediaQuery } from '@react-hook/media-query';
import { useState } from 'react';

import Contact from './components/Contact';
import { contactFriendList, ContactFriend } from './tempData/contactsData'




export default function ContactListSm() {
    const currentState = useSelector((state: RootState) => state.toggle.isShoFriendListToggled);
    const dispatch = useDispatch();
    const isMdScreen = useMediaQuery('(min-width: 768px)');

    const toggleFriendList = () => {
        dispatch(off());
    };
    if (isMdScreen) {
        dispatch(off());
    }

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
        <div className={` ${(currentState) ? "w-screen h-screen bg-primary-900 pt-[30px] flex  flex-col items-center" : "hidden"}`}>
            <div className='w-[90%] h-[10vh] flex items-center justify-between'>
                <div className='pl-[10px] font-poppins font-bold text-sm text-white'>
                    Contacts
                </div>
                <CgClose className="w-[30px] h-[30px] text-white  cursor-pointer" onClick={toggleFriendList} />
            </div>
            <div className='w-[90%] h-[80vh] overflow-auto no-scrollbar'>
                {/* <div className='w-full h-[56px]  flex items-center justify-between px-[40px] mb-[7px]  cursor-pointer'>
                    <div className='flex items-center'>
                        <img src={`/imgs/${profilePicturePath}`} alt='profile' className='w-[41px] h-[41px] flex items-center mr-[21px]' />
                        <div className='max-w-[125px]  h-full text-white font-poppins text-sm font-semibold tracking-normal truncate'>
                            {name}
                        </div>
                    </div>
                    <div className=''>
                        <div className='w-[21px] h-[21px] bg-red-500 rounded-full flex items-center justify-center text-[12px] font-poppins font-semibold text-white '>
                            {unreadMessages}
                        </div>
                    </div>
                </div>*/}
            {contacts}
            </div> 
        </div>
    )
}
