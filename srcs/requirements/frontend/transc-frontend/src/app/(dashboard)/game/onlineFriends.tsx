'use client';
import React, { useState } from 'react'
import { useEffect } from 'react'
import Image from 'next/image';
import Cookies from 'universal-cookie';

interface Props {
    setOponent : (params : string) => void,
    setIsRandom : (params : boolean) => void
}

interface User {
    name : string,
    Avatar : string,
    id : string,
    status : string
}

interface Friendship {
    id : string
    userId : string,
    friendId : string,
}


const OnlineFriends = ({ setOponent, setIsRandom } : Props) => {

    const [users, setUsers] = useState<User[]>();
    const cookie = new Cookies();
    const userId = cookie.get('id');

    const handleSelect = (id : string) => {
        setOponent(id);
        setIsRandom(false);
    }

    const getAllUsers = async (usersId : Friendship[]) => {
        if (usersId?.length > 0) {
            try {
                const NewUsers = await Promise.all(usersId.map( async(user) => {
                const id = userId === user.userId ? user.friendId : user.userId;
                    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${id}`);
                    if (response.ok) {
                        return await response.json();
                    }
                }));
                setUsers(NewUsers);
            }
            catch (error) {console.log(error)}   
        }
    }

    useEffect(()=> {
        fetch(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userId}/friend`)
        .then((res) => res.json())
        .then((users) => {
            getAllUsers(users)
        })
    }, [userId]);

    const OnlineFriends=  users?.filter(friend => friend.status === 'ONLINE');

    return (
        <div className='w-[30%] h-full hidden lg:flex justify-center items-center '>
            <div className='h-[100vh] w-full bg-primary p-4'>
                <h1 className='game_font mt-5 text-center text-white  '> Online  Players ({OnlineFriends?.length})</h1>
                <div className='mt-10'>
                {
                    OnlineFriends?.map((user, index) => (
                    <div className='w-full flex justify-around items-center mt-5' key={index}>
                        <div className='flex gap-3 items-center w-[50%]'>
                        <div className='h-auto m-auto relative'>
                            <Image src={user.Avatar} height='61' width='61' className='rounded-full border-2 border-green-500' alt='no player' />
                        </div>
                        <h1 className='text-primary text-[12px] font-[700]'>{user.name}</h1>
                        </div>
                        <button className='p-1 border text-white text-[10px]   rounded-[40px] w-[80px]  hover:text-white' onClick={() => handleSelect(user.id)}>
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