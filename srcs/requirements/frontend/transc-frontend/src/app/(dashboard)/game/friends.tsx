'use client'
import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'

interface Props {
    _name : string,
    setName : (params : string) => void,
    setOponent : (params : string) => void,
    setIsRandom : (params : boolean) => void
}

interface Friendship {
    id : string
    userId : string,
    friendId : string,
}


const Friends = ({ _name, setName, setIsRandom, setOponent } : Props) => {

    const [users, setUsers] = useState<any[]>();
    const cookie = new Cookies();
    const userId = cookie.get('id');

    const friends  = users;

    const getAllUsers = async (usersId : Friendship[]) => {
        if (usersId?.length > 0) {
            try {
                const NewUsers = await Promise.all(usersId.map( async(user) => {
                const id = userId === user.userId ? user.friendId : user.userId;
                    const response = await fetch(`http://localhost:3000/users/${id}`);
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
        fetch(`http://localhost:3000/users/${userId}/friend`)
        .then((res) => res.json())
        .then((users) => {
            getAllUsers(users)
        })
    }, [userId]);

    const handleClick = (id : string) => {
        setOponent(id);
        setName('');
        setIsRandom(false);
    }

    const namesfilter =  friends?.filter(friend => friend.name.includes(_name) && _name !== '');
    return (
        <div className='mt-4 bg-primary rounded-xl w-[252px] m-auto'>
            {
                namesfilter?.map(({name, id}, index) => (
                    <div className='flex m-auto p-1 w-[252px] h-[62px] cursor-pointer' key={index} onClick={() => handleClick(id)}>
                        <div className={`w-full flex items-center m-2 justify-between ${ namesfilter.length === index + 1 ? '' : 'border-b-[1px]'}`}>
                            <div className=' flex items-center gap-2 text-white'>
                                <div className='h-[30px] w-[30px] bg-slate-200 rounded-full'>

                                </div>
                                <p>{name}</p>
                            </div>
                            <div className='h-[10px] w-[10px] bg-green-700 rounded-full'>

                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Friends