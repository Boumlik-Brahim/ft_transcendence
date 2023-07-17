"use client"
import Image from "next/image";

import { useDispatch, useSelector } from 'react-redux'; 
import { show, hide } from '../../store/reducer';

import { RootState } from '../../store/store';


function MessageInputBox() {
    const isContactListHidden = useSelector((state: RootState) => state.toggleShowContactList);
    const dispatch = useDispatch();
    const handleShowContactList = () => {
        dispatch(show());
        console.log(isContactListHidden.showContactListToggled)

    }
    return (
        <div className="w-full h-[15%] bg-channel-600 flex items-center justify-between md:h-[10%] ">

            <div className='
                    pr-[8px]  h-full w-[80%] flex items-center pl-[23px] 
                    md:pl-[30px] md:w-[90%] 
            '>
                <input
                    placeholder="Type your message"
                    className={`
                                h-[40px] lg:h-[38px] w-full rounded-full text-primary font-poppins font-semibold text-[11px] pl-3.5  
                                focus:outline-none  focus:border-primary focus:ring-2 focus:ring-primary
                                placeholder:font-semibold placeholder:text-gray-500 placeholder:text-[11px] 
                                md:h-[45px] md:text-[14px]  md:placeholder:text-[13px]
                    `} />
            </div>
            <div className='
                            h-full flex items-center justify-start w-[20%] pl-[5px]
                            md:pl-[10px] md:w-[10%] 
            '>

                <Image src={"./send_b.svg"} alt="send message" width={24} height={24} className="text-primary text-[17px]    cursor-pointer 
                            md:text-[23px]" />
                <Image src={"./contacts_b.svg"} alt="send message" width={24} height={24} className=" text-primary text-[20px] ml-2.5 cursor-pointer 
                            md:hidden" onClick={handleShowContactList}/>
            </div>
        </div>

    )
}
export default MessageInputBox;