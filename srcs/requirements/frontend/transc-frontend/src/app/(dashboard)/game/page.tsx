'use client';
import React, { useState } from 'react'
import Popup from './popup'
import Player from './player';
import Friends from './friends';
import Sidebar from '../../../../components/Sidebar';

const Game = () => {
  const [isOpen, setClose] = useState<boolean>(false)
  const [oponentName, setOponentName] = useState<string>('');
  return (
      <div className='flex items-start justify-center lg:gap-2 w-full h-[100vh]  '>
        <div className='mt-5 h-full w-full lg:w-[70%]'>
          <h1 className='text-[30px] text-center text-primary m-10 font-bold'>Play</h1>
          <div className='md:flex items-sart justify-center gap-2 m-auto'>
            <div className='flex flex-col-reverse md:flex-col'>
              <Player playerId={1} inputValue={oponentName} setInputValue={setOponentName} />
              <button className='border-2 gradient-bg shadow-xl ml-auto mr-auto md:mr-0 text-primary text-[20px] p-2 w-[268px] h-[61px] rounded-[40px] md:ml-4 mt-10 hover:bg-primary ease-in duration-300 hover:text-white hover:border-none'>
                Random player
              </button>
            </div>
            <div className='flex flex-col'>
              <Player inputValue={oponentName} setInputValue={setOponentName}/>
              <Friends _name={oponentName} setName={setOponentName} />
            </div>
          </div>
        </div>
        <div className='w-[30%] h-full hidden lg:flex justify-center items-center '>
          <div className='h-[90%] m-2 border w-[400px] rounded-[40px] gradient-bg '>

          </div>
        </div>
      </div>

  )
}

export default Game