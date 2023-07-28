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
    setInputValue : (params : string) => void 
}

const Player = ({playerId, inputValue, setInputValue} : Props) => {

    const [user, setUser] = useState<any>();

    useEffect(() => {
        if (playerId)
        {
            fetch(`http://localhost:3000/users/${playerId}`)
            .then((res) => res.json())
            .then((user) => {
                setUser(user)
            })
        }
    }, [playerId])

    return (
        <div className='flex justify-center items-center p-2 w-[268px] h-[343px] border-2 rounded-[40px] m-auto mt-10 md:m-4 gradient'>
            <div className='flex flex-col gap-y-6'>
                <div className='w-[200px] h-[200px] mr-auto ml-auto gradient_img'>
                    {
                        user ? 
                        (
                            <Image src={avatar} height='200' width='200' alt='player' />
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
                            <p className='text-[9px]  text-primary uppercase'>{user.created_at}</p>
                            <p> <span className=' bg-primary text-[9px] text-white p-[0.4rem] rounded ml-1'>Levl</span> {`4`} </p>
                        </div>
                    </div> 
                    ) 
                    :
                    (
                        <form className='mr-auto ml-auto'>
                            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='block m-auto w-[220px] p-2 h-[45px] border file:border-solid border-primary rounded-[42px]' placeholder='choose your oponent...' />
                        </form>
                    )
                }
            </div>
        </div>
    )
}

export default Player