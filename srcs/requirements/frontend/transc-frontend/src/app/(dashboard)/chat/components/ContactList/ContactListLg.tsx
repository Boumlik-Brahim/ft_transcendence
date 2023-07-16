"use client"

import Image from "next/image";
import ContactLg from "../Contact/ContactLg";
import { contactFriendList, ContactFriend } from '../../TempData/contacts'

import { useState } from 'react';

function ContactListMd() {
    const [activeButtonId, setActiveButtonId] = useState<number | null>(null);
    const handleButtonClick = (buttonId: number) => {
        setActiveButtonId(buttonId);
    };
    const contacts = contactFriendList.map((item: ContactFriend) => {
        return (
            <ContactLg
                key={item.id}
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