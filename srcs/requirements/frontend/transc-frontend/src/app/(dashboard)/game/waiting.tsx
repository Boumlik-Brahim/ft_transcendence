'use client';
import Image from 'next/image';
import { GIF } from '../../../../public';
import { closeCircle } from '../../../../public';
import Player from './player';
import Friends from './friends';
import { vs } from '../../../../public';
import { useState } from 'react';


interface Props {
    cancel : () => void,
    myId : string,
    oponentId : string | undefined
}

const Waiting = ({cancel, myId, oponentId} : Props) => {

    const setInput = (params : string) => {}

    return (
        <div className='flex flex-col justify-center items-center h-[90%] w-[90%] p-10  m-auto'>
            <div className='hidden md:flex items-sart justify-center gap-2 m-auto md:max-h-[348px] relative '>
                <div className='flex flex-col-reverse md:flex-col'>
                    <Player playerId={myId}  setInputValue={setInput} waiting={true} />
                </div>
                <div className='absolute top-[50%] md:block hidden'>
                    <Image src={vs} height='50' width='100' alt='no player' />
                </div>
                <div className='flex flex-col'>
                    <Player  playerId={oponentId} setInputValue={setInput} waiting={true} />
                </div>
            </div>
           <div className='p-2 z-10 w-[80%] md:w-[793px] h-auto rounded-lg relative gradient'>
               <div className='flex justify-between items-center w-full p-4'>
                    <h1 className='game_font text-primary  text-[10px] md:text-[15px]'>waiting your opponent...</h1>
                    <Image src={closeCircle}  alt='git' height='50' width='50' onClick={cancel}/>
               </div>
               <div className='w-full h-[400px] overflow-hidden mt-[4rem] p-5'>
                   <div className='h-full'>
                       <Image src={GIF}  alt='git' className='w-full h-full object-cover rouded-[500px] m-auto'/>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default Waiting