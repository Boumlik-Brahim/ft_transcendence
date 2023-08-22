"use client";

import Image from "next/image";
import axios from "axios";
import Friendsbar from "../../../../../components/Friendsbar";
import "../profile.css";
import { history_game } from "../../../../../constant";
import { useParams } from "next/navigation";
import Search from "../../../../../components/Search";
import { use, useEffect, useState } from "react";
import { history, userStat, users_int } from "../../../../../interfaces";
import FriendAction from "../../../../../components/FriendAction";
import Cookies from "universal-cookie";
import Notification from "../../../../../components/Notification";
// import { io } from "socket.io-client";
// const cookies = new Cookies();
// export const socket = io("http://localhost:3000", {
//   auth: { userId: cookies.get('id') } ,
//   transports: ["websocket"],
// });
import Achievements from "../../../../../components/Achievements";
import Sidebar from "../../../../../components/Sidebar";
import {
  _your_first_game,
  _your_first_game_gif,
  bgMain,
} from "../../../../../public";
import History from "../../../../../components/History";

function page() {
  /* ------------------------- get url ID from url ------------------------- */
  const { userId } = useParams();
  /* ------------------------------------ - ----------------------------------- */
  
  /* --------------------------- get userSession ID --------------------------- */
  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');
  const [userSession, setUserSession] = useState<string>("");
  useEffect(() => {
    setUserSession(cookies.get("id"));
  }, []);
  /* ------------------------------------ - ----------------------------------- */
  /* ------------------------------ fetch userId ------------------------------ */
  const [profileUser, setProfileUser] = useState<users_int>();
  useEffect(() => {
    const fetchprofileInfo = async () => {
      try {
        // const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userId}`,{
        //   credentials: "include",
        // });
        // const res = await response.json();
        // setProfileUser(res)
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userId}`,{ 
              withCredentials: true, 
              headers: {
                      Authorization: `Bearer ${accessToken}`,
                    }, 
              }
        );
        setProfileUser(response.data);
       
      } catch (error) {
        console.log(error);
      }
    };
    fetchprofileInfo();
  }, [userId]);
  /* ------------------------------------ - ----------------------------------- */

  /* ----------------------------- fetch userStat ----------------------------- */
  const [userStat, setUserStat] = useState<userStat>();
  useEffect(() => {
    const fetchUserStat = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userId}/userStat`,{ 
              withCredentials: true, 
              headers: {
                      Authorization: `Bearer ${accessToken}`,
                    }, 
              }
        );
        setUserStat(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserStat();
  }, [userId]);
  /* ------------------------------------ - ----------------------------------- */



  return (
    profileUser &&
    userSession && (
      <>
        <Sidebar />
        <div className="layouts">
          <div className="my_container relative">
            <div className="wrapper relative ">
              <Search id={userSession} />
              <div className="md:block absolute right-[0px] top-[0px] hidden">
              {  <Notification userId={userId} userSession={userSession} />}
              </div>
            </div>

            <div className="wrapper">
              <div className="flex flex-col gap-[40px] lg:gap-[70px] items-center justify-around lg:h-[500px] w-[200px] xs:w-[300px] md:w-[400px] gradients px-[1rem] py-[1rem] xs:py-[2rem]">
                {/* <Image
                  src={profileUser.Avatar}
                  width={300}
                  height={300}
                  alt="avatar"
                  className="rounded-full object-cover"
                /> */}
                <img src={profileUser.Avatar} alt="avatar" className="rounded-full object-cover w-[300px] h-[300px]"/>
                <div className="flex flex-col items-center gap-[10px] w-[80%]">
                  <p
                    id="name_user"
                    className="font-semibold md:text-3xl text-center xs:text-xl text-[15px] text-primary w-full"
                  >
                    {profileUser?.name}
                  </p>
                  <div className="flex xs:justify-between justify-center w-full items-center">
                    <div className="font-normal text-primary text-xs md:text-lg hidden xs:block">
                      {new Date(profileUser.created_at)
                        .toDateString()
                        .split(" ")
                        .slice(1)
                        .join(" ")}
                    </div>
                    <div className="flex gap-[5px] items-center">
                      <span className="bg-primary text-white text-s px-[10px] font-normal xs:font-semibold">
                        level
                      </span>
                      <span className="text-primary font-bold text-2xl">
                        {userStat ? parseFloat(userStat.rate).toFixed(2): '0'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              { <FriendAction userId={userId} userSessionId={userSession} />}
              
            </div>
            <Achievements userId={userId} userSessionId={userSession} />
            <History userId={userId} userSessionId={userSession} />
          </div>
          <Friendsbar userId={userId} userSessionId={userSession} />
        </div>
      </>
    )
  );
}

export default page;
