"use client"

import Image from "next/image";
import ContactLg from "../Contact/ContactLg";

import { useState, useEffect } from 'react';
import axios from "axios";



import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, setOtherUser, selectedOne,setRefreshOn,setRoomId} from '@/app/store/reducer';
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



function ContactListLg({ inputRef,roomId }: any) {

    //* States
    const [activeButtonId, setActiveButtonId] = useState<string | null>(null);
    const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.currentUserId);
    const [cont, setCont] = useState<Contact[]>([]);
    const refreshStatus = useSelector((state: RootState) => state.refreshFetchMessagesSlice.refreshFetchMessages);
    const otherUserId = useSelector((state: RootState) => state.EditUserIdsSlice.otherUserId);


    const dispatch = useDispatch();

    //* styling the selected btn and dispatch otherUserId
    const handleButtonClick =  async (buttonId: string) => {
        
        setActiveButtonId(buttonId);
        dispatch(setOtherUser(buttonId));
        dispatch(selectedOne(buttonId))
        try {
            const res = await axios.put(`http://localhost:3000/chat/${currentUserId}/${buttonId}`, {"seen": true});
            
        } catch (err) {
            console.log(err);
        }
        
        inputRef.current.on("joined", (data: any) => {
            dispatch(setRoomId(data.roomName))
            dispatch(setRefreshOn()); // 
        });
    };

//* fetching contact List 
useEffect(() => {
    async function fetchContact() {
        try {
            const response = currentUserId && await axios.get<Contact[]>(`http://localhost:3000/users/${currentUserId}/receivers`);
            response && setCont(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    fetchContact();
}, [currentUserId,refreshStatus]);





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
                {contacts ? contacts : <h1>No Contacts</h1>}
            </div>
        </div>
    );
}
export default ContactListLg;
