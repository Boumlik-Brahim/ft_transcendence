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
            const response = await axios.get<Message[]>('http://localhost:3000/chat?senderId=bc875f3b-d1be-44ab-bb1f-9c58aff0b451&receiverId=58c5953f-90a5-40c6-9b48-a0b62aacf654');
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
                userId={item.recieverId}
                messageContent={item.content}
                date={item.created_at}
                time={'15:20'}
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