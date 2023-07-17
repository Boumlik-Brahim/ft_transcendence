"use client"
import CreateProtectedChannelForm from "./CreateProtectedChannelForm";
import CreatePrvPbcChannel from "./CreatePrvPbcChannel"
import Image from "next/image";

import { useDispatch, useSelector } from 'react-redux'; 
import { createChannelOn, createChannelOff } from '../../store/reducer';

import { RootState } from '../../store/store';

function CreateChannel() {
  const isCreateChannelOn = useSelector((state: RootState) => state.createChannelToggle);
  const dispatch = useDispatch();
  const handleCreateChannelToggleOff = () => {
      dispatch(createChannelOff());
  }
    return (
        <div className={`${isCreateChannelOn.createChannelBtnToggled ? "w-full h-full bg-primary md:flex md:flex-col" : "hidden" }`}>
        <div className="w-full h-[15%]  flex items-center justify-end pr-[12%]">
          <Image key={1} src={"./close_w.svg"} width={25} height={25} alt={"test"} className="md:w-[34px] md:h-[34px] cursor-pointer" onClick={handleCreateChannelToggleOff} />
        </div>
        <div className="w-full h-[40%] px-[60px] md:px-0 md:self-center md:w-[40%]">
          <CreateProtectedChannelForm />
        </div>
        <div className="w-full h-[45%] px-[60px] md:px-0 md:self-center md:w-[40%]">
          <CreatePrvPbcChannel />
        </div>
      </div>
    )
}
export default CreateChannel;