"use client"

import Image from 'next/image'
import Link from 'next/link'
import { SideLinks } from '@/../constant'
import { useState } from 'react';
import { close_b, logo_b, logo_w, logout_b, logout_w, menu_b, notification_b } from '../public';
import { useSelector } from 'react-redux';
import { RootState } from '../src/app/store/store';
import { useEffect } from "react";
import Cookies from 'universal-cookie';
import { useParams } from 'next/navigation';
import Notification from './Notification';
import { useRouter } from 'next/navigation';


function getPath(nav: string, id: string) {
    if (nav === 'profile')
        return `profile/${id}`
    else if (nav === 'achievements')
        return `achievements/${id}`
    return nav
}

function Sidebar() {
    const router = useRouter();
    /* ------------------------- get url ID from url ------------------------- */
    const { userId } = useParams();
    const cookies = new Cookies();
    /* ------------------------------------ - ----------------------------------- */
  
    /* ----------------------------- get the USER ID ---------------------------- */
    const [userSession, setUserSession] = useState<string>("")
    const [accessToken, setAccessToken] = useState<string>("")

    useEffect(() => {
        setUserSession(cookies.get('id'));
        setAccessToken(cookies.get('accessToken'));
    }, [])
    /* ------------------------------------ - ----------------------------------- */

    const isCreateChannelOn = useSelector((state: RootState) => state.createChannelToggle);

    const isCreateChannelPopUpOn = useSelector((state: RootState) => state.createChannelPopUpToggle);
    const [toggle, setToggle] = useState(true);
    //-------------LogOut ----------------//
    const updateData = {
        status: "OFFLINE",
    }
    const handleLogOut = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userId}/userStatus`,{
            method: 'PATCH',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        })
        cookies.remove('accessToken', { path: '/' });
        router.push(`${process.env.NEXT_PUBLIC_APP_URI}:5173/`);
    }
    
    //--------------------------------------//

    return (
        <>

            <div className="header">
                <button onClick={() => setToggle(!toggle)}>
                    {
                        toggle ? (<Image key='menu' src={menu_b} alt="menu" className='xs:w-[40px] w-[30px]' />) :
                            (<Image key='close' src={close_b} alt="close" className='xs:w-[40px] w-[30px]' />)
                    }
                </button>

                <Image key='menu' src={logo_b} alt="menu" className='xs:w-[50px] w-[40px]' />

                <div className='xs:w-[50px] w-[40px]'>
                    <Notification userId={userId} userSession={userSession}/>
                </div>
                {/* <Image key='menu2' src={notification_b} alt="menu" className='xs:w-[40px] w-[30px]' /> */}
            </div>

            {
                !toggle && (
                    <nav className='sidebarmd '>
                        <ul>
                            {SideLinks.map((link, index) => (
                                <Link href={`/${getPath(link.name, userSession)}`} key={index}>

                                    <li key={index} className='li_sidebar'>
                                        <Image key={link.name} src={link.icon_b} width={30} alt={link.name} />
                                        <p className='text-primary hidden xs:flex'>
                                            {link.name}
                                        </p>
                                    </li>
                                </Link>
                            ))}
                        </ul>

                        <button onClick={handleLogOut} className='li_sidebar'>
                            <Image key='logout' src={logout_b} width={30} alt="logout" />
                            <p className='text-primary hidden xs:flex'>
                                logout
                            </p>
                        </button>
                    </nav>
                )
            }
            <nav className={`${!isCreateChannelOn.createChannelBtnToggled ? "sidebarlg" : "hidden"}`}>
                <div className='side_logo'>
                    <Image key='logo' src={logo_w} width={60} alt="logo" />
                </div>
                <ul>
                    {SideLinks.map((link, index) => (
                        <Link href={`/${getPath(link.name, userSession)}`} key={index}>

                            <li key={index} className='li_sidebar'>
                                <Image key={link.name} src={link.icon_w} width={60} alt={link.name} />
                            </li>
                        </Link>
                    ))}
                </ul>

                <button onClick={handleLogOut} className='li_sidebar'>
                    <Image key='logout' src={logout_w} width={60} alt="logout" />
                </button>
            </nav>

            <nav className={`${"sidebarxl"} ${isCreateChannelPopUpOn.createChannelPopUpToggled ? "blur-sm bg-gray-400" : ""} `}>
                <div className='side_logo'>
                    <Image key='logo' src={logo_w} width={100} alt="logo" />
                </div>
                <ul>
                    {SideLinks.map((link, index) => (
                        <Link href={`/${getPath(link.name, userSession)}`} key={index}>
                            <li key={index} className='li_sidebar'>
                                <Image key={link.name} src={link.icon_b} width={30} alt={link.name} />
                                <p className='text-primary hidden xs:flex'>
                                    {link.name}
                                </p>
                            </li>
                        </Link>
                    ))}
                </ul>

                {/* <Link href='/'>
                    <div className='li_sidebar'>
                        <Image key='logout' src={logout_b} width={30} alt="logout" />
                        <p className='text-primary hidden xs:flex'>
                            logout
                        </p>
                    </div>
                </Link> */}
                <button onClick={handleLogOut}>
                    <div className='li_sidebar'>
                        <Image key='logout' src={logout_b} width={30} alt="logout" />
                        <p className='text-primary hidden xs:flex'>
                            logout
                        </p>
                    </div>
                </button>
            </nav>
        </>
    )

}

export default Sidebar
