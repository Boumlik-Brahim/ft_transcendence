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
import { useEffect , useState} from "react";

import axios from "axios";
import dynamic from "next/dynamic";


interface Message {
    id: string;
    content: string;
    created_at: string;
    senderId: string;
    recieverId: string;
  }
  

function Page() {
    const isMdScreen = useMediaQuery({ minWidth: 768 });
    const isLgScreen = useMediaQuery({ minWidth: 1200 });
   
    const [isMdScreenState, setIsMdScreen] = useState(false);
    const [isLgScreenState, setIsLgScreen] = useState(false);
    useEffect(() => {
        setIsMdScreen(isMdScreen);
        setIsLgScreen(isLgScreen);
      }, [isMdScreen, isLgScreen]);


    const [messages, setMessages] = useState<Message[]>([]);
    useEffect(() => {
        async function fetchMessages() {
          try {
            const response = await axios.get<Message[]>('http://localhost:3000/chat?senderId=4526e24e-23be-11ee-be56-0242ac120002&receiverId=ee10f6ea-23bb-11ee-be56-0242ac120002');
            setMessages(response.data);
            // console.log(response);
          } catch (error) {
            console.error(error);
          }
        }
        fetchMessages();
      }, []);

      const conversations = messages.map(item => {
        return (
            <MessageBox
                key={item.id}
                userId={item.id}
                messageContent={item.content}
                date={item.created_at}
                time={'15:20'}
                profilePicture={"bben-aou.jpeg"}
                user={"Bilal Ben Aouad"}
            />

        )
    });


    const isContactListHidden = useSelector((state: RootState) => state.toggleShowContactList);
    // const conversations = conversation.map(item => {
    //     return (
    //         <MessageBox
    //             key={item.id}
    //             userId={item.id}
    //             messageContent={item.messageContent}
    //             date={item.date}
    //             time={item.time}
    //             profilePicture={item.profilePicture}
    //             user={item.user}
    //         />

    //     )
    // });


    

    return (
        <div className="w-full h-[85vh] md:h-screen flex">
            <div className={`${!isContactListHidden.showContactListToggled ? "w-full h-full " : "hidden"} `}>

                {isMdScreenState && <Header 
                    ContactName = { "Channel"}
                />}
              

                <div className="w-full h-[85%] bg-sender pl-[20px]  pr-[15px] py-[15px] overflow-auto no-scrollbar  md:h-[80%]">
                    {conversations}
                </div>
                <MessageInputBox />
            </div>
            <ContactListSm />
          
            {isLgScreenState  && <ContactListLg/>}
            
            {(isMdScreenState && !isLgScreenState) && <ContactListMd/>}
           
        </div>
    );
}
export default Page;
// export default dynamic (() => Promise.resolve(Page), {ssr: false})