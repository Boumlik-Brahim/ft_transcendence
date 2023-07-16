"use client"

import Image from "next/image";
import ContactSm from "../Contact/ContactMd";
import { contactFriendList, ContactFriend } from '../../TempData/contacts'

import ContactMd from "../Contact/ContactMd";
import { useState } from 'react';

function ContactListMd() {
    const [activeButtonId, setActiveButtonId] = useState<number | null>(null);
    const handleButtonClick = (buttonId: number) => {
        setActiveButtonId(buttonId);
    };
    const contacts = contactFriendList.map((item: ContactFriend) => {
        return (
            <ContactMd
                key={item.id}
                id={item.id}
                unreadMessages={item.unreadMessages}
                profilePicturePath={item.profilePicturePath}
                activeButtonId={activeButtonId}
                onClick={handleButtonClick}
            />
        );
    });

    return (
        <div className="h-full w-[25%] bg-primary flex items-center">
            <div className="h-[90%] w-full  overflow-auto no-scrollbar ">
               {contacts}
            </div>
        </div>
    );
}
export default ContactListMd;