"use sever"

import Image from "next/image";
import ContactSm from "../Contact/ContactMd";
import { contactFriendList, ContactFriend } from '../../TempData/contacts'

import ContactMd from "../Contact/ContactMd";
import { useState ,useEffect} from 'react';



import axios from "axios";

interface Pic{
    id: string
    name: string
    email: string
    IntraId: string
    Avatar: string
    status: string
    created_at: string
    updated_at : string
}

function ContactListMd() {
    const [activeButtonId, setActiveButtonId] = useState<string | null>(null);
    const handleButtonClick = (buttonId: string) => {
        setActiveButtonId(buttonId);
    };



    const [pic, setPic] = useState<Pic[]>([]);
    useEffect(() => {
        async function fetchPic() {
          try {
            const response = await axios.get<Pic[]>('http://localhost:3000/chat?senderId=77236f21-1255-4b65-bc60-578d037d0270&receiverId=9cbc6c2f-284c-47fb-9e36-7129e491b416');
            setPic(response.data);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        }
        fetchPic();
      }, [] );


    const contacts = pic.map((contact) => {
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



    // const contacts = contactFriendList.map((item: ContactFriend) => {
    //     return (
    //         <ContactMd
    //             key={item.id}
    //             id={item.id}
    //             unreadMessages={item.unreadMessages}
    //             profilePicturePath={item.profilePicturePath}
    //             activeButtonId={activeButtonId}
    //             onClick={handleButtonClick}
    //         />
    //     );
    // });

    return (
        
        <div className="h-full w-[25%] bg-primary flex items-center">
            <div className="h-[90%] w-full  overflow-auto no-scrollbar pt-[58px]">
               {contacts}
            </div>
        </div>

    );
}
export default ContactListMd;