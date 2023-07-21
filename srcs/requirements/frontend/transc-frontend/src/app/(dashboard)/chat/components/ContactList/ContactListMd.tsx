"use sever"

import Image from "next/image";
import ContactSm from "../Contact/ContactMd";
import { contactFriendList, ContactFriend } from '../../TempData/contacts'

import ContactMd from "../Contact/ContactMd";
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
            <ContactMd
                key={contact.id}
                id={contact.id}
                unreadMessages={1}
                profilePicturePath={contact.Avatar}
                activeButtonId={activeButtonId}
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