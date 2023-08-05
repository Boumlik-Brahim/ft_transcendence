'use client'
import Friendsbar from '../../../../components/Friendsbar'
import Image from "next/image"
import Link from 'next/link'
import { first, second, theerd } from '../../../../public'
import { leaderboard_list } from '../../../../constant'
import Search from '../../../../components/Search'
import Notification from '../../../../components/Notification'
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import { useParams } from 'next/navigation'
import Sidebar from '../../../../components/Sidebar'
import './leaderboard.css'

function page() {

  /* --------------------------- get userSession ID --------------------------- */
  const [userSession, setUserSession] = useState<string>("")
  useEffect(() => {
    const cookies = new Cookies();
    setUserSession(cookies.get('id'));
  }, [])
  /* ------------------------------------ - ----------------------------------- */

  return (

    <>
    { userSession &&
      (<>
        <Sidebar />
        <div className="layouts">
          <div className="my_container">

            <div className="wrapper relative">
              <Search id={userSession} />
              <div className="md:block absolute right-[0px] top-[0px] hidden">
                <Notification userId={userSession} userSession={userSession}/>
              </div>
            </div>
            <div className="wrapper relative"> <p className="title">Leaderboard</p> </div>


            <div className="wrapper">
              <ul className='flex flex-col gap-[40px] w-full'>
                {
                  leaderboard_list.map((ply, index) => (
                    <li key={index} className='flex w-full items-center gap-[10px]'>
                      {
                        index == 0 ? (<Image src={first} width={45} alt="first"/>)
                        : index == 1 ? ((<Image src={second} width={45} alt="first"/>))
                        : index == 2 ? ((<Image src={theerd} width={45} alt="first"/>))
                        : (
                          <p className='text-[1.5rem] text-primary w-[50px] flex items-center justify-center'>
                            {index + 1}
                          </p>
                        )
                        
                      }

                      <div className='flex items-center justify-between h-[50px] pr-[20px] min-w-[200px] w-full gradients rounded-full'>
                        <Link href={`profile/${ply.id}`} className='flex items-center gap-[10px] max-w-[100px] xs:max-w-[200px]'> 
                          <Image src={ply.avarat} width={70} alt="avatar" /> 
                          <p className='text-xs xs:text-sm font-semibold text-primary'>{ply.name}</p>
                        </Link>
                        <p className='text-s font-semibold text-primary'>
                          {ply.point}
                        </p>
                      </div>

                    </li>
                  ))
                }
              </ul>
            </div>

          </div>
          <Friendsbar userId={userSession} userSessionId={userSession} />
        </div> 
        </>
      )
    }
    </>
  )
}

export default page