"use client"

import Image from "next/image"
import axios from "axios";
import { achievements, adduser_b, close_b, close_r, deleteuser_b, forbidden_b, game_b, notification_b } from "../../../../../public";
import Friendsbar from '../../../../../components/Friendsbar'
import '../profile.css'
import { history_game } from "../../../../../constant";
import { useParams } from "next/navigation";
import { createFriend, deleteFriend, updateFriend, usePendingUsers, useUserData } from "../utils";
import Search from "../../../../../components/Search";
import { use, useEffect, useState } from "react";
import { friendShip, users_int } from "../../../../../interfaces";
import FriendAction from "../../../../../components/FriendAction";
import { io } from 'socket.io-client';
export const socket = io('http://localhost:3000', { transports: ['websocket'] });
import Cookies from 'universal-cookie';




function page() {
  /* ------------------------- get url ID from url ------------------------- */
  const { userId } = useParams();
  console.log("user ID from useParams : ",userId)
  /* ------------------------------------ - ----------------------------------- */


  /* ------------------------------- fetch (ID) ------------------------------- */
  const userUrl = useUserData(userId);
  console.log("user Url from useParams : ",userUrl)

  /* ------------------------------------ - ----------------------------------- */


  /* ----------------------------- get the USER ID ---------------------------- */
  // const userSession = JSON.parse(sessionStorage.user);

  const cookies = new Cookies();
  const userSession = cookies.get('id');

  /* ------------------------------------ - ----------------------------------- */


  /* --------------------------------- status --------------------------------- */
  const [status, setStatus] = useState<string>("");
  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };
  /* ------------------------------------ - ----------------------------------- */


  /* ----------------------- get pending friend request ----------------------- */
  const [notification, setNotification] = useState<string>("");
  const [friendShip, setFriendShip] = useState<friendShip[]>([]);

  useEffect(() => {
    const fetchfriendShip = async () => {
      try {
        const response = userSession && await axios.get(`http://127.0.0.1:3000/users/${userSession}/pending`);
        response && setFriendShip(response.data);
      } catch (error) { console.log(error); }
    }
    fetchfriendShip();
  }, [notification, status]);


  /* ------------------------------------ - ----------------------------------- */


  /* ------------------------------- getPending ------------------------------- */
  const pendingUsers = usePendingUsers(friendShip);
  /* ------------------------------------ - ----------------------------------- */


  /* -------------------------- friend requset socket ------------------------- */
  useEffect(() => {
    socket.on('friendRequest', (data) => {
      console.log('friendRequest from', data.userId)
      setNotification(data.userId + data.status)
    });

    socket.on('friendCancel', (data) => {
      console.log('friendRequest from', data.userId + data.status)
      setNotification(data.userId)
    });

    socket.on('friendDeletion', (data) => {
      console.log('friendDeletion from', data.userId)
      setNotification(data.userId)
    });

    socket.on('friendCreation', (data) => {
      console.log('friendCreation from', data.userId)
      setNotification(data.userId + data.status)
    });

    return () => {
      socket.off('friendRequest');
    };
  }, [notification, pendingUsers]);
  /* ------------------------------------ - ----------------------------------- */





  return (

    <div className='layouts'>

      <div className="my_container">
        
          
            <div className="wrapper relative">
              <Search id={userSession} />
              <div className="md:block absolute right-[0px] top-[0px] hidden">
                <div className="relative">
                  <Image src={notification_b} width={40} alt="avatar" className="cursor-pointer" />
                  {
                    (pendingUsers && pendingUsers.length > 0) && (
                      <div className="absolute w-[12px] h-[12px] top-1 right-1 bg-red-400 rounded-full"></div>
                    )
                  }
                </div>
              </div>
              {
                (pendingUsers && pendingUsers.length > 0) && (
                  <ul className="w-[350px] flex flex-col gap-[40px] gradients absolute p-[2rem] top-[60px] right-0 z-10 shadow-lg">
                    {
                      pendingUsers?.map((user, index) => (
                        <li key={index} className="flex justify-between items-center">
                          <div className="relative flex items-center gap-[10px] w-[100px]">
                            <Image src={user.Avatar} width={50} height={50} alt="avatar" className="rounded-full max-w-[50px] max-h-[50px] w-[40px] h-[40px] object-cover" />
                            <p className="text-primary font-semibold">
                              {user.name}
                            </p>
                          </div>

                          <div className="friend_message flex gap-[7px] items-center">
                            <button className="bg-blue-500 font-medium text-sm text-white py-[5px] px-[10px] rounded-2xl hover:opacity-60"
                              onClick={async () => {
                                console.log("ACCEPT")
                                await updateFriend(user.id, userSession) && handleStatusChange("ACCEPTED");
                                socket.emit('friendCreation', {
                                  userId: user.id,
                                  status: "ACCEPTED"
                                });
                              }}
                            >Accept</button>

                            <Image src={close_r} width={30} alt="decline" className="cursor-pointer hover:opacity-60"
                              onClick={async () => {
                                console.log("DECLINE")
                                await deleteFriend(user.id, userSession) && handleStatusChange("NOFRIEND");
                                socket.emit('friendDeletion', {
                                  userId: user.id,
                                  status: "DELETION"
                                });

                              }} />
                          </div>
                        </li>
                      )
                      )
                    }
                  </ul>
                )
              }
            </div>
            {friendShip.length}


            
            <div className="wrapper">
              <div className="flex flex-col gap-[70px] items-center justify-center h-[500px] w-[200px] xs:w-[300px] md:w-[400px] gradients px-[1rem] py-[1rem] xs:py-[2rem]">
                {userUrl?.Avatar && <Image src={userUrl.Avatar} width={300} height={300} alt="avatar" className="rounded-full max-w-[300px] max-h-[300px] w-[270px] h-[270px] object-cover" />}
                <div className="flex flex-col items-center gap-[10px] w-[80%]">
                  <p id='name_user' className="font-semibold md:text-3xl text-center xs:text-xl text-[15px] text-primary w-full">{userUrl?.name}</p>
                  <div className='flex xs:justify-between justify-center w-full items-center'>
                    <div className="font-normal text-primary text-xs md:text-lg hidden xs:block">
                      { userUrl && new Date(userUrl.created_at).toDateString().split(' ').slice(1).join(' ')}
                    </div>
                    <div className="flex gap-[5px] items-center">
                      <span className="bg-primary text-white text-s px-[10px] font-normal xs:font-semibold">level</span>
                      <span className="text-primary font-bold text-2xl">{'4'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* {
                (userId !== userSession) && <FriendAction userId={userId} userSessionId={userSession} status={status} setStatus={handleStatusChange} />    //! problem here and in the sideBar !! 
              } */}

              <div className="flex flex-wrap gap-[20px] justify-center  w-[200px] xs:w-[300px] md:w-[400px]">
                <div className="card gradients"><p className="font-bold xs:text-3xl">{userUrl?.name}</p> FRIENDS</div>
                <div className="card gradients"><p className="font-bold xs:text-3xl">{userUrl?.name}</p> WINS</div>
                <div className="card gradients"><p className="font-bold xs:text-3xl">{userUrl?.name}</p> LOSES</div>
              </div>
            </div>


            
          
      </div>
      <Friendsbar />
    </div>
  )

}

export default page