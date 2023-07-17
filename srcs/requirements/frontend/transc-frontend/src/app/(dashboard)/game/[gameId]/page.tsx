
'use client';

import { useEffect, useState } from 'react'
import { avatar } from '../../../../../public'
import Image from 'next/image'
import { socket } from '../socket'
import Canvas from './canva'
import Waiting from '../waiting';



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
    const userId = '555433666666'
    const id = params.gameId;


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
    return (
        <div className='w-full h-[100vh]'>
            {
                (gameSate === 'started') && (
                    <div className='w-full h-[100vh] flex justify-center items-center'>
                        <div className={`w-[100%] md:w-[80%]`}>
                            <Canvas gameData={gameData}></Canvas>
                        </div>
                    </div>
                )
            }
            {
                (gameSate === 'waiting') && <Waiting></Waiting>
            }
        </div>
    )
}

export default Page


{/* <div className='h-[200px] w-[900px] m-0 p-10 hidden lg:flex justify-between items-center rotate-90 lg:rotate-0 bg-primary'>
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
</div> */}