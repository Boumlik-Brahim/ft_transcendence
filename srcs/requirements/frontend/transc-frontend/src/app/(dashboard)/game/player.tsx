'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { question } from '../../../../public'
import { PlayerFake } from '../../../../constant'
import { avatar } from '../../../../public'
import axios from 'axios'

interface Props {
    playerId? : string,
    inputValue? : string,
    setInputValue : (params : string) => void,
    waiting? : boolean,
}

const Player = ({playerId, inputValue, setInputValue, waiting} : Props) => {

    const [user, setUser] = useState<any>();
    const [level, setLevel] = useState<number>(0)

     const utcDateString = user?.created_at
     const getUserSat = async () => {
        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${playerId}/userStat`);
             if (response.ok) {
                const data = await response.json();
                setLevel(data.rate);
             }
        }
        catch (error) {  console.log(error) }

     }

    useEffect(() => {
        if (playerId)
        {
            fetch(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${playerId}`)
            .then((res) => res.json())
            .then((user) => {
                setUser(user)
            })
            getUserSat()

        }
    }, [playerId])

    return (
        <div className='flex justify-center items-center p-2 w-[268px] h-[343px] border-2 rounded-[40px] m-auto mt-10 md:m-4 gradient'>
            <div className='flex flex-col gap-y-6'>
                <div className='w-[200px] h-[200px] mr-auto ml-auto gradient_img'>
                    {
                        user ? 
                        (
                            <Image src={user.Avatar} height='200' width='200' className='rounded-full' alt='player' />
                        )
                        :
                        (
                            <div className='h-[100px] w-[100px] m-auto mt-[50px]'>
                                <Image src={question} height='100' width='100' alt='no player' />
                            </div>
                        )
                    }
                </div>
                {
                    user ? 
                    (
                    <div className=' flex w-full flex-col mr-auto ml-auto gap-y-1'>
                        <h1 className='text-center uppercase text-[15px] font-bold mb-2'>{user.name}</h1>
                        <div className='flex items-center justify-between '> 
                            <p className="font-normal text-primary text-xs md:text-lg hidden xs:block"> 
                            {new Date(user.created_at)
                            .toDateString()
                            .split(" ")
                            .slice(1)
                            .join(" ")}
                        </p>
                            <p> <span className=' bg-primary text-[9px] text-white p-[0.4rem] rounded ml-1'>Levl</span> {`${level}`} </p>
                        </div>
                    </div> 
                    ) 
                    :
                    (
                        !waiting && (
                            <form className='mr-auto ml-auto'>
                                <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='block m-auto w-[220px] p-2 h-[45px] border file:border-solid border-primary rounded-[42px]' placeholder='choose your oponent...' />
                            </form>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Player