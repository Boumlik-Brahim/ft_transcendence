
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
    const [gameSate, setGameSate] = useState<string | undefined>();
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

        console.log(gameSate, gameData);
        return (
            <>
            
                <Sidebar/> 
            <div className='layouts'>
            <div className="my_container"> 
                <div className="wrraper bg-slate-300">
                <div className="md:block hidden absolute top-[150px] right-[200px]">
                    <Notification userId={userId} userSession={userId}/>
                </div>
                </div>
            
                <div className='w-full h-full flex flex-col items-center justify-center gap-1 relative '>
                    {
                        (gameSate === 'started' || gameSate === 'pause' || gameSate === 'stopped') && (
                            <div className='flex flex-col flex-1 w-full justify-center items-center  '>
                                {
                                    gameData && <Players userId_1={gameData.player1.id as string}  userId_2={gameData.player2.id as string} />
                                }
                                <div className={`flex justify-center items-center lg:min-w-[700px]  md:max-w-[65vw] max-w-[95vw] md:min-w-[50vw] h-[85vw] md:h-[50vh] p-2 md:w-[50vh] border-2 border-white shadow-2xl lg:h-[600px] ${ userId === gameData?.player1.id ? "rotate-[-90deg]" : "rotate-90"} 
                                md:rotate-0 `}>
                                    <Canvas gameData={gameData}></Canvas>
                                </div>
                                <div className='lg:min-w-[700px] md:max-w-[65vw] max-w-[95vw] h-[50px]  md:min-w-[50vw] mt-6 flex  items-center'>
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
                    {
                        (gameSate === 'finished' || gameSate === 'canceled') && (
                            <div className='w-full text- flex flex-col justify-center items-center'>
                                {
                                    gameData?.winner ? (
                                        gameData?.winner === userId ? 
                                        (
                                            <h1 className='text-[70px] text-primary uppercase font-bold'> You Won </h1>
                                        )
                                        :
                                        (
                                            <h1 className='text-[70px] text-red-400 uppercase font-bold' > You Lost </h1>
                                        )
                                    )
                                    :
                                    gameData?.winner === null && <h1 className='text-[70px] text-red-400 uppercase font-bold' > Draw </h1>
                                }
                                {/* <Link className='border-2 gradient-bg shadow-xl ml-auto mr-auto md:mr-0 text-primary text-[20px] p-2 w-[268px] h-[61px] rounded-[40px] md:ml-4 mt-10 hover:bg-primary ease-in duration-300 hover:text-white hover:border-none' to='/game'>
                                    Go on Game Page
                                </Link> */}
                            </div>
                        )
                    }
                </div>
                </div>
            </div>
            </>
        )
}

export default Page

