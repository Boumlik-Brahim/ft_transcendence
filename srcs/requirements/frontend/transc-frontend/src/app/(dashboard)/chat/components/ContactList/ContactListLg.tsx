"use client"

import Image from "next/image";
import ContactLg from "../Contact/ContactLg";
import { contactFriendList, ContactFriend } from '../../TempData/contacts'

import { useState, useEffect } from 'react';
import axios from "axios";

interface Contact {
    id: string
    name: string
    email: string
    IntraId: string
    Avatar: string
    status: string
    created_at: string
    updated_at: string
}



function ContactListMd() {
    const [activeButtonId, setActiveButtonId] = useState<string | null>(null);
    const handleButtonClick = (buttonId: string) => {
        setActiveButtonId(buttonId);
    };


    const [cont, setCont] = useState<Contact[]>([]);
    useEffect(() => {
        async function fetchContact() {
            try {
                const response = await axios.get<Contact[]>('http://localhost:3000/users/5e56a41b-3354-4529-940c-c2a3e4f54bff/receiver');
                setCont(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchContact();
    }, []);


    const contacts = cont.map((contact) => {
        return (
            <ContactLg
                key={contact.id}
                id={contact.id}
                name={contact.name}
                unreadMessages={1}
                profilePicturePath={contact.Avatar}
                activeButtonId={activeButtonId}
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
