"use client"

import Image from "next/image";
import ContactSm from "../Contact/ContactSm";
import { contactFriendList, ContactFriend } from '../../TempData/contacts'
import { useDispatch, useSelector } from 'react-redux';
import { show, hide } from '../../../../store/reducer';

import { RootState } from '../../../../store/store';

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


function ContactListSm() {

    const [cont, setCont] = useState<Contact[]>([]);

    useEffect(() => {
        async function fetchContact() {
            try {
                const response = await axios.get<Contact[]>('http://localhost:3000/users/5e56a41b-3354-4529-940c-c2a3e4f54bff/receiver');
                setCont(response.data);
                console.log("test", cont);
            } catch (error) {
                console.error(error);
            }
        }
        fetchContact();
    }, []);

    const contacts = cont.map((contact) => {
        return (
            <ContactSm
                key={contact.id}
                id={contact.id}
                name={contact.name}
                unreadMessages={4}
                profilePicturePath={contact.Avatar}
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