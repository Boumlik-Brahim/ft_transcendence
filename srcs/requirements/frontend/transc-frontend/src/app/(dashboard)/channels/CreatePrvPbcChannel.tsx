"use client"
import Input from "./Input";
import { useDispatch, useSelector } from 'react-redux'; 
import { prvChannelOn, prvChannelOff } from '../../store/reducer';
import { RootState } from '../../store/store';
import { constrainedMemory } from "process";

function CreatePrvPbcChannel() {
    const isPrivateChannelOn = useSelector((state: RootState) => state.togglePrivate);
    const dispatch = useDispatch();
    const handleClick = () => {
       
            dispatch(prvChannelOn())
    }
    return (
        <>
            <div className="w-full h-[20%] flex items-center justify-between mb-[15px]">
                <div>
                    <h1 className="font-poppins font-bold text-base text-white  uppercase leading-6 tracking-wider md:text-[25px]">
                       {
                        isPrivateChannelOn.privateToggled 
                        ? 
                        "Private"
                        :
                        "Public"
                        }
                    </h1>
                </div>
                <div className=" flex ">
                    <span className="text-[12px] text-white font-poppins font-light pr-[10px] md:pr-[13px] tracking-wider ">
                        private
                    </span>
                    <label
                        htmlFor="toogleA"
                        className="flex items-center cursor-pointer"
                        
                    >
                        <div className="relative">
                            <input id="toogleA" type="checkbox" className="sr-only" />
                            <div className="w-[34px] h-[14px] bg-white rounded-full shadow-inner "></div>
                            <div className="dot absolute w-[22px] h-[22px] bg-channel-500 rounded-full shadow -left-1 -top-[4px] transition " onClick={handleClick}></div>
                        </div>
                    </label>
                </div>
            </div>
            <Input
                holder="name"
                type="text"
            />
            <button className="w-full text-white font-poppins font-semibold text-xs  leading-4 tracking-widest rounded-full  h-[37px] btn-background md:h-[43px] md:border-2">
                Create
            </button>
            
        </>
);
}
export default CreatePrvPbcChannel;