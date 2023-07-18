"use client"
import CreateProtectedChannelForm from "./CreateProtectedChannelForm";
import CreatePrvPbcChannel from "./CreatePrvPbcChannel"
import Image from "next/image";

import { useDispatch, useSelector } from 'react-redux';
import {createChannelPopUpOn, createChannelPopUpOff } from '../../store/reducer';

import { RootState } from '../../store/store';

function CreateChannel() {
    const isCreateChannelPopUpOn = useSelector((state: RootState) => state.createChannelPopUpToggle);
    
    const dispatch = useDispatch();
    const handleCreateChannelToggleOff = () => {
        dispatch(createChannelPopUpOff());
    }
    return (
        <div className={`${isCreateChannelPopUpOn.createChannelPopUpToggled ? "fixed inset-0 bg-gray-900 bg-opacity-30 flex justify-center items-center" : "hidden" }`}>
            <div className="relative text-primary-900 w-[61%] h-[80%] pl-[3%] bg-transparent transform transition-transform duration-1000 ease-in-out animate-show-up " >
                <div className="w-full h-[5%] flex items-center justify-end ">
                </div>
                <div className="w-[95%] h-[90%] bg-primary rounded-[40px] flex flex-col justify-center">
                    <div className="w-full h-[15%] flex items-center justify-end">
                        <Image key={1} src={"./close_w.svg"} width={33} height={33} alt={"test"} className="md:w-[34px] md:h-[34px] mr-[60px] cursor-pointer " onClick={handleCreateChannelToggleOff}/>
                    </div>
                    <div className="w-[55%] h-[40%] self-center  ">
                        <CreateProtectedChannelForm />
                    </div>
                    <div className="w-[55%] h-[45%] self-center ">
                        <CreatePrvPbcChannel />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateChannel;