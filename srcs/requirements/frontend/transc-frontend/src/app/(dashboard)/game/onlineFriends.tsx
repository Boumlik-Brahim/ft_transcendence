'use client';
import React, { useState } from 'react'
import { useEffect } from 'react'
import Image from 'next/image';
import { Socket } from 'engine.io-client';

interface Props {
   createGame : (bool : boolean, id : string) => void,
}

interface User {
    name : string,
    Avatar : string,
    id : string
}

const OnlineFriends = ({ createGame } : Props) => {

    const [users, setUsers] = useState<User[]>();
    const OnlineFriends= users;

    const handleChallenge = (id : string) => {;
        createGame(false, id);
    }

    useEffect(()=> {
        fetch(`${process.env.NEXT_PUBLIC_APP_URI}/users`)
        .then((res) => res.json())
        .then((users) => {
            setUsers(users);
        })
    });

    return (
        <div className='w-[30%] h-full hidden lg:flex justify-center items-center '>
            <div className='h-[90%] m-2 border w-[400px] rounded-[40px] gradient-bg p-4 mr-8'>
                <h1 className='game_font mt-5 text-center '> Online  Players ({OnlineFriends?.length})</h1>
                <div className='mt-10'>
                {
                    OnlineFriends?.map((user, index) => (
                    <div className='w-full flex justify-between items-center mt-5' key={index}>
                        <div className='flex gap-3 items-center w-[50%]'>
                        <div className='h-auto m-auto'>
                            <Image src={user.Avatar} height='61' width='61' className='rounded-full' alt='no player' />
                        </div>
                        <h1 className='text-primary text-[12px] font-[700]'>{user.name}</h1>
                        </div>
                        <button className='p-1 border text-[10px] text-primary border-primary rounded-[40px] w-[80px] hover:bg-primary hover:text-white' onClick={() => handleChallenge(user.id)}>
                            Challenge
                        </button>
                    </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
}

export default OnlineFriends