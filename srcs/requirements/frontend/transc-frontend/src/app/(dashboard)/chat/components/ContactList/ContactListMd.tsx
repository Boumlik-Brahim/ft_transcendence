"use sever"

import Image from "next/image";
import ContactSm from "../Contact/ContactMd";
import { contactFriendList, ContactFriend } from '../../TempData/contacts'

import ContactMd from "../Contact/ContactMd";
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

    //*  States
    const [activeButtonId, setActiveButtonId] = useState<string | null>(null);
    const [cont, setCont] = useState<Contact[]>([]);
    const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.currentUserId);
    
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
                const response = currentUserId &&  await axios.get<Contact[]>(`http://localhost:3000/users/${currentUserId}/receiver`);
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
            <ContactMd
                key={contact.id}
                id={contact.id}
                unreadMessages={contact._count.senders}
                profilePicturePath={contact.Avatar}
                activeButtonId={activeButtonId}
                inputRef={inputRef}
                onClick={handleButtonClick}
            />
        );
    });

    return (
        <div className="h-full w-[25%] bg-primary flex items-center">
            <div className="h-[90%] w-full  overflow-auto no-scrollbar pt-[58px]">
                {contacts}
            </div>
        </div>

    );
}
export default ContactListMd;