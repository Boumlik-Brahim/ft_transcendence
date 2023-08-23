"use client";
import Image from "next/image";
import { game_b, message_b, search_b } from "../public";
import { users_int } from "../interfaces";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "universal-cookie";

function Search({ id }: { id: string }) {
  /* ------------------------------- fetch user ------------------------------- */
  const [users, setUsers] = useState<users_int[]>();
  const [result, setRsult] = useState<users_int[]>();
  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users`,{ 
          withCredentials: true, 
          headers: {
                  Authorization: `Bearer ${accessToken}`,
                }, 
          });
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAll();
  }, []);
  /* ------------------------------------ - ----------------------------------- */

  return (
    <>
      {users && (
        <>
          <div className="border flex items-center self-start rounded-full w-full p-[10px] gap-[20px] max-w-[450px] relative">
            <Image src={search_b} width={50} height={50} alt="search" />
            <input
              onChange={(event) => {
                let copyUser = event.target.value
                  ? users.filter((u) =>
                      u.name
                        .toLocaleLowerCase()
                        .includes(event.target.value.toLocaleLowerCase())
                    )
                  : [];
                setRsult(copyUser);
              }}
              type="text"
              placeholder="Search"
              className="w-full h-[40px] border-none border-0 outline-0 text-primary "
            />
          </div>
          {result?.length ? (
            <ul
              className="max-w-[450px] w-full flex flex-col gap-[20px] gradients absolute p-[2rem] top-[5rem] left-[5px] z-10 shadow-lg"
              onClick={() => {
                setRsult([]);
              }}
            >
              {result?.map((u, index) => (
                <Link href={`/profile/${u.id}`} key={index}>
                  <li className="flex justify-between items-center">
                    <div className="relative flex items-center gap-[10px] w-[100px]">
                      {/* <Image
                        src={u?.Avatar}
                        width={50}
                        height={50}
                        alt="avatar"
                        className="rounded-full max-w-[50px] max-h-[50px] w-[40px] h-[40px] object-cover"
                      /> */}
                      <img src={u?.Avatar} alt="avatar" className="rounded-full max-w-[50px] max-h-[50px] w-[50px] h-[50px] object-cover"/>
                      
                      <p className="text-primary font-semibold">{u.name}</p>
                    </div>
                    <div className="friend_message flex gap-[20px] items-center">
                      <div
                        className={`w-[10px] h-[10px] 
                            ${
                              u.status === "ONLINE"
                                ? "bg-[#03A900]"
                                : u.status === "OFFLINE"
                                ? "bg-[#e92514]"
                                : "bg-[#f8c303]"
                            } 
                            rounded-full`}
                      ></div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}

export default Search;
