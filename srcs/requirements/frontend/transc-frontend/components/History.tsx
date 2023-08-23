import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { history } from "../interfaces";
import { getOpponents } from "@/app/(dashboard)/profile/utils";
import Cookies from "universal-cookie";

type Props = {
  userId: string;
  userSessionId: string;
};



export default function History({ userId, userSessionId }: Props) {
  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');
    /* ------------------------------- get history ------------------------------ */
    const [history, setHistory] = useState<history[]>([]);
    useEffect(() => {
        const fetchHistory = async () => {
        try {
            const response = await axios.get(
            `${process.env.NEXT_PUBLIC_APP_URI}:3000/users/getGames/${userId}`,{ 
                withCredentials: true, 
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                }, 
                }
            );
            setHistory(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchHistory();
      }, [userId]);
      /* ------------------------------------ - ----------------------------------- */
      
      /* ------------------------------- opponents ------------------------------- */
      const opponents = getOpponents(history, userId)
    /* ------------------------------------ - ----------------------------------- */

    return (
    <>
      <div className="wrapper px-[30px] mb-[5rem]">
        <p className="title">History</p>
        {opponents && (opponents.length > 0) ? (
          <ul className="flex flex-col w-full gap-[20px]  h-[600px] overflow-scroll overflow-x-hidden no-scrollbar">
            {opponents.map((H, index) => (
              <li key={index} className={`history min-h-[100px] ${(H.playerA_Score < H.playerB_Score) ? "lose_match" : 
              (H.playerA_Score > H.playerB_Score) ? "win_match" : "draw_match" }`} >
                <div className="flex items-center justify-between gap-[10px] xs:w-[70px] w-[30px]">
                  <Image
                    src={opponents[index].playerA_Avatar}
                    width={50}
                    height={50}
                    className="rounded-full object-cover md:w-[70px]"
                    alt="avatar"
                  />
                  <p className="font-semibold text-[9px] md:text-lg text-primary ">
                    {opponents[index].playerA_name}
                  </p>
                </div>
                <div className="history_score">
                    {`${opponents[index].playerA_Score} : ${opponents[index].playerB_Score}`}
                </div>
                <div className="flex items-center gap-[10px] w-[70px] flex-row-reverse">
                  <Image
                    src={opponents[index].playerB_Avatar}
                    width={50}
                    height={50}
                    className="rounded-full object-cover md:w-[70px]"
                    alt="avatar"
                  />
                  <p className="font-semibold text-[9px] md:text-lg text-primary">
                  {opponents[index].playerB_name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="bg-red-200 self-start title achievement_disabled p-[20px]">
            Never Played !!
          </div>
        )}
      </div>
    </>
  );
}
