import { useState } from "react";


import { MdNotifications } from 'react-icons/md'

import { FiMenu } from 'react-icons/fi'

import { useMediaQuery } from '@react-hook/media-query';

import MediumNav from "./MediumNav";
import LargeNav from "./LargeNav";
import SmallNav from "./SmallNav";


import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { showNav, hideNav } from '../../store/reducer';

export default function Nav({ title }: {
    title: string,

}) {
    const isMdScreen = useMediaQuery('(min-width: 768px)');
    const currentState = useSelector((state: RootState) => state.toggle.isShoFriendListToggled) as boolean;
    const isCreateChannelOn = useSelector((state: RootState) => state.createChannelToggle);
    const [color, setColor] = useState("bg-primary-100");
    const dispatch = useDispatch();
    const isHeaderOn = useSelector((state: RootState) => state.toggleNavigation);

    const toggleColor = () => {
        dispatch(showNav());
        if (color === "bg-primary-100")
            setColor("bg-primary-900");
        else
            setColor("bg-primary-100");
    };
    if (isMdScreen) {
        dispatch(hideNav());
    }

    const handleClick = (path: string) => {
        window.location.href = path;
    };
    return (
        <>
            <div className={`${" md:col-span-2 lg:col-span-3 2xl:col-span-3 "}}`}>

                {/*----------------------------------------------------- + Header + for small devices---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
                <div className={`${(isMdScreen || isHeaderOn.toggleNavigationBar || currentState || isCreateChannelOn.createChannelBtnToggled) ? "hidden" : "flex md:grid"} ${" w-screen h-[10vh] items-center justify-between px-[27px] bg-primary-100       md:w-full md:h-full  md:col-span-2 flex md:bg-primary-900  "}`}>
                    <div className=" flex items-center">
                        <button
                            className="flex flex-col rounded justify-center items-center group  lg:hidden "
                            onClick={toggleColor}
                        >
                            < FiMenu className="text-primary-900 text-lg " />
                        </button>
                    </div>
                    <p className="text-lg font-poppins font-normal text-primary-900 ">{title}</p>
                    <MdNotifications className="text-[20px] text-primary-900 " />
                </div>

                {/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}



                {/*---------------------------------------- Side Bar for the large devices ------------------------------- */}
                <LargeNav onClick={handleClick} />


                {/*------------------------------------------ Side Bar for medium devices : ipads.. -----------------------------------------------------------------------*/}
                <MediumNav onClick={handleClick} />

                {/* this div gonna show up when the the toggle button is clicked */}

                <SmallNav onClick={handleClick} />
            </div>
        </>
    );
}





