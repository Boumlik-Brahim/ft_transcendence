"use client"

import Image from "next/image";
import ContactSm from "../Contact/ContactSm";
import { useDispatch, useSelector } from 'react-redux';
import { show, hide } from '@/app/store/reducer';

import { RootState } from '@/app/store/store';

import { useState, useEffect } from 'react';
import { setCurrentUser, setOtherUser,setRoomId, setRefreshOn, selectedOne } from '@/app/store/reducer';
import {socketChat} from '../../../../../../../components/FriendAction'

import axios from "axios";



//* Interface of Contact
interface Contact {
    id: string
    name: string
    email: string
    intraId: string
    Avatar: string
    status: string
    created_at: string
    updated_at: string
    _count: any

}


function ContactListSm() {

    //* States
    const [cont, setCont] = useState<Contact[]>([]);
    const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.currentUserId);
    const isContactListHidden = useSelector((state: RootState) => state.toggleShowContactList);
    const [activeButtonId, setActiveButtonId] = useState<string | null>(null);
    const refreshStatus = useSelector((state: RootState) => state.refreshFetchMessagesSlice.refreshFetchMessages);
    const otherUserId = useSelector((state: RootState) => state.EditUserIdsSlice.otherUserId);

    const dispatch = useDispatch();

    //* select conversation
    const handleButtonClick = async (buttonId: string) => {
        dispatch(setOtherUser(buttonId));
        setActiveButtonId(buttonId);
        dispatch(selectedOne(buttonId))
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_APP_URI}/chat/${currentUserId}/${buttonId}`, { "seen": true });

        } catch (err) {
            console.log(err);
        }
        socketChat.on("joined", (data: any) => {
            dispatch(setRoomId(data.roomName))
            dispatch(setRefreshOn()); // 
        });
    };

    //* fetching contact List 
    useEffect(() => {
        async function fetchContact() {
            try {
                const response = currentUserId && await axios.get<Contact[]>(`${process.env.NEXT_PUBLIC_APP_URI}/users/${currentUserId}/receivers`);
                response && setCont(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchContact();
    }, [currentUserId, refreshStatus]);


    // ^ ------------------------ filling contact component with data ---------------------
    const contacts = cont && cont.map((contact) => {
        return (
            <ContactSm
                key={contact.id}
                id={contact.id}
                name={contact.name}
                unreadMessages={contact._count.senders}
                profilePicturePath={contact.Avatar}
                onClick={handleButtonClick}
                activeButtonId={activeButtonId}
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
                <Image key={1} src={"/close_w.svg"} width={25} height={25} alt={"test"} className="md:w-[34px] md:h-[34px] cursor-pointer" onClick={handleShowContactList} />
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