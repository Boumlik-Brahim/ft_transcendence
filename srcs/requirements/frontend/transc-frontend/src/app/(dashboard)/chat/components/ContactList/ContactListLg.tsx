"use client"

import Image from "next/image";
import ContactLg from "../Contact/ContactLg";
import { contactFriendList, ContactFriend } from '../../TempData/contacts'

import { useState, useEffect } from 'react';
import axios from "axios";



import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, setOtherUser } from '@/app/store/reducer';
import { RootState } from '@/app/store/store';

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



function ContactListMd({ inputRef }: any) {

    //* States
    const [activeButtonId, setActiveButtonId] = useState<string | null>(null);
    const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.currentUserId);
    const [cont, setCont] = useState<Contact[]>([]);

    const dispatch = useDispatch();

    //* styling the selected btn and dispatch otherUserId
    const handleButtonClick = (buttonId: string) => {
        setActiveButtonId(buttonId);
        dispatch(setOtherUser(buttonId));
    };

//* fetching contact List 
    useEffect(() => {
        async function fetchContact() {
            try {
                const response = currentUserId && await axios.get<Contact[]>(`http://localhost:3000/users/${currentUserId}/receiver`);
                response && setCont(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchContact();
    }, [currentUserId]);


// ^ ------------------------ filling contact component with data ---------------------
    const contacts = cont.map((contact) => {
        return (
            <ContactLg
                key={contact.id}
                id={contact.id}
                name={contact.name}
                unreadMessages={contact._count.senders}
                profilePicturePath={contact.Avatar}
                activeButtonId={activeButtonId}
                inputRef={inputRef}
                onClick={handleButtonClick}
            />
        );
    });

    return (
        <div className="h-full w-[33.3%] bg-primary">
            <div className="w-full h-[5%]  flex items-end pl-[28px]">
                <h1 className="text-white text-[13px] font-poppins font-semibold">Contacts</h1>
            </div>
            <div className="w-full h-[85%]  pt-[40px]  overflow-auto no-scrollbar">
                {contacts}
            </div>
        </div>
    );
}
export default ContactListMd;
