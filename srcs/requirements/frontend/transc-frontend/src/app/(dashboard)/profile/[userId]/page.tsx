"use client"

import Image from "next/image"
import Link from 'next/link'
import { achievements, adduser_b, close_b, deleteuser_b, forbidden_b, game_b, notification_b, send_b } from "../../../../../public";
import Friendsbar from '../../../../../components/Friendsbar'
import '../profile.css'
import { history_game } from "../../../../../constant";
import { useParams } from "next/navigation";
import { createFriend, deleteFriend, useUserData } from "../utils";
import Search from "../../../../../components/Search";
import { useEffect, useState } from "react";
import { friendShip } from "../../../../../interfaces";
import axios from "axios";


import { io } from 'socket.io-client';

export const socket = io('http://localhost:3000', { transports: ['websocket'] });

// export default socket;

// export async function createFriend (userId:string, friendId: string){
//   console.log("dddddd")
//   try {
//       const response = await fetch(`http://127.0.0.1:3000/users/friend`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         "friendShipStatus": "PENDING",
//         "userId": `${userId}`,
//         "friendId": `${friendId}`
//       })
//     });

//     if (response.ok) { console.log('Post successful!'); return true;}

//     else { console.error('Post failed:', response.status); return false;}

//   } catch (error) { console.error('Error:', error);  return false;}
// }



function page() {
  /* ------------------------- get friend ID from url ------------------------- */
  const { userId } = useParams();
  /* ------------------------------------ - ----------------------------------- */


  /* -------------------------- fetch (ID) ==> freind ------------------------- */
  const friend = useUserData(userId);
  /* ------------------------------------ - ----------------------------------- */


  /* ----------------------------- get the USER ID ---------------------------- */
  const user = JSON.parse(sessionStorage.user);
  /* ------------------------------------ - ----------------------------------- */


  /* -------------------------- get FriendShip status ------------------------- */
  const [friendShip, setFriendShip] = useState<friendShip[]>();
  const [status, setStatus] = useState<string>();

  useEffect(() => {
    const fetchfriendShip = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/users/${user.id}/friendShip/${userId}`);
        setFriendShip(response.data);
      } catch (error) { console.log(error); }
    }
    fetchfriendShip();
  }, []);

  useEffect(() => {
    const fetched = friendShip;
    console.log("=====>", fetched)
    setStatus(fetched?.length ? fetched[0].friendShipStatus : "NOFRIEND")
  }, [friendShip, userId])
  /* ------------------------------------ - ----------------------------------- */


  
  /* ----------------------- get pending friend request ----------------------- */
  const [friendShips, setFriendShips] = useState<friendShip[]>();


  useEffect(() => {
    const fetchfriendShip = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/users/${userId}/pending`);
        setFriendShips(response.data);
      } catch (error) { console.log(error); }
    }
    fetchfriendShip();
  }, []);

  useEffect(() => {
    const fetched = friendShips;
    console.log("fetched >>> ", fetched)
  }, [friendShips, userId])
  /* ------------------------------------ - ----------------------------------- */

  /* -------------------------- friend requset socket ------------------------- */
  const [notification, setNotification] = useState<string>("null");
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
  }, [notification]);
  /* ------------------------------------ - ----------------------------------- */
  return (
    <div className='layouts'>
      <div className="my_container">
        {
          friend && (<>
            <div className="wrapper relative">
              <Search id={user.id} />
              <div className="md:block absolute right-[0px] top-[0px] hidden">
                <div className="relative">
                  <div>notif = {notification}</div>
                  <div>lent = {friendShips?.length}</div>
                  <Image src={notification_b} width={40} alt="avatar" className="cursor-pointer" />
                  {
                    (notification === "friendRequest" || friendShips?.length != 0) && (
                      <div className="absolute w-[12px] h-[12px] top-1 right-1 bg-red-400 rounded-full"></div>
                    )
                  }
                </div>
              </div>
            </div>
            <div className="wrapper">
              {/* <p className="title">{friend?.name}</p> */}
              <div className="flex flex-col gap-[70px] items-center justify-center h-[500px] w-[200px] xs:w-[300px] md:w-[400px] gradients px-[1rem] py-[1rem] xs:py-[2rem]">
                <Image src={friend?.Avatar} width={300} height={300} alt="avatar" className="rounded-full max-w-[300px] max-h-[300px] w-[270px] h-[270px] object-cover" />
                <div className="flex flex-col items-center gap-[10px] w-[80%]">
                  <p id='name_user' className="font-semibold md:text-3xl text-center xs:text-xl text-[15px] text-primary w-full">{friend?.name}</p>
                  <div className='flex xs:justify-between justify-center w-full items-center'>
                    <div className="font-normal text-primary text-xs md:text-lg hidden xs:block">
                      {new Date(friend?.created_at || "").toDateString().split(' ').slice(1).join(' ')}
                    </div>
                    <div className="flex gap-[5px] items-center">
                      <span className="bg-primary text-white text-s px-[10px] font-normal xs:font-semibold">level</span>
                      <span className="text-primary font-bold text-2xl">{'4'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-[10px] justify-center  w-[200px] xs:w-[300px] md:w-[400px]">
                <div className="card_friend gradients"
                  onClick={
                    async (event) => {
                      console.log("SSSSSSS=>", status)
                      if (status === "NOFRIEND") {
                        await createFriend(user.id, userId) && setStatus("PENDING");

                        socket.emit('friendRequest', {
                          userId: user.id,
                          friendId: userId,
                          friendShipStatus: "PENDING",
                        });
                      }
                      else if (status === "PENDING" || status === "ACCEPTED") {
                        await deleteFriend(user.id, userId) && setStatus("NOFRIEND");
                        console.log("ANY BODY HERE ??")
                        socket.emit('friendCancel');
                      }
                    }}
                >
                  <Image src={status === "ACCEPTED" ? deleteuser_b : status === "PENDING" ? close_b : adduser_b} width={30} alt="avatar" />
                </div>
                <div className="card_friend gradients"><Image src={forbidden_b} width={30} alt="avatar" /></div>
                <div className="card_friend gradients"><Image src={send_b} width={30} alt="avatar" /></div>
                <div className="card_friend gradients"><Image src={game_b} width={30} alt="avatar" /></div>
              </div>

              <div className="flex flex-wrap gap-[20px] justify-center  w-[200px] xs:w-[300px] md:w-[400px]">
                <div className="card gradients"><p className="font-bold xs:text-3xl">{'40'}</p> FRIENDS</div>
                <div className="card gradients"><p className="font-bold xs:text-3xl">{'127'}</p> WINS</div>
                <div className="card gradients"><p className="font-bold xs:text-3xl">{'50'}</p> LOSES</div>
              </div>
            </div>


            <div className="wrapper">
              <p className="title">{true ? ("Your") : ('Brahim')} Achievements</p>
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
              <p className="title">{true ? ("Your") : ('Brahim')} History</p>
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
    </div>
  )
}

export default page