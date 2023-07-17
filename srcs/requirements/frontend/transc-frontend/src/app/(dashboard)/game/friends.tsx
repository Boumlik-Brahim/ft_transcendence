import React from 'react'

interface Props {
    _name : string,
    setName : (params : string) => void,
    createGame : (params : boolean, invitedId : string) => void
}

const Friends = ({ _name, setName, createGame } : Props) => {

    const friends  = [
        {
            name : 'fode'
        },
        {
            name : 'fode'
        },
        {
            name : 'fode'
        },
        {
            name : 'fode'
        },
        {
            name : 'xode'
        },
        {
            name : 'fode'
        },
    ];
    const namesfilter =  friends.filter(friend => friend.name.includes(_name) && _name !== '');

    const handleClick = (invitedId : string) => {

    }

  return (
    <div className='mt-4 bg-primary rounded-xl w-[252px] m-auto'>
        {
            namesfilter?.map(({name}, index) => (
                <div className='flex m-auto p-1 w-[252px] h-[62px] cursor-pointer' key={index} onClick={() => setName("")}>
                    <div className={`w-full flex items-center m-2 justify-between ${ namesfilter.length === index + 1 ? '' : 'border-b-[1px]'} `}>
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