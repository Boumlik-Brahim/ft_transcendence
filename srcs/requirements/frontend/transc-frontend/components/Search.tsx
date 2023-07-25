'use client'
import Image from "next/image"
import { game_b, message_b, search_b } from "../public"
import { users_int } from "../interfaces";
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

// export function useUsers() {
//   const [users, setUsers] = useState<users_int[]>();

//     useEffect(() => {
//       const fetchUser = async () => {
//         try {
//           const response = await axios.get(`http://127.0.0.1:3000/users`);
//           setUsers(response.data);
//         }catch (error) { console.log(error); }
//       }
//       fetchUser();
//       }, []);
//   return user;
// }


function Search({ id }: { id: string }) {
  const [users, setUsers] = useState<users_int[]>();
  const [result, setRsult] = useState<users_int[]>();



  useEffect(() => {

    const search = async () => {
      try {
        fetch(`http://127.0.0.1:3000/users`)
          .then((response) => response.json())
          .then((data) => setUsers(data))
      } catch (error) {
        console.log(error)
      }
    }
    search()
  }, []);

  function matching_user(event: ChangeEvent<HTMLInputElement>) {
    let copyUser = event.target.value ? users?.filter((u) => u.name.includes(event.target.value)) : []
    setRsult(copyUser);
  }


  return (
    <>
      {
        users && (
          <>
            <div className="border flex items-center self-start rounded-full w-full p-[10px] gap-[20px] max-w-[450px] relative">
              <Image src={search_b} width={50} height={50} alt="search" />
              <input
                onChange={(event) => {
                  let copyUser = event.target.value ? users.filter((u) => u.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())) : []
                  setRsult(copyUser);
                }
                }
                type="text"
                placeholder="Search"
                className="w-full h-[40px] border-none border-0 outline-0 text-primary " />
            </div>
            {
              (result?.length) ? (
                <ul className="max-w-[450px] w-full flex flex-col gap-[20px] gradients absolute p-[2rem] top-[5rem] left-[5px] z-10 shadow-lg"
                    onClick={() => {
                      setRsult([]);
                    }}>
                  {
                    result?.map((u, index) => (
                      <Link href={(id === u.id) ? `/profile` : ` /profile/${u.id}`} key={index}>
                        <li className="flex justify-between items-center">
                          <div className="relative flex items-center gap-[10px] w-[100px]">
                            <Image src={u.Avatar} width={50} height={50} alt={u.name} className="rounded-full" />
                            <p className="text-primary font-semibold">
                              {u.name}
                            </p>
                          </div>
                          <div className="friend_message flex gap-[20px] items-center">
                            <Image src={message_b} width={20} alt={"chat"} />
                            <Image src={game_b} width={20} alt={"chat"} />
                            <div className="w-[10px] h-[10px] bg-[#03A900] rounded-full"></div>
                          </div>
                        </li>
                      </Link>
                    ))
                  }
                </ul>
              ) : <></>
            }
          </>
        )
      }
    </>
  )
}

export default Search