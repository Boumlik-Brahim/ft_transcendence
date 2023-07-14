'use client';
import React, { ReactNode, useState } from 'react';
import Image from 'next/image';
import { GIF } from '../../../../public';

interface Props {
    isOpen : boolean,
    setClose : (isOpen  : boolean) =>  void
}

const Popup = ({isOpen, setClose} : Props) => {

    return (
        <div className={`absolute p-4 top-0 bottom-0 right-0 left-0 ${isOpen ? 'block' : 'hidden'}`} onClick={() => setClose(false)}>
            <div className='absolute inset-0 backdrop-blur-md bg-primary/30'>
            </div>
            <div className='flex justify-center items-center h-full w-ful p-10'>
                <div className='p-2 z-10 w-[80%] md:w-[793px] h-auto bg-white rounded-lg relative' onClick={e => {e.stopPropagation()}}>
                    <div className='flex justify-between items-center w-full p-4'>
                         <h1 className='game_font text-primary  text-[10px] md:text-[15px]'>waiting your opponent...</h1>
                        <button className='p-1 border text-[10px] text-primary border-primary rounded-[40px] w-[80px] hover:bg-primary hover:text-white'>Leave</button>
                    </div>
                    <div className='w-full h-[400px] overflow-hidden mt-[4rem] p-5'>
                        <div className='h-full'>
                            <Image src={GIF}  alt='git' className='w-full h-full object-cover rouded-[500px] m-auto'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup