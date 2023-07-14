"use client"
import Image from "next/image";
import MessageInputBox from './MessageInputBox'
import { conversation } from "./TempData/conversation"
import MessageBox from "./MessageBox";
import ContactListSm from "./components/ContactList/ContactListSm";
import ContactListMd from "./components/ContactList/ContactListMd";
import Header from "./components/others/Header";
import { useMediaQuery } from 'react-responsive';

import { useDispatch, useSelector } from 'react-redux';
import { show, hide } from '../../store/reducer';
import { RootState } from '../../store/store';

function Page() {
    const isMdScreen = useMediaQuery({ minWidth: 768 });
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
                    ContactName="Bilal Ben Aouad"
                />}
                <div className="w-full h-[85%] bg-sender pl-[20px]  pr-[15px] py-[15px] overflow-auto no-scrollbar  md:h-[80%]">
                    {conversations}
                </div>
                <MessageInputBox />
            </div>
            {/* <ContactListSm />
            {isMdScreen && <ContactListMd/>} */}
            <div className="h-full w-[33.3%] bg-primary">
                <div className="w-full h-[5%] bg-green-500 flex items-end pl-[28px]">
                    <h1 className="text-white text-[13px] font-poppins font-semibold">Contacts</h1>
                </div>
                <div className="w-full h-[85%] bg-red-400 pt-[14px] overflow-auto">
                    <div className="w-full h-[56px] bg-yellow-500 flex items-center pl-[42px]">
                        <div className=" h-full w-[186px] flex items-center ">
                            {/* <div className="w-[41px] h-[41px] bg-cyan-600 rounded-full "></div> */}
                            <Image src={`/chatAvatars/bben-aou.jpeg`} alt="profile" width={41} height={41} className="rounded-full" />

                            <div className="w-[130px] h-full  ml-[15px] flex items-center truncate">
                                <span className="text-white text-[15px] font-poppins font-medium">
                                    Bilal Ben Aouad
                                </span>
                            </div>
                        </div>
                        <div className="w-[23px] h-[23px] bg-red-500 rounded-full flex justify-center items-center ml-[3px] text-white text-xs font-medium">
                            5
                        </div>
                    </div>


                    <div className="w-full h-[56px] bg-yellow-500 flex items-center pl-[42px]">
                        <div className=" h-full w-[186px] flex items-center ">
                            {/* <div className="w-[41px] h-[41px] bg-cyan-600 rounded-full "></div> */}
                            <Image src={`/chatAvatars/bben-aou.jpeg`} alt="profile" width={41} height={41} className="rounded-full" />

                            <div className="w-[130px] h-full  ml-[15px] flex items-center truncate">
                                <span className="text-white text-[15px] font-poppins font-medium">
                                    Bilal Ben Aouad
                                </span>
                            </div>
                        </div>
                        <div className="w-[23px] h-[23px] bg-red-500 rounded-full flex justify-center items-center ml-[3px] text-white text-xs font-medium">
                            5
                        </div>
                    </div>
                    <div className="w-full h-[56px] bg-yellow-500 flex items-center pl-[42px]">
                        <div className=" h-full w-[186px] flex items-center ">
                            {/* <div className="w-[41px] h-[41px] bg-cyan-600 rounded-full "></div> */}
                            <Image src={`/chatAvatars/bben-aou.jpeg`} alt="profile" width={41} height={41} className="rounded-full" />

                            <div className="w-[130px] h-full  ml-[15px] flex items-center truncate">
                                <span className="text-white text-[15px] font-poppins font-medium">
                                    Bilal Ben Aouad
                                </span>
                            </div>
                        </div>
                        <div className="w-[23px] h-[23px] bg-red-500 rounded-full flex justify-center items-center ml-[3px] text-white text-xs font-medium">
                            5
                        </div>
                    </div>
                    <div className="w-full h-[56px] bg-yellow-500 flex items-center pl-[42px]">
                        <div className=" h-full w-[186px] flex items-center ">
                            {/* <div className="w-[41px] h-[41px] bg-cyan-600 rounded-full "></div> */}
                            <Image src={`/chatAvatars/bben-aou.jpeg`} alt="profile" width={41} height={41} className="rounded-full" />

                            <div className="w-[130px] h-full  ml-[15px] flex items-center truncate">
                                <span className="text-white text-[15px] font-poppins font-medium">
                                    Bilal Ben Aouad
                                </span>
                            </div>
                        </div>
                        <div className="w-[23px] h-[23px] bg-red-500 rounded-full flex justify-center items-center ml-[3px] text-white text-xs font-medium">
                            5
                        </div>
                    </div>
                    <div className="w-full h-[56px] bg-yellow-500 flex items-center pl-[42px]">
                        <div className=" h-full w-[186px] flex items-center ">
                            {/* <div className="w-[41px] h-[41px] bg-cyan-600 rounded-full "></div> */}
                            <Image src={`/chatAvatars/bben-aou.jpeg`} alt="profile" width={41} height={41} className="rounded-full" />

                            <div className="w-[130px] h-full  ml-[15px] flex items-center truncate">
                                <span className="text-white text-[15px] font-poppins font-medium">
                                    Bilal Ben Aouad
                                </span>
                            </div>
                        </div>
                        <div className="w-[23px] h-[23px] bg-red-500 rounded-full flex justify-center items-center ml-[3px] text-white text-xs font-medium">
                            5
                        </div>
                    </div><div className="w-full h-[56px] bg-yellow-500 flex items-center pl-[42px]">
                        <div className=" h-full w-[186px] flex items-center ">
                            {/* <div className="w-[41px] h-[41px] bg-cyan-600 rounded-full "></div> */}
                            <Image src={`/chatAvatars/bben-aou.jpeg`} alt="profile" width={41} height={41} className="rounded-full" />

                            <div className="w-[130px] h-full  ml-[15px] flex items-center truncate">
                                <span className="text-white text-[15px] font-poppins font-medium">
                                    Bilal Ben Aouad
                                </span>
                            </div>
                        </div>
                        <div className="w-[23px] h-[23px] bg-red-500 rounded-full flex justify-center items-center ml-[3px] text-white text-xs font-medium">
                            5
                        </div>
                    </div><div className="w-full h-[56px] bg-yellow-500 flex items-center pl-[42px]">
                        <div className=" h-full w-[186px] flex items-center ">
                            {/* <div className="w-[41px] h-[41px] bg-cyan-600 rounded-full "></div> */}
                            <Image src={`/chatAvatars/bben-aou.jpeg`} alt="profile" width={41} height={41} className="rounded-full" />

                            <div className="w-[130px] h-full  ml-[15px] flex items-center truncate">
                                <span className="text-white text-[15px] font-poppins font-medium">
                                    Bilal Ben Aouad
                                </span>
                            </div>
                        </div>
                        <div className="w-[23px] h-[23px] bg-red-500 rounded-full flex justify-center items-center ml-[3px] text-white text-xs font-medium">
                            5
                        </div>
                    </div><div className="w-full h-[56px] bg-yellow-500 flex items-center pl-[42px]">
                        <div className=" h-full w-[186px] flex items-center ">
                            {/* <div className="w-[41px] h-[41px] bg-cyan-600 rounded-full "></div> */}
                            <Image src={`/chatAvatars/bben-aou.jpeg`} alt="profile" width={41} height={41} className="rounded-full" />

                            <div className="w-[130px] h-full  ml-[15px] flex items-center truncate">
                                <span className="text-white text-[15px] font-poppins font-medium">
                                    Bilal Ben Aouad
                                </span>
                            </div>
                        </div>
                        <div className="w-[23px] h-[23px] bg-red-500 rounded-full flex justify-center items-center ml-[3px] text-white text-xs font-medium">
                            5
                        </div>
                    </div><div className="w-full h-[56px] bg-yellow-500 flex items-center pl-[42px]">
                        <div className=" h-full w-[186px] flex items-center ">
                            {/* <div className="w-[41px] h-[41px] bg-cyan-600 rounded-full "></div> */}
                            <Image src={`/chatAvatars/bben-aou.jpeg`} alt="profile" width={41} height={41} className="rounded-full" />

                            <div className="w-[130px] h-full  ml-[15px] flex items-center truncate">
                                <span className="text-white text-[15px] font-poppins font-medium">
                                    Bilal Ben Aouad
                                </span>
                            </div>
                        </div>
                        <div className="w-[23px] h-[23px] bg-red-500 rounded-full flex justify-center items-center ml-[3px] text-white text-xs font-medium">
                            5
                        </div>
                    </div>


                </div>

            </div>
        </div>
    );
}
export default Page;
