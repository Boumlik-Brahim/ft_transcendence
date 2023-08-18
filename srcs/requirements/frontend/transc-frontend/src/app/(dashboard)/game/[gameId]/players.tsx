import React, { useEffect, useState } from 'react'
import Image from 'next/image'

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
        fetch(`${process.env.NEXT_PUBLIC_APP_URI}/users/${userId_1}`)
        .then((res) => res.json())
        .then((user) => {
            setPlayer1(user);
        });

        fetch(`${process.env.NEXT_PUBLIC_APP_URI}/users/${userId_2}`)
        .then((res) => res.json())
        .then((user) => {
            setPlayer2(user);
        });


    }, []);
    return (
            <div className='
            md:min-w-[700px]  p-2 lg:w-[700px]
            border-2 border-white 
            hidden lg:flex justify-between items-center  bg-primary'>
                {
                    player1 &&
                    <div className='flex gap-3 items-center'>
                        <div className='h-auto m-auto'>
                            <Image src={player1.Avatar} height='80' width='80' alt='no player' className='border-4 rounded-full' />
                        </div>
                        <h1 className='text-white text-[20px] font-[700]'> {player1.name} </h1>
                    </div>
                }
                {
                    player2 &&
                    <div className='flex gap-3 items-center'>
                        <h1 className='text-white text-[20px] font-[700]'> {player2.name} </h1>
                        <div className='h-auto m-auto'>
                            <Image src={player2.Avatar} height='80' width='80' alt='player'  className='border-4 rounded-full' />
                        </div>
                    </div>
                }
        </div>
    )
}

export default Players