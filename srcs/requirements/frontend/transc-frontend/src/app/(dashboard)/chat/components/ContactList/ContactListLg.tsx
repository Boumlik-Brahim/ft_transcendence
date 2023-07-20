"use client"

import Image from "next/image";
import ContactLg from "../Contact/ContactLg";
import { contactFriendList, ContactFriend } from '../../TempData/contacts'

import { useState, useEffect } from 'react';
import axios from "axios";

interface Pic {
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


    const [cont, setCont] = useState<Pic[]>([]);
    useEffect(() => {
        async function fetchPic() {
            try {
                const response = await axios.get<Pic[]>('http://localhost:3000/users/58c5953f-90a5-40c6-9b48-a0b62aacf654/receiver');
                setCont(response.data);
                console.log("test",cont);
            } catch (error) {
                console.error(error);
            }
        }
        fetchPic();
    },[]);

    
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







    // const contacts = contactFriendList.map((item: ContactFriend) => {
    //     return (
    //         <ContactLg
    //             key={item.id}
    //             id={item.id}
    //             name={item.name}
    //             unreadMessages={item.unreadMessages}
    //             profilePicturePath={item.profilePicturePath}
    //             activeButtonId={activeButtonId}
    //             onClick={handleButtonClick}
    //         />
    //     );
    // });

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
