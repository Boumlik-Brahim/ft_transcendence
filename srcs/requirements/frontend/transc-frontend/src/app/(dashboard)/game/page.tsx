'use client';
import React, { useEffect, useState } from 'react'
import Popup from './popup'
import Player from './player';
import Friends from './friends';
import { OnlineFriends } from '../../../../constant';
import Image from 'next/image';
import { socket } from './socket';
import { data } from 'autoprefixer';

interface CreateGameType {
  invitedId? : string, 
  creatorId : string, 
  isRamdomOponent : boolean
}

const Game = () => {
  const [isOpen, setClose] = useState<boolean>(false)
  const [oponentName, setOponentName] = useState<string>('');
  const [isConnected, setIsconnected] = useState<boolean>(socket.connected);
  const myId = "ddddd5555555";

  const createGame = (isRamdomOponent : boolean, invitedId? : string) => {
    const data : CreateGameType = {
      invitedId : invitedId,
      creatorId : myId,
      isRamdomOponent
    }
    // if (isConnected) {
      socket.emit('createGame', data);
    // }
    // else
      console.log('fode');
  }

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    }
  }, []);
  
  socket.on('Success', data => console.log(data));

  const playAgainstRndom = () => {
    console.log("ok")
    createGame(true);
  }

  return (
      <div className='flex items-start justify-center lg:gap-2 w-full h-[100vh]'>
        <div className='mt-5 h-full w-full lg:w-[70%]'>
          <h1 className='text-[30px] text-center text-primary m-10 font-bold game_font'>Play</h1>
          <div className='md:flex items-sart justify-center gap-2 m-auto'>
            <div className='flex flex-col-reverse md:flex-col'>
              <Player playerId={1} inputValue={oponentName} setInputValue={setOponentName} />
              <button className='border-2 gradient-bg shadow-xl ml-auto mr-auto md:mr-0 text-primary text-[20px] p-2 w-[268px] h-[61px] rounded-[40px] md:ml-4 mt-10 hover:bg-primary ease-in duration-300 hover:text-white hover:border-none' onClick={playAgainstRndom}>
                Random player
              </button>
            </div>
            <div className='flex flex-col'>
              <Player inputValue={oponentName} setInputValue={setOponentName}/>
              <Friends _name={oponentName} setName={setOponentName} createGame={createGame} />
            </div>
          </div>
        </div>
        <div className='w-[30%] h-full hidden lg:flex justify-center items-center '>
          <div className='h-[90%] m-2 border w-[400px] rounded-[40px] gradient-bg p-4 '>
            <h1 className='game_font mt-5 text-center '> Online  Players ({OnlineFriends?.length})</h1>
            <div className='mt-10'>
              {
                OnlineFriends.map((user, index) => (
                  <div className='w-full flex justify-between items-center mt-5' key={index}>
                    <div className='flex gap-3 items-center w-[50%]'>
                      <div className='h-auto m-auto'>
                        <Image src={user.avarat} height='61' width='61' alt='no player' />
                      </div>
                      <h1 className='text-primary text-[12px] font-[700]'>{user.name}</h1>
                    </div>
                    <button className='p-1 border text-[10px] text-primary border-primary rounded-[40px] w-[80px] hover:bg-primary hover:text-white'>challenge</button>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <Popup isOpen={isOpen} setClose={setClose}></Popup>
      </div>

  )
}

export default Game