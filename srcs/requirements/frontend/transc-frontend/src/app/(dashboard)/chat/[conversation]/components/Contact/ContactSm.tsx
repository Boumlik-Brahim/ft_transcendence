"use client"

import Image from "next/image";


import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, setOtherUser, show, selectedOne, setRefreshOn, setRoomId } from '@/app/store/reducer';
import { RootState } from '@/app/store/store';
import { useEffect } from "react";
import axios from "axios";
import {socketChat} from '../../../../../../../components/FriendAction'

//* Interface of Props 
interface Props {
    id: string;
    name: string;
    profilePicturePath: string;
    unreadMessages: number;
    activeButtonId: string | null;
    onClick: (buttonId: string) => void;
}


function ContactSm({ id, name, unreadMessages, profilePicturePath, onClick, activeButtonId }: Props) {

    //* States
    const currentUserId = useSelector((state: RootState) => state.EditUserIdsSlice.currentUserId);
    const isActive = activeButtonId === id;
    const otherUserId = useSelector((state: RootState) => state.EditUserIdsSlice.otherUserId);
    const selectedOneBtn = useSelector((state: RootState) => state.selectContactConversationSlice.selectedBtn);
    const isA = selectedOneBtn === id

    const dispatch = useDispatch();


    //^ ---------------- select contact + getting other user Id and emitting join room --------------------------------
    const handleClick = async () => {

        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_APP_URI}:3000/chat/${currentUserId}/${otherUserId}`, { "seen": true });

        } catch (err) {
            console.log(err);
        }

        //* for styling the selected
        onClick(id);
        //* for getting the other user's ID
        dispatch(setOtherUser(id));
        dispatch(show());
        dispatch(selectedOne(id));
        dispatch(setRefreshOn()); // 

        //* creating new room 
        socketChat.emit("joinRoom", {
            senderId: currentUserId,
            recieverId: id
        });

        //* updating number of unseen messages
        socketChat.on("joined", (data: any) => {
            dispatch(setRoomId(data.roomName))
            dispatch(setRefreshOn()); // 
        });
    };

    return (
        <div className="w-[90%]  h-[56px]  pl-[42px] mt-[10px] ml-[27px] flex items-center justify-between " onClick={handleClick}>
            <div className="h-full w-[183px] flex items-center  ">
                <Image src={`${profilePicturePath}`} width={41} height={41} alt="avatar" className="w-[41px] h-[41px] rounded-full" />
                <div className="h-full max-w-[121px] pl-[25px] flex items-center text-white text-xs font-poppins font-semibold truncate ">
                    {name}
                </div>
            </div>
            {
                (unreadMessages != 0 && !isA) &&
                <div className="w-[20px] h-[20px] bg-red-500 rounded-full mr-[11.5%] flex items-center justify-center">
                    <span className="text-white text-xs font-poppins font-semibold">
                        {unreadMessages}
                    </span>
                </div>

            }
        </div>
    );
}
export default ContactSm;



// div className="card_friend gradients" onClick={() => handleSubmit({userSessionId, userId})}>
//                                {  <Link  href={`/chat/${roomId}` }>
//                                     <Image src={send_b} width={30} alt="avatar"  />
//                                 </Link>}
//                         </div>

// import axios from "axios";
// import Link from "next/link";



// import { useSelector, useDispatch } from 'react-redux';
// import { setCurrentUser, setOtherUser,selectedOne , setRefreshOn} from '@/app/store/reducer';
// import { RootState } from '@/app/store/store';

// interface MessageData {
//     content: string;
//     senderId: string;
//     recieverId: string;
// }
    // // &--------------------------------------  CHAT PART ------------------------------------
    
    // const [roomId, setRoomId] = useState("");
    
    
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     socket.emit("joinRoom", {
    //         senderId: userSessionId,
    //         recieverId: userId
    //     });
        
    //     socket.on("joined", (data) => {
    //         setRoomId(data.roomName);
            
    //     });
    
    // },[ userId, userSessionId])
    
    // const handleSubmit = async ({userSessionId,userId} : {userSessionId : string ,userId : string}) => {
    //     dispatch(setOtherUser(userId));
    //     dispatch(selectedOne(userId));
    //     dispatch(setRefreshOn());
        
    //     try {
    //         const res = await axios.put(`${process.env.NEXT_PUBLIC_APP_URI}:3000/chat/${userSessionId}/${userId}`, {"seen": true});
    
    //       } catch (err) {
    //         console.log(err);
    //       }
    // }
    
    
    
    // // &--------------------------------------------------------------------------------------