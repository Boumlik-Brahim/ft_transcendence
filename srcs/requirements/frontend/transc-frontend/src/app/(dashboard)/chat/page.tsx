"use client"
import Image from "next/image";
import MessageInputBox from './MessageInputBox'
import { conversation } from "./TempData/conversation"
import MessageBox from "./MessageBox";
import ContactListSm from "./components/ContactList/ContactListSm";
import ContactListMd from "./components/ContactList/ContactListMd";
import ContactListLg from "./components/ContactList/ContactListLg";

import Header from "./components/others/Header";
import { useMediaQuery } from 'react-responsive';

import { useDispatch, useSelector } from 'react-redux';
import { show, hide } from '../../store/reducer';
import { RootState } from '../../store/store';

function Page() {
    const isMdScreen = useMediaQuery({ minWidth: 768 });
    const isLgScreen = useMediaQuery({ minWidth: 1200 });

    const isContactListHidden = useSelector((state: RootState) => state.toggleShowContactList);
    const conversations = conversation.map(item => {
        return (
            <MessageBox
                key={item.id}
                userId={item.id}
                messageContent={item.messageContent}
                date={item.date}
                time={item.time}
                profilePicture={item.profilePicture}
                user={item.user}
            />
        )
    });

    return (
        <div className="w-full h-[85vh] md:h-screen flex">
            <div className={`${!isContactListHidden.showContactListToggled ? "w-full h-full " : "hidden"} `}>

                {isMdScreen && <Header
                    ContactName = "Bilal Ben Aouad"
                />}
                <div className="w-full h-[85%] bg-sender pl-[20px]  pr-[15px] py-[15px] overflow-auto no-scrollbar  md:h-[80%]">
                    {conversations}
                </div>
                <MessageInputBox />
            </div>
            {isLgScreen && <ContactListLg/>}
            {(isMdScreen && !isLgScreen) && <ContactListMd/>}
            <ContactListSm />
           
        </div>
    );
}
export default Page;
 