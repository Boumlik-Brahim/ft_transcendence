'use client'
import Friendsbar from '../../../../../components/Friendsbar'
import { history_game } from '../../../../../constant'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import Search from '../../../../../components/Search'
import Sidebar from '../../../../../components/Sidebar'
import Notification from '../../../../../components/Notification'
import Achievements from '../../../../../components/Achievements'

function page() {
    /* ------------------------- get url ID from url ------------------------- */
    const { userId } = useParams();
    /* ------------------------------------ - ----------------------------------- */
    
  
    /* --------------------------- get userSession ID --------------------------- */
    const [userSession, setUserSession] = useState<string>("")
    useEffect(() => {
      const cookies = new Cookies();
      setUserSession(cookies.get('id'));
    }, [])
    /* ------------------------------------ - ----------------------------------- */
  
  return (
    userId && userSession && (
    <>
    <Sidebar />
      <div className='layouts'>
          <div className="my_container relative">
            <div className="wrapper relative">
              <Search id={userSession} />
              <div className="md:block absolute right-[0px] top-[0px] hidden">
                <Notification userId={userId} userSession={userSession}/>
              </div>
            </div>
            <Achievements userId={userId} userSessionId={userSession} />
          </div>
        <Friendsbar userId={userId} userSessionId={userSession} />
      </div>
    </>
  )
)

}

export default page