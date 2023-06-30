import { CgClose } from "react-icons/cg";

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { hideNav } from '../../store/reducer';


interface NavbarProps {
    onClick: (path: string) => void;
}

export default function SmallNav(props: NavbarProps) {
    const isHeaderOn = useSelector((state: RootState) => state.toggleNavigation);
    const dispatch = useDispatch();

    return (
        <div className={`${isHeaderOn.toggleNavigationBar ? "w-screen h-screen bg-primary-900" : "hidden"}`}>
            <div className=" w-full h-[15%] flex items-center justify-center">
                <CgClose className="w-[40px] h-[40px] text-white cursor-pointer" onClick={() => { dispatch(hideNav()) }} />
            </div>

            <div className=" w-full h-[70%] flex flex-col justify-center items-center">
                <div className="w-[128px] h-[56px]  mt-[12px] bg-white rounded-full flex items-center justify-center" onClick={() => props.onClick("/profile")}>
                    <img src="/imgs/profile.png" className="w-[30px] h-[30px]" />
                </div>
                <div className="w-[128px] h-[56px]  bg-white rounded-full  mt-[8px] flex items-center justify-center" onClick={() => props.onClick("/leaderboard")}>
                    <img src="/imgs/leaderboard.png" className="w-[30px] h-[30px] " />
                </div>
                <div className="w-[128px] h-[56px]  bg-white rounded-full  mt-[8px] flex items-center justify-center" onClick={() => props.onClick("/achievements")}>
                    <img src="/imgs/achievements.png" className="w-[30px] h-[30px]" />
                </div>
                <div className="w-[128px] h-[56px]  bg-white rounded-full mt-[8px] flex items-center justify-center" onClick={() => props.onClick("/channels")}>
                    <img src="/imgs/channels.png" className="w-[30px] h-[30px]" />
                </div>
                <div className="w-[128px] h-[56px]  bg-white rounded-full mt-[8px] flex items-center justify-center" onClick={() => props.onClick("/friends")}>
                    <img src="/imgs/friends.png" className="w-[30px] h-[30px]" />
                </div>
                <div className="w-[128px] h-[56px]  bg-white rounded-full  mt-[8px] flex items-center justify-center" onClick={() => props.onClick("/settings")}>
                    <img src="/imgs/settings1.png" className="w-[30px] h-[30px]" />
                </div>
                <div className="w-[128px] h-[56px]  bg-white rounded-full  mt-[8px] flex items-center justify-center" onClick={() => props.onClick("/game")}>
                    <img src="/imgs/play.png" className="w-[30px] h-[30px]" />
                </div>
            </div>

            <div className=" w-full h-[15%] flex items-center justify-center">
                <div className="w-[128px] h-[56px]  bg-white rounded-full  mt-[8px] flex items-center justify-center" onClick={() => props.onClick("/landingPage")}>
                    <img src="/imgs/logout.png" className="w-[30px] h-[30px]" />
                </div>
            </div>

        </div>


    );
}