
import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
import Nav from './Nav';
import { useState } from "react";


interface Props {
    title: string;

}

export default function RootLayout({title} : Props){
    const [isOpen, setIsOpen] = useState(false);

    return(

<div className="md:grid md:grid-cols-12  lg:grid-cols-12 2xl:grid-cols-12  h-screen flex flex-col "> {/* grid grid-cols-10 h-screen lg:grid-cols-12  */}
    {/* <Sidebar /> */}
    <Nav 
        title = {title} 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
    />
    {!isOpen && (<main className="md:col-span-10 lg:col-span-9  2xl:col-span-9 flex-1"> {/*col-span-8 sm:col-span-7 lg:col-span-9*/}
        <Outlet />
    </main>)}
</div>

);
}