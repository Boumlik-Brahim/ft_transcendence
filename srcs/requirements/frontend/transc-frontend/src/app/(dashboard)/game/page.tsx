'use client';
import React, { useEffect, useState } from 'react'
import Popup from './waiting'
import Player from './player';
import Friends from './friends';
import OnlineFriends from './onlineFriends';
import Image from 'next/image';
// import { socket } from './socket';
import { useSocket } from '@/app/socket';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { vs } from '../../../../public';
import Sidebar from "../../../../components/Sidebar";
import './game.css'
import Notification from '../../../../components/Notification';


interface CreateGameType {
  invitedId? : String, 
  creatorId : String, 
  isRamdomOponent : boolean,
  maxScore : number
}

const Game = () => {
  const [oponentName, setOponentName] = useState<string>('');
  const [oponentId, setIOponnentId] = useState<string>();
  const [isRamdom, setIsramdom] = useState<boolean>(true);
  const [maxScore, setMaxScore] = useState<number>(10);
  const myId : string = getCookie('id') as string;
  const router = useRouter();
  const socket = useSocket();

  const createGame = (isRamdomOponent : boolean, id : string | undefined) : void => {
    if (!socket) return;
    if (!socket.connected) return ;
    if (myId) {
      const data : CreateGameType = {
        invitedId : id,
        creatorId : myId,
        isRamdomOponent,
        maxScore
      }
      socket.emit('createGame', data);
    }
  }
  
  useEffect(() => {
    if (socket)
    {
      socket.on('Success', data => {
        console.log(data);
        const { id } = data;
        router.push(`/game/${id}`)
      });
  
      socket.on('error', data => {
        console.log(data);
      })

    }
  
    return () => {
      if (socket) {
        socket.off('Success');
        socket.off('error')
      }
    }
  }, [myId, socket]);


  return (
      <>
      <Sidebar />
      <div className='flex  items-start justify-center lg:gap-2 w-full h-[100vh]'>
        <div className='mt-5 h-auto w-full flex flex-col items-center justify-center lg:w-[75%] '>
          <div className='flex items-center justify-around w-full'>
            <h1 className='text-[30px] text-center text-primary m-10 font-bold game_font text-press'>Play</h1>
            <div className="md:block hidden">
              <Notification userId={myId} userSession={myId}/>
            </div>

          </div>
          <div className='md:flex items-sart justify-center gap-2 m-auto md:max-h-[348px] relative'>
            <div className='flex flex-col-reverse md:flex-col'>
              <Player playerId={myId}  inputValue={oponentName} setInputValue={setOponentName} />
            </div>
           <div className='absolute top-[50%] md:block hidden'>
            <Image src={vs} height='50' width='100' alt='no player' />
           </div>
            <div className='flex flex-col'>
              <Player  playerId={oponentId} inputValue={oponentName} setInputValue={setOponentName}/>
              {
                oponentName !== '' && <Friends _name={oponentName} setName={setOponentName} setIsRandom={setIsramdom} setOponent={setIOponnentId}/>
              }
            </div>
          </div>
          {
            oponentName === '' && (
              <button 
              className='border-2 gradient-bg shadow-xl ml-auto mr-auto md:mr-0 text-primary text-[20px] p-2 w-[268px] h-[61px] rounded-[40px] md:ml-4 mt-10 hover:bg-primary ease-in duration-300 hover:text-white hover:border-none' 
              onClick={() => createGame(isRamdom, oponentId)}>
                { isRamdom ?  "Random player" : "Send Him Invitation" }
              </button>
            )
          }
          {
            oponentName === '' && (
            <form className='w-full flex justify-center items-center mt-10 gap-2'>
              <label className='text-[#3E3B6A] font-[400] text-[15px]' > Max Score </label>
              <input 
                type="range" id="numberInput" name="numberInput" min="10" max="100" step="10" 
                defaultValue={10} 
                className='range-input appearance-none bg-[#F3F3F3] w-[180px] md:w-[280px] rounded-full'
                onChange={e => setMaxScore(parseInt(e.target.value))}
              />
                <div className='text-[#3E3B6A] font-[400] text-[15px]'>
                  {maxScore}
                </div>
            </form>
            )
          }
        </div>
        <OnlineFriends  setOponent={setIOponnentId} setIsRandom={setIsramdom} />
      </div>
    </>

  )
}

export default Game