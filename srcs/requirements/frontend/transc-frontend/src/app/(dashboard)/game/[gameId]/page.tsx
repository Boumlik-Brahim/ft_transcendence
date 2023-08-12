
'use client';

import { useEffect, useState } from 'react'
import { avatar } from '../../../../../public'
import Image from 'next/image'
// import { socket } from '../socket'
import Canvas from './canva'
import { useRouter } from 'next/navigation';
import Waiting from '../waiting';
import { getCookie } from 'cookies-next';
import Players from './players';
import { Link } from 'react-router-dom';
import Sidebar from "../../../../../components/Sidebar";
import Notification from '../../../../../components/Notification';
import { useSocket } from '@/app/socket';
import OnlineFriends from '../onlineFriends';
import Friendsbar from '../../../../../components/Friendsbar';


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
    winner : null | String
}

interface Player {
    id : String,
    paddleX : number,
    paddleY : number,
    score : number
}

interface CreateGameType {
    invitedId? : String, 
    creatorId : String, 
    isRamdomOponent : boolean
}

const Page = ( {params} : any) => {
    const router = useRouter();
    const [gameSate, setGameSate] = useState<string | undefined>('started');
    const [gameData, setGameData] = useState<GameEntity | undefined>();
    const userId = getCookie('id') as string;
    const oponentId = userId === gameData?.player1.id ? gameData.player2.id : gameData?.player1.id;
    const id = params.gameId;
    const socket = useSocket();

    const handlePause = () => {
        if (!socket.connected) return;
        socket.emit('pauseOrStart', {gameId : id, userId})
    }

    const handleCancel = () => {
        if (!socket.connected) return;
        socket.emit('cancelGame', {gameId : id, userId})
    }

    useEffect(() => {
        socket.emit('joinGame', {gameId : id, userId});
        
        document.addEventListener('keydown', (event) => {
            const code = event.code;
            if (code === 'ArrowRight' || code === 'ArrowLeft')
            socket.emit(code, {gameId : id, userId})
        }, false);
        
        socket.on('error_access', () => {
            router.push('/game')
        })
        
        socket.on('gameData', (data) => setGameData(data))
        
        socket.on('gameSate', data => {
            const { state } = data;
            setGameSate(state);
        })

        return () => {
                socket.off('joinGame');
                socket.off('error_access');
                socket.off('gameData');
                socket.off('gameSate');
                socket.emit('quiteGame', {gameId : id, userId});
                document.addEventListener('keydown', () => {});
            }
        }, []);
        const createGame = (isRamdomOponent : boolean, id : string | undefined) => {}

        console.log(gameSate, gameData);
        return (
            <>
            
                <Sidebar/>
            <div className='layouts bg-gray-200'>
                <div className="my_container"> 
        
                <div className="wrapper relative">
              <div className="md:block absolute right-[0px] top-[0px] hidden">
                <Notification userId={userId} userSession={userId} />
              </div>
            </div>
                <div className='w-full h-full flex flex-col items-center justify-center relative '>
                    {
                        ( gameSate && gameSate != 'waiting') && (
                            <div className='w-full h-full flex flex-col justify-center items-center'>
                                <div className='flex flex-col  flex-1 w-auto justify-center items-center p-2'>
                                    {
                                        gameData && <Players userId_1={gameData.player1.id as string}  userId_2={gameData.player2.id as string} />
                                    }
                                    <div className={`flex justify-center items-center h-[100%] md:h-[50%] border-4 overflow-hidden border-white md:border-t-0 lg:h-[75%] w-full lg:w-[75%] rounded-[20px] md:rounded-tl-[0px] md:rounded-tr-[0px] shadow-2xl`}>
                                        <Canvas gameData={gameData} gameState={gameSate}></Canvas>
                                    </div>
                                </div>
                                <div className='h-[50px] flex flex-wrap justify-center items-center '>
                                    <button className='bg-primary m-4 p-2 w-[150px] border border-primary text-white rounded-xl cursor hover:bg-white hover:text-primary' onClick={handleCancel}>
                                        cancel
                                    </button>
                                    <button className='bg-white m-4 p-2 border border-primary w-[150px] text-primary rounded-xl hover:bg-primary hover:text-white' onClick={handlePause}>
                                        {
                                            gameSate === 'pause' ? 'Start' : 'Pause'
                                        }
                                    </button>
                                </div>
                            </div>
                        )
                    }
                    {
                        (gameSate === 'waiting') && <Waiting cancel={handleCancel} myId={userId} oponentId={oponentId as string}></Waiting>
                    }
                </div>
                </div>
                <Friendsbar userId={userId} userSessionId={userId} />
            </div>
            </>
        )
}

export default Page

