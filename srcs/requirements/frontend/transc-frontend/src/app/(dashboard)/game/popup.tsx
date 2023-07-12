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
                    <div className='md:flex items-center h-auto md:h-[400px]  gap-2 w-full mt-20'>
                        <div className='md:w-[40%] p-2 mt-40 h-full'>
                            {/* <h1 className='text-center mp-5 text-[30px]  font-[10px] text-primary mb-10'>HUMAN</h1> */}
                            <form className=''>
                                <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='block m-auto w-[252px] p-2 h-[47px] border-2 file:border-solid border-primary rounded' placeholder='Search' />
                            </form>
                            <Friends _name={inputValue} setName={setInputValue}></Friends>
                        </div>
                        <div className='md:w-[20%] flex justify-center items-center p-2 h-[80%]'>
                            <div className='h-[300px] w-[1px] border-dashed border border-primary m-auto mt-auto'>
                            </div>                               
                            {/* <div className='h-[140px] w-[104px] left bg-white  text-center border-dashed absolute m-auto rounded-lg outline-dashed'>
                            </div> */}
                        </div>
                        <div className='md:w-[40%] p-2  md:mt-40 h-full text-center'>
                            <button className='p-3 bg-primary w-[200px] text-white rounded-lg m-auto'>JOIN A QUEUE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup