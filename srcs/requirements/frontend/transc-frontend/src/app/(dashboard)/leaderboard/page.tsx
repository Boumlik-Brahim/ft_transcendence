"use client";
import Friendsbar from "../../../../components/Friendsbar";
import Image from "next/image";
import Link from "next/link";
import { Sad, first, happy, second, theerd } from "../../../../public";
import { leaderboard_list } from "../../../../constant";
import Search from "../../../../components/Search";
import Notification from "../../../../components/Notification";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useParams } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";
import "./leaderboard.css";
import { userStat, users_int } from "../../../../interfaces";
import axios from "axios";
import { leadersList } from "../profile/utils";

function page() {
  /* --------------------------- get userSession ID --------------------------- */
  const [userSession, setUserSession] = useState<string>("");
  useEffect(() => {
    const cookies = new Cookies();
    setUserSession(cookies.get("id"));
  }, []);
  /* ------------------------------------ - ----------------------------------- */

  /* ------------------------- get url ID from url ------------------------- */
  const { userId } = useParams();
  /* ------------------------------------ - ----------------------------------- */

  /* ------------------------------- fetch user ------------------------------- */
  const [users, setUsers] = useState<users_int[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users`);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAll();
  }, []);
  /* ------------------------------------ - ----------------------------------- */

  const leaders = leadersList(users);
  return (
    <>
      {userSession && leaders && (
        <>
          <Sidebar />
          <div className="layouts">
            <div className="my_container">
              <div className="wrapper relative">
                <Search id={userSession} />
                <div className="md:block absolute right-[0px] top-[0px] hidden">
                  <Notification
                    userId={userSession}
                    userSession={userSession}
                  />
                </div>
              </div>
              <div className="wrapper relative">
                {" "}
                <p className="title">Leaderboard</p>{" "}
              </div>

              <div className="wrapper">
                <ul className="flex flex-col gap-[40px] w-full">
                  {leaders.map((ply, index) => (
                    <li
                      key={index}
                      className="flex w-full items-center gap-[10px]"
                    >
                      {index == 0 ? (
                        <Image src={first} width={45} alt="first" />
                      ) : index == 1 ? (
                        <Image src={second} width={45} alt="first" />
                      ) : index == 2 ? (
                        <Image src={theerd} width={45} alt="first" />
                      ) : (
                        <p className="text-[1.5rem] text-primary w-[50px] flex items-center justify-center">
                          {index + 1}
                        </p>
                      )}

                      <div className="flex items-center justify-between h-[70px] md:h-[50px] pr-[20px] min-w-[200px] w-full gradients rounded-full">
                        <Link
                          href={`profile/${ply.user.id}`}
                          className="flex items-center gap-[10px] max-w-[100px] xs:max-w-[200px]"
                        >
                          <Image
                            src={ply.user.Avatar}
                            width={70}
                            height={70}
                            alt="avatar"
                            className="rounded-full object-cover"
                          />
                          <p className="text-xs xs:text-sm font-semibold text-primary">
                            {ply.user.name}
                          </p>
                        </Link>

                        <div className="xs:flex flex-col hidden  md:flex-row gap-x-[30px]">
                          <div className="flex items-center gap-x-[5px]">
                            <Image
                              src={happy}
                              width={20}
                              height={20}
                              alt="win"
                              className="rounded-full object-cover"
                            />
                            <p className="text-xs xs:text-sm font-semibold text-[#0db545]">
                              {ply.winsNumbr ? ply.winsNumbr : "--"}
                            </p>
                          </div>
                          <div className=" flex items-center gap-x-[5px]">
                            <Image
                              src={Sad}
                              width={20}
                              height={20}
                              alt="sad"
                              className="rounded-full object-cover"
                            />
                            <p className="text-xs xs:text-sm font-semibold text-[#ea2222] ">
                              {ply.lossesNumbr ? ply.lossesNumbr : "--"}
                            </p>
                          </div>
                        </div>

                        <p className="text-s font-semibold text-primary">
                          {parseFloat(ply.rate).toFixed(2)}
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
      )}
    </>
  );
}

export default page;
