
import React from 'react'
import { avatar } from '../../../../../public'
import Image from 'next/image'
import Canvas from './canva'

const Page = () => {
    return (
        <div className='w-full h-[100vh] flex justify-center items-center shadow-2xl shadow-black'>
            <div className='w-[1000px] lg:w-[900px]  lg:h-[700px] rotate-90 border-4 lg:rotate-0 rounded-xl overflow-hidden  shadow-2xl shadow-gray-400'>
                <div className='h-[200px] w-[900px] m-0 p-10 hidden lg:flex justify-between items-center rotate-90 lg:rotate-0 bg-primary'>
                    <div className='flex gap-3 items-center'>
                      <div className='h-auto m-auto'>
                        <Image src={avatar} height='80' width='80' alt='no player' className='border-4 rounded-full' />
                      </div>
                      <h1 className='text-white text-[20px] font-[700]'>Player Name</h1>
                    </div>
                    <div className='flex gap-3 items-center'>
                      <h1 className='text-white text-[20px] font-[700]'>Oponent Name</h1>
                      <div className='h-auto m-auto'>
                        <Image src={avatar} height='80' width='80' alt='no player'  className='border-4 rounded-full' />
                      </div>
                    </div>
                </div>
                <div className='h-[500px] flex w-[1000px] lg:w-[900px] m-0'>
                    <div className='h-full w-[100px] bg-slate-400 flex lg:hidden justify-center items-start p-10'>
                        <div className='flex gap-1 items-center rotate-[270deg]'>
                            <h1 className='text-white  text-[15px] font-[700]'>Oponent Name</h1>
                            <div className='h-auto m-auto'>
                                <Image src={avatar} height='80' width='80' alt='no player' className='border-4 rounded-full' />
                            </div>
                        </div>
                    </div>
                    <div className=' w-[900px]'>
                        <Canvas></Canvas>
                    </div>   
                </div>
            </div>
        </div>
    )
}

export default Page