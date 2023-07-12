'use client'

import Image from "next/image"
import { OnlineFriends } from "../../../../constant"
import { achievements, bulr_c1, bulr_c2, bulr_c3, notification_b } from "../../../../public";
import Friendsbar from '../../../../components/Friendsbar'

type user = {
  id: number;
  name: string;
}

function page() {
  return (
    <div className='flex w-full  h-[90vh] md:h-screen'>
      <div className="my_container relative">
        <div className="absolute w-[600px] h-[600px]">
          <div className="relative">
            <div className="absolute opacity-10 blur-3xl left-[0px]">
              <Image src={bulr_c3} width={500} alt="" />
            </div>
            <div className="absolute opacity-20 blur-3xl top-[-20px] right-[-40px]">
              <Image src={bulr_c1} width={500} alt="" />
            </div>
            <div className="absolute opacity-10 blur-3xl top-[-50px] left-[-40px]">
              <Image src={bulr_c2} width={500} alt="" />
            </div>
          </div>
        </div>
        <div className="user relative">
          <div className="absolute right-[0px]">
            <Image src={notification_b} width={50} alt="avatar" />
          </div>
          <div className="flex flex-col gap-[20px] items-center">
            <Image src={OnlineFriends[0].avarat} width={250} alt="avatar" />
            <div className="flex flex-col items-center gap-[10px]">
              <p id='name_user' className="font-semibold text-3xl text-primary w-full">OUSSAMA BELKADIR</p>
              <div className={`flex justify-between w-full items-center`}>
                <div className="font-light text-primary">{'August, 11 2023'}</div>
                <div className="flex gap-[10px] items-center">
                  <span className="bg-primary text-white px-[15px] py-[2px] rounded-full font-bold">level</span>
                  <span className="font-bold text-lg">4</span>
                </div>
              </div>
            </div>
          </div>
          {/* if friend */}
          <div className="flex gap-[20px]">
            <div className="card friend_number"><p className="font-bold text-4xl">{'40'}</p> FRIENDS</div>
            <div className="card win_number"><p className="font-bold text-4xl">{'127'}</p> WINS</div>
            <div className="card lose_number"><p className="font-bold text-4xl">{'50'}</p> LOSES</div>
          </div>
        </div>
        <div className="flex flex-col gap-[5rem] w-full">
          <p className="game_font">{true ? ("Your") : ('Brahim')} Achievements</p>
          <ul className="flex flex-wrap gap-[30px] ">
            {
              achievements.map((ach, index) => (
                <li key={index} className="flex justify-center items-center rounded-full border-[2px] border-primary w-[100px] h-[100px] border-dashed">
                  <Image src={ach} width={50} alt="ach"/>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="flex flex-col gap-[5rem] w-full">
          <p className="game_font">{true ? ("Your") : ('Brahim')} History</p>
          <div className="flex flex-col w-full gap-[20px]">
            <div className="lose_match w-full h-[100px] rounded-full flex justify-between items-center px-[20px]">
              <div className="flex items-center gap-[10px] max-w-[100px]">
                <Image src={OnlineFriends[0].avarat} width={70} alt="avatar" />
                <p className="font-medium text-lg text-primary">Oussama Belkhadir</p>
              </div>
              <div className="w-[70px] h-[70px] rounded-full bg-white flex justify-center items-center">1:2</div>
              <div className="flex items-center gap-[10px] max-w-[100px] flex-row-reverse">
                <Image src={OnlineFriends[0].avarat} width={70} alt="avatar" />
                <p className="font-medium text-lg text-primary">Oussama Belkhadir</p>
              </div>
            </div>
            <div className="win_match w-full h-[100px] rounded-full flex justify-between items-center px-[20px]">
              <div className="flex items-center gap-[10px] max-w-[100px]">
                <Image src={OnlineFriends[0].avarat} width={70} alt="avatar" />
                <p className="font-medium text-lg text-primary">Oussama Belkhadir</p>
              </div>
              <div className="w-[70px] h-[70px] rounded-full bg-white flex justify-center items-center">1:2</div>
              <div className="flex items-center gap-[10px] max-w-[100px] flex-row-reverse">
                <Image src={OnlineFriends[0].avarat} width={70} alt="avatar" />
                <p className="font-medium text-lg text-primary">Oussama Belkhadir</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    <Friendsbar />
    </div>
  )
}

export default page