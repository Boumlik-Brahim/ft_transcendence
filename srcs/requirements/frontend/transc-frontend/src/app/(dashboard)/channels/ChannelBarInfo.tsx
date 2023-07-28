"use client"

import { useDispatch, useSelector } from 'react-redux';
import { createChannelOn } from '../../store/reducer';

import { RootState } from '../../store/store';

import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from "react";
import { createChannelPopUpOn, createChannelPopUpOff } from '../../store/reducer';



function ChannelBarInfo({ title, btnVisibility }: { title: string, btnVisibility: string }) {

    const isMdScreen = useMediaQuery({ minWidth: 768 });
    const isLgScreen = useMediaQuery({ minWidth: 1200 });

    const [isMdScreenState, setIsMdScreen] = useState(false);
    const [isLgScreenState, setIsLgScreen] = useState(false);
    useEffect(() => {
        setIsMdScreen(isMdScreen);
        setIsLgScreen(isLgScreen);
    }, [isMdScreen, isLgScreen]);

    const dispatch = useDispatch();
    const currentPopUpStatus = useSelector((state: RootState) => state.createChannelPopUpToggle);

    const handleCreateChannelToggleOn = () => {
        const rs = isLgScreenState;
        switch (rs) {
            case true:
                dispatch(createChannelPopUpOn());
                break;
            case false:
                dispatch(createChannelOn());
                break;
            default:
                dispatch(createChannelOn());
        }
    }
    return (
        <>
            <div className="w-full h-[20%]  py-[28px] px-[10px]  flex items-center justify-between lg:px-[48px]">
                <span className="font-poppins text-xs text-primary font-bold tracking-wider uppercase lg:text-[14px]">
                    {title}
                </span>
                <button
                    className={`w-[60px] h-[25px] rounded-full  bg-primary font-poppins ${btnVisibility} text-white text-[9px] font-semibold  flex items-center justify-center md:w-[62px] md:h-[27px] lg:w-[67px] lg:h-[32px]`}
                    onClick={handleCreateChannelToggleOn}
                >
                    create
                </button>
            </div>
            <hr className="border-[1px] border-primary mt-[-10px] lg:mt-[-25px] xl:mt-[-35px] lg:mx-[48px]" />
        </>

    )
};


export default ChannelBarInfo;