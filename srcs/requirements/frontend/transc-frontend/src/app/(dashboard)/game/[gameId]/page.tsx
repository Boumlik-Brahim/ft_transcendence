
'use client';

import { useEffect, useState } from 'react'
import { avatar } from '../../../../../public'
import Image from 'next/image'
import { socket } from '../socket'
import Canvas from './canva'
import Waiting from '../waiting';
import { getCookie } from 'cookies-next';



export interface GameEntity {
    id : String,
    W_screen : number,
    H_screen : number,
    ball_x : number,
    ball_y : number,
    vx : number,
    radius : number,
    vy : number,
    player1 : Player,
    player2 : Player,
    w_paddle : number,
    h_paddle : number,
    playerSpeed : number,
    scoreLimit : number,
    ball_speed : number,
    gameStatus : null | 'waiting' | 'started' | 'finished' | 'canceled',
    winner : null | String
}

export interface Player {
    id : String,
    paddleX : number,
    paddleY : number,
    score : number
}


const Page = ( {params} : any) => {
    const [error, setError] = useState<string | undefined>();
    const [gameSate, setGameSate] = useState<string | undefined>();
    const [gameData, setGameData] = useState<GameEntity | undefined>();
    const userId = getCookie('id');
    const id = params.gameId;

    console.log(gameSate, 5);

    useEffect(() => {

        socket.connect();

        socket.emit('joinGame', {gameId : id, userId});
        
        document.addEventListener('keydown', (event) => {
            const code = event.code;
            if (code === 'ArrowRight' || code === 'ArrowLeft')
                socket.emit(code, {gameId : id, userId})
          }, false);
    
        socket.on('error', message => {
          setError(message);
        })

        socket.on('gameData', (data) => setGameData(data))

        socket.on('gameSate', data => {
            const { state } = data;
            setGameSate(state);
        })
      
        return () => {
          socket.off('error')
          socket.off('joinGame')
          socket.off('gameData')
          socket.off('gameSate')
          document.addEventListener('keydown', event => {});
          socket.disconnect();
        }
      }, []);

    if (error) <div> { error } </div>
    console.log(gameSate);
    return (
        <div className='layouts'>
            {
                (gameSate === 'started') && (
                    <div className='flex flex-col flex-1 w-full justify-center items-center bg-[#E8E8E8] '>
                        <div className='
                            md:min-w-[700px]  p-2 lg:w-[700px]
                            border-2 border-white 
                            hidden lg:flex justify-between items-center  bg-primary'>
                            <div className='flex gap-3 items-center'>
                                <div className='h-auto m-auto'>
                                    <Image src={avatar} height='80' width='80' alt='no player' className='border-4 rounded-full' />
                                </div>
                                <h1 className='text-white text-[20px] font-[700]'>Player Name</h1>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <h1 className='text-white text-[20px] font-[700]'>Oponent Name</h1>
                                <div className='h-auto m-auto'>
                                    <Image src={avatar} height='80' width='80' alt='player'  className='border-4 rounded-full' />
                                </div>
                            </div>
                        </div>
                        <div className={`lg:min-w-[700px] md:max-w-[65vw] max-w-[95vw]  md:min-w-[50vw] h-[85vw] md:h-[50vh] pl-2 pr-2 pb-2 md:w-[50vh] border-2 border-white shadow-2xl lg:h-[600px] ${ userId === gameData?.player1.id ? "rotate-[-90deg]" : "rotate-90"} 
                         md:rotate-0 `}>
                            <Canvas gameData={gameData}></Canvas>
                        </div>
                    </div>
                )
            }
            {
                (gameSate === 'waiting') && <Waiting></Waiting>
            }
            {
                gameSate === ''
            }
        </div>
    )
}

export default Page

