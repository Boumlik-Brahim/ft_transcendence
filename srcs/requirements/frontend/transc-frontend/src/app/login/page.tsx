'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import  Cookies  from 'universal-cookie';
import { useMediaQuery } from 'react-responsive';
import TwoFa from '../(dashboard)/twofa/page';
import TwoFaForm from '../../../components/TwoFaForm';


export default function page()  {
  const router = useRouter()
  const [twoFa, setTwoFa] = useState(false);

  const cookies = new Cookies();
  const userId = cookies.get('id');
  const accessTokenCookie = cookies.get('accessToken');

  useEffect(() => {
    async function checkTwoFa() {
      try{
        console.log("userId : ", userId);
        if (userId !== undefined) {
          console.log("we will fetch now ********", userId);
          const res = await axios.get(`${process.env.NEXT_PUBLIC_APP_URI}/users/${userId}`);
          if (res.data.isTwoFactorEnabled){
            console.log("from set fetch -------------------: ", res.data.isTwoFactorEnabled);
            setTwoFa(true);
          }
          if (!res.data.isTwoFactorEnabled && accessTokenCookie) 
            return router.push(`/profile/${userId}`);
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
  //^ ---------------------------  screen sizes states ----------------------------
  const isLgScreen = useMediaQuery({ minWidth: 1200 });

  const [isLgScreenState, setIsLgScreen] = useState(false);
  //* useEffect for screen sizes state
  useEffect(() => {
    setIsLgScreen(isLgScreen);
  }, [isLgScreen]);
  //^ -------------------------------------------------------------------------------
  return (
    <>
      {(isLgScreenState) && (<>
        <div className='h-[20vh] flex justify-center items-center bg-gray-200 font-press text-[40px] text-primary '>
          <p className='w-[520px] h-[44px]'>Welcome Back!</p>
        </div></>)
      }  
      <div className={` w-full h-screen flex flex-col justify-around items-center bg-gray-200 py-[10%]
        lg:h-[80vh] lg:flex-row-reverse`}>
        <div className=' w-full h-[10vh] flex flex-col justify-around items-center 
          lg:w-2/5 lg:h-full'>
          <div className="w-full flex justify-evenly items-center pr-[15%]
            lg:pr-[0%]">
            <Link href="/" className="">
              <Image src={"/HOME.svg"} width={25} height={25} alt="" className='md:w-[40px] md:h-[40px]' />
            </Link>
            <h2 className="font-press text-[#3E3B6A] text-[28px] md:text-[50px]">Login</h2>
          </div>
          <div>
            {
              isLgScreenState && (showLogin == "" ? (
                <div
                    className={`
                        w-[200px] h-[50px] font-press text-[12px] rounded-full text-[#3E3B6A] bg-white flex items-center justify-between p-4
                        md:w-[300px] md:h-[70px]`}
                    >
                    <Link 
                      href={`${process.env.NEXT_PUBLIC_APP_URI}/auth`}
                      >
                        <p className='md:text-[20px]'>Login With</p>
                    </Link>
                    <Image
                      src={"../42Logo.svg"}
                      width={30}
                      height={30}
                      alt=""
                      className="md:w-[40px] md:h-[40px]"
                    />
                  </div>
              ) : (
                  <div >
                    {twoFa && <TwoFaForm userId={userId}/>}
                </div>
              ))
            }
          </div>
        </div>
        <div className=''>
          <Image
            src={"../landing/CONTROLER.svg"}
            width={400}
            height={400}
            alt=""
            className="md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px]"
          />
        </div>
        <div
          className={`
              ${showLogin} w-[200px] h-[50px] font-press text-[12px] rounded-full text-[#3E3B6A] bg-white flex items-center justify-between p-4
                md:w-[300px] md:h-[70px]
                lg:hidden`}
        >
          <Link 
            href={`${process.env.NEXT_PUBLIC_APP_URI}/auth`}
            >
              <p className='md:text-[20px]'>Login With</p>
          </Link>
          <Image
            src={"../42Logo.svg"}
            width={30}
            height={30}
            alt=""
            className="md:w-[40px] md:h-[40px]"
          />
        </div>
        <div >
          {twoFa && 
            <div className='lg:hidden'>
              <TwoFaForm userId={userId}/>
            </div>}
        </div>
      </div>
    </>
  );
}

// export default page