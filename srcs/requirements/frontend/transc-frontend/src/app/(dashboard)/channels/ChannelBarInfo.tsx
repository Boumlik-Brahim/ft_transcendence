"use client"

import { useDispatch } from 'react-redux';
import { createChannelOn } from '../../store/reducer';

import { RootState } from '../../store/store';

function ChannelBarInfo({ title, btnVisibility }: { title: string, btnVisibility: string }) {
    const dispatch = useDispatch();
    const handleCreateChannelToggleOn = () => {
        dispatch(createChannelOn());
    }

    return (
        <>
            <div className="w-full h-[20%]  py-[28px] px-[10px]  flex items-center justify-between">
                <span className="font-poppins text-xs text-primary font-bold tracking-wider uppercase">
                    {title}
                </span>
                <button
                    className={`w-[60px] h-[25px] rounded-full  bg-primary font-poppins ${btnVisibility} text-white text-[9px] font-semibold  flex items-center justify-center md:w-[62px] md:h-[27px]`}
                    onClick={handleCreateChannelToggleOn}
                >
                    create
                </button>
            </div>
            <hr className="border-[1px] border-primary mt-[-10px]" />
        </>

    )
};

export default ChannelBarInfo;