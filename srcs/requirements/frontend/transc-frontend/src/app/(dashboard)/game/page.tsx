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
import Notification from '../../../../components/Notification';


interface CreateGameType {
  invitedId? : String, 
  creatorId : String, 
  isRamdomOponent : boolean
}

const Game = () => {
  const [oponentName, setOponentName] = useState<string>('');
  const [oponentId, setIOponnentId] = useState<string>();
  const [isRamdom, setIsramdom] = useState<boolean>(true);
  const myId : string = getCookie('id') as string;
  console.log(getCookie('accessToken'), 'token');
  const router = useRouter();
  const socket = useSocket();


  console.log(typeof(getCookie('id')), 'type')

  const createGame = (isRamdomOponent : boolean, id : string | undefined) : void => {
    console.log('fode')
    if (!socket) return;
    console.log('oulare')
    if (!socket.connected) return ;
    console.log('oulare')
    if (myId) {
      const data : CreateGameType = {
        invitedId : id,
        creatorId : myId,
        isRamdomOponent
      }
      socket.emit('createGame', data);
      console.log("inside")
    }
  }
  
  useEffect(() => {
    if (socket)
    {
      socket.connect();
  
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
        socket.disconnect();
      }
    }
  }, [myId]);


  return (
      <>
      <Sidebar />
      <div className='flex  items-start justify-center lg:gap-2 w-full h-[100vh] '>
        <div className='mt-5 h-auto w-full flex flex-col items-center justify-center lg:w-[70%] '>
          <div className='flex items-center justify-around w-full'>
            <h1 className='text-[30px] text-center text-primary m-10 font-bold game_font'>Play</h1>
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
        </div>
        <OnlineFriends  createGame={createGame} />
      </div>
    </>

  )
}

export default Game