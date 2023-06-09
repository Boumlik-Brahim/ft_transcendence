import { increment, decrement } from "../../store/reducer";
import { useDispatch } from "react-redux";
import {useMedia} from 'react-use';
import {CgProfile} from 'react-icons/cg';
// import {FaRankingStar} from "react-icons/all-files/fa/FaRankingStar"

export const Nav = () => {
    // const disp = useDispatch();
    const isWide = useMedia('(min-width: 640px)');
 return (
<>  
    {isWide ?  <p>Yes it is</p> : <p>No it's Not</p>}
    <div className=" h-screen grid grid-rows-[1fr,4rem] w-screen   ">
        <div className=" row-span-1">
            <h2>content</h2>
        </div>
        <div className=" row-span-1 bg-primary-900 items-center max-h-[4rem] text-white cursor-pointer	w-screen">
            <div className="flex justify-around  items-center h-full text-xl ">
                <span className="flex justify-center flex-col items-center text-2xl">
                    {/* <i className="fa-solid fa-user text-slate-200 md:text-black"></i> */}
                    <CgProfile size={25}/>
                    <p className="text-xs font-primary font-medium leading-5 tracking-wider text-slate-200">Profile</p>
                </span>
                <span className="flex justify-center flex-col items-center">
                    {/* <i className="fa-solid fa-ranking-star text-slate-200"></i> */}
                    {/* <FaRankingStar/> */}
                    <p className="text-xs font-primary font-medium leading-5 tracking-wider text-slate-200">LeaderBoard</p>
                </span>
                <span className="flex justify-center flex-col items-center">
                    <i className="fa-sharp fa-solid fa-trophy text-slate-200"></i>
                    <p className="text-xs font-primary font-medium leading-5 tracking-wider text-slate-200">Achievements</p>
                </span>
                <span className="flex justify-center flex-col items-center">
                    <i className="fa-solid fa-users text-slate-200"></i>
                    <p className="text-xs font-primary font-medium leading-5 tracking-wider text-slate-200">Chat</p>
                </span> 
                <span className="flex justify-center flex-col items-center">
                    <i className="fa-solid fa-power-off text-slate-200"></i>
                    <p className="text-xs font-primary font-medium leading-5 tracking-wider text-slate-200">Logout</p>
                </span>
            </div>
        </div>
    </div>
    {/* <BottomNavbar 
        icon = "fa-solid fa-user"
        title =  ""

    /> */}
</>
);
}