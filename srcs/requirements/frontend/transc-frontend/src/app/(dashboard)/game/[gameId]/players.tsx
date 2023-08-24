import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { star } from '../../../../../public'

interface User {
    name : string,
    Avatar : string,
    id : string
}

interface Props {
    userId_1 : String,
    userId_2 : String,
}


const Players = ({userId_1, userId_2} : Props) => {

    const [player1, setPlayer1] = useState<User>()
    const [player2, setPlayer2] = useState<User>()


    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userId_1}`)
        .then((res) => res.json())
        .then((user) => {
            setPlayer1(user);
        });


        fetch(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userId_2}`)
        .then((res) => res.json())
        .then((user) => {
            setPlayer2(user);
        });


    }, [userId_1, userId_2]);
    return (
            <div className='
            w-full lg:w-[75%] h-[70px] md:h-[133px] 
            border-4 border-b-0 border-white rounded-tl-[20px] rounded-tr-[20px] 
            hidden md:flex justify-between items-center p-5 border-1 bg-primary'>
                {
                    player1 &&
                    <div className='flex gap-3 items-center'>
                        <div className='h-[80px] w-[80px] m-auto relative'>
                            <img src={player1.Avatar} height='80' width='80' alt='no player' className='border-4 rounded-full object-fill min-w-[80px] min-h-[80px]' />
                        </div>
                        <h1 className='text-white text-[20px] font-[700]'> {player1.name} </h1>
                    </div>
                }
                {
                    player2 &&
                    <div className='flex gap-3 items-center'>
                        <h1 className='text-white text-[20px] font-[700]'> {player2.name} </h1>
                        <div className='h-auto m-auto relative'>
                            <img src={player2.Avatar} height='80' width='80' alt='player'  className='border-4 rounded-full object-fill min-w-[80px] min-h-[80px] ' />
                       
                        </div>
                    </div>
                }
        </div>
    )
}

export default Players