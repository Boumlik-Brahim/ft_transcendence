'use client';
import React, { ReactNode, useState } from 'react';
import Image from 'next/image';
import Friends from './friends';

interface Props {
    isOpen : boolean,
    setClose : (isOpen  : boolean) =>  void
}

const Popup = ({isOpen, setClose} : Props) => {

    const [inputValue, setInputValue] = useState<string>('');

    return (
        <div className={`absolute top-0 bottom-0 right-0 left-0 ${isOpen ? 'block' : 'hidden'}`} onClick={() => setClose(false)}>
            <div className='absolute inset-0 backdrop-blur-md bg-primary/30'>
            </div>
            <div className='flex justify-center items-center h-full w-ful'>
                <div className='p-2 z-10 w-[80%] md:w-[793px] h-auto bg-white rounded-lg relative' onClick={e => {e.stopPropagation()}}>
                    <span
                        onClick={() => setClose(false)}
                        className='absolute right-2 cursor-pointer top-2 block rounded'>
                        <Image width="30" height="30" src='/closesquare.svg' alt="cross"/>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Popup