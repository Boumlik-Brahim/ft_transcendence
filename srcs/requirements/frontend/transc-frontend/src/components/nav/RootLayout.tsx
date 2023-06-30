
import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
import Nav from './Nav';


import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface Props {
    title: string;

}

export default function RootLayout({title} : Props){
    const isCreateChannelOn = useSelector((state: RootState) => state.createChannelToggle);
    const isHeaderOn = useSelector((state: RootState) => state.toggleNavigation);
    
    return(

<div className={`${"md:grid md:grid-cols-12  lg:grid-cols-12 2xl:grid-cols-12  h-screen flex flex-col "}`}> {/* grid grid-cols-10 h-screen lg:grid-cols-12  */}
    {/* <Sidebar /> */}
    <Nav 
        title = {title}  
    />
    {!isHeaderOn.toggleNavigationBar && (<main className={`${ !isCreateChannelOn.createChannelBtnToggled ? "md:col-span-10 lg:col-span-9  2xl:col-span-9 flex-1" :"col-span-full" }`}> {/*col-span-8 sm:col-span-7 lg:col-span-9*/}
        <Outlet />
    </main>)}
</div>

);
}