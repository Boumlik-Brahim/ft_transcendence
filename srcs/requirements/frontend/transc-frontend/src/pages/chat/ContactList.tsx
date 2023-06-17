import Contact from './Contact';
import { MdOutlineClose } from 'react-icons/md'
import { contactFriendList, ContactFriend } from './tempData/contactsData'

import { useDispatch, useSelector } from 'react-redux';
import { off } from '../../store/reducer';
import { RootState } from '../../store/store';


export default function ContactList() {
    const currentState = useSelector((state: RootState) => state.toggle.isShoFriendListToggled);
    const dispatch = useDispatch();
    const toggleFriendList = () => {
        dispatch(off());
    };
    const contacts = contactFriendList.map((item : ContactFriend) =>{
        return(
            <Contact
                id                  = {item.id}
                name                = {item.name}
                unreadMessages      = {item.unreadMessages}
                profilePicturePath  = {item.profilePicturePath}
            />
        );
    });
    return (
        <>
            <div className={`${currentState ? "h-screen w-screen md:w-[20%] bg-primary-900 " : "hidden"}`}>
                <div className=' w-full h-[13%] flex items-center justify-between pl-[8%] pr-[8%] md:hidden '>
                    <div className='font-poppins font-bold text-sm text-white leading-5 md:hidden'>
                        Contacts
                    </div>
                    <MdOutlineClose className='text-white  text-2xl cursor-pointer md:hidden' onClick={toggleFriendList} />
                </div>
                <div className=' w-full h-[87%] overflow-auto pl-[8%] pr-[8%] md:pl-0 md:pr-0 md:mt-[50px]' >
                   {contacts}
                </div>
            </div>

        </>
    );

}