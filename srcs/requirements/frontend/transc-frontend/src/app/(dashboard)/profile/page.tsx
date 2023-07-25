"use client"

import Image from "next/image"
import Link from 'next/link'
import { achievements, notification_b } from "../../../../public";
import Friendsbar from '../../../../components/Friendsbar'
import './profile.css'
import { history_game } from "../../../../constant";
import Search from "../../../../components/Search";
import { useUserData } from "./utils";


function page(id: string) {

  id = '410d938b-6369-4af0-bc87-2fcab27c87c8';
  const user = useUserData(id);

  return (
    <div className='layouts'>
      <div className="my_container">
        {
          user && (
            <>
              <div className="wrapper relative">
                <Search id = {id}/>
                <div className="md:block absolute right-[0px] top-[0px] hidden">
                  <Link href={'/'}> <Image src={notification_b} width={40} alt="avatar" /> </Link>
                </div>
              </div>
              <div className="wrapper ">
                <p className="title">{sessionStorage.getItem("id")}</p>
                <div className="flex flex-col gap-[50px] items-center justify-center w-[200px] xs:w-[300px] md:w-[400px] gradients px-[1rem] py-[1rem] xs:py-[3rem]">
                  <Image src={user?.Avatar} width={300} height={300} alt="avatar" className="rounded-full max-w-[300px] max-h-[300px] object-cover" />
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