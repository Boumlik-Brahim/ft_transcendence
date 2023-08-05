'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import PopUp from '../../../components/Popup'
import { getCookie } from 'cookies-next'
import  Cookies  from 'universal-cookie';


export default function page()  {
  const router = useRouter()
  const [twoFa, setTwoFa] = useState(false);

  const cookies = new Cookies();
  const userId = cookies.get('id');
  const accessTokenCookie = cookies.get('accessToken');

  useEffect(() => {
    async function checkTwoFa() {
      try{
        if (userId !== undefined) {
          const res = await axios.get(`http://localhost:3000/users/${userId}`);
          if (res.data.isTwoFactorEnabled)
            setTwoFa(true);
        }
      }
      catch(e){
        console.log(e)
      }
    }
    checkTwoFa();
  },[])
  let showLogin = "";
  twoFa ? showLogin = "hidden" : showLogin = "";
  useEffect(()=>{
    if (accessTokenCookie) {
      return router.push(`/profile/${userId}`);
    }

  },[])
  return (
    <div className={` w-full h-screen flex flex-col justify-around items-center bg-gray-200 py-[10%]`}>
      <div className="w-full flex justify-evenly items-center pr-[15%]">
        <Link href="/" className="">
          <Image src={"/HOME.svg"} width={25} height={25} alt="" />
        </Link>
        <h2 className="font-press text-[#3E3B6A] text-[28px]">Login</h2>
      </div>
      <div>
        <Image
          src={"../landing/CONTROLER.svg"}
          width={400}
          height={300}
          alt=""
          className="w-[95%] h-[95%]"
        />
      </div>
      {/* <div className='hidden'>2 Factory Authentication</div> */}
      <div
        className={`
            ${showLogin} w-[200px] h-[50px] font-press text-[12px] rounded-full text-[#3E3B6A] bg-white flex items-center justify-between p-4`}
      >
        <Link href="http://localhost:3000/auth">Login With</Link>
        <Image
          src={"../42Logo.svg"}
          width={30}
          height={30}
          alt=""
          className=""
        />
      </div>
      {twoFa && <PopUp />}
    </div>
  );
}

// export default page