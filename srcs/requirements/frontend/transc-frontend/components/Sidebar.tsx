"use client"

import Image from 'next/image'
import Link from 'next/link'
import { SideLinks } from '@/../constant'
import { useState } from 'react';
import { close_b, logo_b, logo_w, logout_b, logout_w, menu_b, notification_b } from '../public';

function Sidebar() {
    const [toggle, setToggle] = useState(true);
    return (
        <>
            <div className="header">    
                <button onClick={() => setToggle(!toggle)}>
                    {
                        toggle ? ( <Image key='menu' src={menu_b} alt="menu" className='xs:w-[40px] w-[30px]' /> ) :
                        ( <Image key='close' src={close_b} alt="close" className='xs:w-[40px] w-[30px]' /> )
                    }
                </button>

                <Image key='menu' src={logo_b} alt="menu" className='xs:w-[50px] w-[40px]' />
                
                <Image key='menu' src={notification_b} alt="menu" className='xs:w-[40px] w-[30px]' />
            </div>
            
            {
                !toggle && (
                    <nav className='sidebarmd'>
                        <ul>
                            { SideLinks.map((link, index) => (
                                <li key={index} className='li_sidebar'>
                                    <Image key={link.name} src={link.icon_b} width={30} alt={link.name} />
                                    <p className='text-primary hidden xs:flex'>
                                        {link.name}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        <div className='li_sidebar'>
                            <Image key='logout' src={logout_b} width={30} alt="logout" /> 
                            <p className='text-primary hidden xs:flex'>
                                logout
                            </p>
                        </div>
                    </nav>
                )
            }
            <nav className='sidebarlg'>
                <div className='side_logo'>
                    <Image key='logo' src={logo_w} width={60} alt="logo" />
                </div>
                <ul>
                    {SideLinks.map((link, index) => (
                        <li key={index} className='li_sidebar'>
                            <Image key={link.name} src={link.icon_w} width={60}  alt={link.name} />
                        </li>
                    ))}
                </ul>

                <div className='li_sidebar'>
                    <Image key='logout' src={logout_w} width={60} alt="logout" />
                </div>
            </nav>

            <nav className='sidebarxl'>
                <div className='side_logo'>
                    <Image key='logo' src={logo_w} width={100} alt="logo" />
                </div>
                <ul>
                    {SideLinks.map((link,index) => (
                        <Link href={link.name}>
                            <li key={index} className='li_sidebar'>
                                    
                                <Image key={link.name} src={link.icon_b} width={30}  alt={link.name} />
                                <p className='text-primary hidden xs:flex'>
                                    {link.name}
                                </p>
                            </li>
                        </Link>
                    ))}
                </ul>

                <Link href='/'>
                    <div className='li_sidebar'>
                        <Image key='logout' src={logout_b} width={30} alt="logout" />
                        <p className='text-primary hidden xs:flex'>
                            logout
                        </p>
                    </div>
                </Link>
            </nav>
        </>
    )
}

export default Sidebar