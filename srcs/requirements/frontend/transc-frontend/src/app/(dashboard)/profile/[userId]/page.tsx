"use client";

import Image from "next/image";
import axios from "axios";
import Friendsbar from "../../../../../components/Friendsbar";
import "../profile.css";
import { history_game } from "../../../../../constant";
import { useParams } from "next/navigation";
import Search from "../../../../../components/Search";
import { useEffect, useState } from "react";
import { users_int } from "../../../../../interfaces";
import FriendAction from "../../../../../components/FriendAction";
import Notification from "../../../../../components/Notification";
import { io } from "socket.io-client";
export const socket = io("http://localhost:3000", {
  transports: ["websocket"],
});
import Cookies from "universal-cookie";
import Achievements from "../../../../../components/Achievements";
import Sidebar from "../../../../../components/Sidebar";
import { bgMain } from "../../../../../public";

function page() {
  /* ------------------------- get url ID from url ------------------------- */
  const { userId } = useParams();
  /* ------------------------------------ - ----------------------------------- */

  /* --------------------------- get userSession ID --------------------------- */
  const [userSession, setUserSession] = useState<string>("");
  useEffect(() => {
    const cookies = new Cookies();
    setUserSession(cookies.get("id"));
    console.log("userSession ===> ", userSession);
  }, []);
  /* ------------------------------------ - ----------------------------------- */

  /* ------------------------------ fetch userId ------------------------------ */
  const [profileUser, setProfileUser] = useState<users_int>();
  useEffect(() => {
    const fetchprofileInfo = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/users/${userId}`
        );
        setProfileUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchprofileInfo();
  }, [userId]);
  /* ------------------------------------ - ----------------------------------- */

  return (
    profileUser &&
    userSession && (
      <>
        <Sidebar />
        <div className="layouts">
          <div className="my_container relative">
            <div className="wrapper relative">
              <Search id={userSession} />
              <div className="md:block absolute right-[0px] top-[0px] hidden">
                <Notification userId={userId} userSession={userSession} />
              </div>
            </div>

            <div className="wrapper">
              <div className="flex flex-col gap-[40px] lg:gap-[70px] items-center justify-around lg:h-[500px] w-[200px] xs:w-[300px] md:w-[400px] gradients px-[1rem] py-[1rem] xs:py-[2rem]">
                <Image
                  src={profileUser.Avatar}
                  width={300}
                  height={300}
                  alt="avatar"
                  className="rounded-full object-cover"
                />
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
                        {"4"}
                      </span>
                    </div>
                  </div>
                </div>
        
               {/* { (userId !== userSession) && <FriendAction userId={userId} userSessionId={userSession} />} */}

              </div>

             {/* {   <FriendAction userId={userId} userSessionId={userSession} />} */}
             { (userId !== userSession) && <FriendAction userId={userId} userSessionId={userSession} />}

            </div>
            <Achievements userId={userId} userSessionId={userSession} />
            <div className="wrapper">
              <p className="title">{true ? "Your" : "Brahim"} History</p>
              <ul className="flex flex-col w-full gap-[20px]">
                {history_game.map((history, index) => (
                  <li key={index} className={`history ${history.status}`}>
                    <div className="flex items-center justify-between gap-[10px] xs:w-[70px] w-[30px]">
                      <Image
                        src={profileUser.Avatar}
                        width={50}
                        height={50}
                        className="rounded-full object-cover md:w-[70px]"
                        alt="avatar"
                      />
                      <p className="font-semibold text-[9px] md:text-lg text-primary ">
                        {profileUser.name}
                      </p>
                    </div>
                    <div className="history_score">1:2</div>
                    <div className="flex items-center gap-[10px] w-[70px] flex-row-reverse">
                      <Image
                        src={history.avarat}
                        className="w-[40px] md:w-[70px]"
                        alt="avatar"
                      />
                      <p className="font-semibold text-[9px] md:text-lg text-primary">
                        {history.oppenet}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Friendsbar userId={userId} userSessionId={userSession} />
        </div>
      </>
    )
  );
}

export default page;
