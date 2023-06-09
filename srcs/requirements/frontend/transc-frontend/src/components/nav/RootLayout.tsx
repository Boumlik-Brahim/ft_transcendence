
import Sidebar from "./Sidebar";

interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children } : Props){
    return(

<div className=" grid grid-cols-10 h-screen ">
    <Sidebar />
    <main className="col-span-8 sm:col-span-7">{children}</main>
</div>

);
}