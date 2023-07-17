'use client';
import Image from 'next/image';
import { GIF } from '../../../../public';

const Waiting = () => {

    return (
        <div className='flex justify-center items-center h-full w-ful p-10'>
           <div className='p-2 z-10 w-[80%] md:w-[793px] h-auto rounded-lg relative'>
               <div className='flex justify-between items-center w-full p-4'>
                    <h1 className='game_font text-primary  text-[10px] md:text-[15px]'>waiting your opponent...</h1>
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