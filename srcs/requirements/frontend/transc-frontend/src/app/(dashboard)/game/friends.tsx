'use client'
import React, { useEffect, useState } from 'react'

interface Props {
    _name : string,
    setName : (params : string) => void,
    setOponent : (params : string) => void,
    setIsRandom : (params : boolean) => void
}

const Friends = ({ _name, setName, setIsRandom, setOponent } : Props) => {

    const [users, setUsers] = useState<any[]>();

    const friends  = users;

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users`)
        .then((res) => res.json())
        .then((users) => {
            setUsers(users);
        });
    }, []);

    const handleClick = (id : string) => {
        setOponent(id);
        setName('');
        setIsRandom(false);
    }

    const namesfilter =  friends?.filter(friend => friend.name.includes(_name) && _name !== '');
    return (
        <div className='mt-4 bg-primary rounded-xl w-[252px] m-auto'>
            {
                namesfilter ?.map(({name, id}, index) => (
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