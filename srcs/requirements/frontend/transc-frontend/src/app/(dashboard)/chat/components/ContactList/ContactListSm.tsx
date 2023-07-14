"use client"

import Image from "next/image";
import ContactSm from "../Contact/ContactSm";
import { contactFriendList, ContactFriend } from '../../TempData/contacts'
import { useDispatch, useSelector } from 'react-redux'; 
import { show, hide } from '../../../../store/reducer';

import { RootState } from '../../../../store/store';


function ContactListSm() {
    const contacts = contactFriendList.map((item: ContactFriend) => {
        return (
            <ContactSm
                key={item.id}
                id={item.id}
                name={item.name}
                unreadMessages={item.unreadMessages}
                profilePicturePath={item.profilePicturePath}
            />
        );
    });
    const isContactListHidden = useSelector((state: RootState) => state.toggleShowContactList);
    const dispatch = useDispatch();
    const handleShowContactList = () => {
        dispatch(show());
    }
    return (
        <div className={`${isContactListHidden.showContactListToggled ? "w-full h-full bg-primary" : "hidden"}`}>
            <div className="w-full h-[12%] pr-[12%]  flex items-end justify-end">
                <Image key={1} src={"./close_w.svg"} width={25} height={25} alt={"test"} className="md:w-[34px] md:h-[34px] cursor-pointer" onClick={handleShowContactList}/>
            </div>
            <div className="w-full h-[88%] ">
                <div className="w-full  h-[5%]">
                    <span className="  text-white text-[15px] font-poppins font-medium underline pl-[54px]">Contacts</span>
                </div>
                <div className="w-full h-[95%] overflow-auto no-scrollbar ">
                    {contacts}

                </div>
            </div>

        </div>
    );
}
export default ContactListSm;