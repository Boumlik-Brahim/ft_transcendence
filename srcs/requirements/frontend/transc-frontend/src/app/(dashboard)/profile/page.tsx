"use client"

import Image from "next/image"
import Link from 'next/link'
import { achievements, notification_b } from "../../../../public";
import Friendsbar from '../../../../components/Friendsbar'
import './profile.css'
import { history_game } from "../../../../constant";
import Search from "../../../../components/Search";
import { useUserData } from "./utils";
import { useEffect, useState } from "react";

import { io } from 'socket.io-client';
import axios from "axios";
import { friendShip, users_int } from "../../../../interfaces";


export const socket = io('http://localhost:3000', { transports: ['websocket'] });


function page() {
  /* --------------------------- get user ID + fetch -------------------------- */
  const u = JSON.parse(sessionStorage.user);
  const id = u.id;
  const user = useUserData(id);
  /* ------------------------------------ - ----------------------------------- */


  /* -------------------------- friend requset socket ------------------------- */
  // const [notification, setNotification] = useState<string>("null");
  useEffect(() => {
    socket.on('friendRequest', (data) => {
      setNotification("friendRequest")
      console.log(`friendRequest`)
    });
    socket.on('friendCancel', () => {
      setNotification("friendCancel")
      console.log(`FfriendCancel`)
      console.log("FfriendShips....", friendShips?.length)
    });
    return () => {
      socket.off('friendRequest');
    };
  }, []);
  /* ------------------------------------ - ----------------------------------- */


  /* ----------------------- get pending friend request ----------------------- */
  const [friendShips, setFriendShips] = useState<friendShip[]>();
  
  
  useEffect(() => {
    const fetchfriendShip = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/users/${id}/pending`);
        setFriendShips(response.data);
      } catch (error) { console.log(error); }
    }
    fetchfriendShip();
  }, []);
  
  useEffect(() => {
    const fetched = friendShips;
    console.log("fetched >>> ", fetched)
  }, [friendShips, id])
  /* ------------------------------------ - ----------------------------------- */
  

  return (
    <div className='layouts'>
      <div className="my_container">
        {
          user && (
            <>
              <div className="wrapper relative">
                <Search id={id} />
                <div className="md:block absolute right-[0px] top-[0px] hidden">
                  <div className="relative">
                    {/* <div>notif = {notification}</div> */}
                    <div>lent = {friendShips?.length}</div>
                    <Image src={notification_b} width={40} alt="avatar" className="cursor-pointer" />
                    {
                      (friendShips?.length != 0) && (
                        <div className="absolute w-[12px] h-[12px] top-1 right-1 bg-red-400 rounded-full"></div>
                      )
                    }

                    {
                      (friendShips && friendShips?.length > 0) && (

                        <ul className="max-w-[450px] w-full flex flex-col gap-[20px] gradients absolute p-[2rem] top-[5rem] left-[5px] z-10 shadow-lg">
                          {
                            friendShips?.map((fShip, index) => (
                              <>
                                <li key={index} className="flex justify-between items-center">
                                  <div className="relative flex items-center gap-[10px] w-[100px]">
                                    <p className="text-primary font-semibold">
                                      {fShip.friendId}
                                    </p>
                                  </div>
                                  <div className="friend_message flex gap-[20px] items-center">
                                    <button>Accept</button>
                                    <button>Decline</button>
                                  </div>
                                </li>
                              </>
                            ))
                          }
                        </ul>
                      )
                    }

                  </div>
                </div>
              </div>
              <div className="wrapper ">
                <p className="title">{sessionStorage.getItem("id")}</p>
                <div className="flex flex-col gap-[50px] items-center justify-center w-[200px] xs:w-[300px] md:w-[400px] gradients px-[1rem] py-[1rem] xs:py-[3rem]">
                  <Image src={user?.Avatar} width={300} height={300} alt="avatar" className="rounded-full max-w-[300px] max-h-[300px] w-[270px] h-[270px] object-cover" />
                  <div className="flex flex-col items-center gap-[10px] w-[80%]">
                    <p id='name_user' className="font-semibold md:text-3xl text-center xs:text-xl text-[15px] text-primary w-full">{user?.name}</p>
                    <div className='flex xs:justify-between justify-center w-full items-center'>
                      <div className="font-normal text-primary text-xs md:text-lg hidden xs:block">
                        {new Date(user?.created_at).toDateString().split(' ').slice(1).join(' ')}
                      </div>
                      <div className="flex gap-[5px] items-center">
                        <span className="bg-primary text-white text-s px-[10px] font-normal xs:font-semibold">level</span>
                        <span className="text-primary font-bold text-2xl">{'4'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-[20px] justify-center  w-[200px] xs:w-[300px] md:w-[400px]">
                  <div className="card gradients"><p className="font-bold xs:text-3xl">{'40'}</p> FRIENDS</div>
                  <div className="card gradients"><p className="font-bold xs:text-3xl">{'127'}</p> WINS</div>
                  <div className="card gradients"><p className="font-bold xs:text-3xl">{'50'}</p> LOSES</div>
                </div>

              </div>

              <div className="wrapper">
                <p className="title">Your Achievements</p>
                <ul className="flex flex-col xs:flex-row flex-wrap gap-[20px] ">
                  {
                    achievements.map((ach, index) => (
                      <li key={index} className="achievement ">
                        <Image src={ach} className="w-full" alt="ach" />
                      </li>
                    ))
                  }
                </ul>
              </div>

              <div className="wrapper">
                <p className="title">Your History</p>
                <ul className="flex flex-col w-full gap-[20px]">
                  {
                    history_game.map((history, index) => (
                      <li key={index} className={`history ${history.status}`}>
                        <div className="flex items-center gap-[10px] max-w-[100px]">
                          <Image src={history.avarat} className="w-[40px] md:w-[70px]" alt="avatar" />
                          <p className="font-medium text-xs md:text-lg text-primary ">{"Osama belkhadir"}</p>
                        </div>
                        <div className="history_score">1:2</div>
                        <div className="flex items-center gap-[10px] max-w-[100px] flex-row-reverse">
                          <Image src={history.avarat} className="w-[40px] md:w-[70px]" alt="avatar" />
                          <p className="font-medium text-xs md:text-lg text-primary">{history.oppenet}</p>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </>
          )}
      </div>
      <Friendsbar />
    </div >
  )
}

export default page