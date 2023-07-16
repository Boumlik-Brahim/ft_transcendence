"use sever"

import Image from "next/image";
import ContactSm from "../Contact/ContactMd";
import { contactFriendList, ContactFriend } from '../../TempData/contacts'

import ContactMd from "../Contact/ContactMd";
import { useState ,useEffect} from 'react';



import axios from "axios";

interface Pic{
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

function ContactListMd() {
    const [activeButtonId, setActiveButtonId] = useState<number | null>(null);
    const handleButtonClick = (buttonId: number) => {
        setActiveButtonId(buttonId);
    };



    const [pic, setPic] = useState<Pic[]>([]);
    useEffect(() => {
        async function fetchPic() {
          try {
            const response = await axios.get<Pic[]>('https://jsonplaceholder.typicode.com/albums/1/photos');
            setPic(response.data);
          } catch (error) {
            console.error(error);
          }
        }
        fetchPic();
      }, []);


    const contacts = pic.map((item) => {
        return (
            <ContactMd
                key={item.id}
                id={item.id}
                unreadMessages={item.id}
                profilePicturePath={item.url}
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