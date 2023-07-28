"use client"

import Image from "next/image";
import ContactSm from "../Contact/ContactSm";
import { contactFriendList, ContactFriend } from '../../TempData/contacts'
import { useDispatch, useSelector } from 'react-redux';
import { show, hide } from '@/app/store/reducer';

import { RootState } from '@/app/store/store';

import { useState, useEffect } from 'react';
import { setCurrentUser, setOtherUser } from '@/app/store/reducer';

import axios from "axios";



//* Interface of Contact
interface Contact {
    id: string
    name: string
    email: string
    IntraId: string
    Avatar: string
    status: string
    created_at: string
    updated_at: string
    _count: any

}


function ContactListSm({ inputRef }: any) {

    //* States
    const [cont, setCont] = useState<Contact[]>([]);
    const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.currentUserId);
    const isContactListHidden = useSelector((state: RootState) => state.toggleShowContactList);

    const dispatch = useDispatch();

    //* select conversation
    const handleButtonClick = (buttonId: string) => {
        dispatch(setOtherUser(buttonId));
    };

    //* fetching contact List 
    useEffect(() => {
        async function fetchContact() {
            try {
                const response = currentUserId &&  await axios.get<Contact[]>(`http://localhost:3000/users/${currentUserId}/receiver`);
                response && setCont(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchContact();
    }, [currentUserId]);


    // ^ ------------------------ filling contact component with data ---------------------
    const contacts = cont && cont.map((contact) => {
        return (
            <ContactSm
                key={contact.id}
                id={contact.id}
                name={contact.name}
                unreadMessages={contact._count.senders}
                profilePicturePath={contact.Avatar}
                inputRef={inputRef}
                onClick={handleButtonClick}
            />
        );
    });

    //* show the contact List 
    const handleShowContactList = () => {
        dispatch(show());
    }

    return (
        <div className={`${isContactListHidden.showContactListToggled ? "w-full h-full bg-primary" : "hidden"}`}>
            <div className="w-full h-[12%] pr-[12%]  flex items-end justify-end">
                <Image key={1} src={"./close_w.svg"} width={25} height={25} alt={"test"} className="md:w-[34px] md:h-[34px] cursor-pointer" onClick={handleShowContactList} />
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