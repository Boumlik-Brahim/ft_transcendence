'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios';
import  Cookies  from 'universal-cookie';
import { useMediaQuery } from 'react-responsive';
import TwoFaForm from '../../../components/TwoFaForm';


export default function page()  {
  
  const [twoFa, setTwoFa] = useState(false);
  const [isLgScreenState, setIsLgScreen] = useState(false);

  const isLgScreen = useMediaQuery({ minWidth: 1200 });
  const cookies = new Cookies();
  const userId = cookies.get('id');
  let showLogin = "";
  twoFa ? showLogin = "hidden" : showLogin = "";

  useEffect(() => {
    async function checkTwoFa() {
      try{
        if (userId !== undefined) {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userId}`);
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
  //^ ---------------------------  screen sizes states ----------------------------

  useEffect(() => {
    setIsLgScreen(isLgScreen);
  }, [isLgScreen]);
  //^ -------------------------------------------------------------------------------

  return (
    <>
      <div className='w-screen h-screen flex justify-center items-center'>
        {(isLgScreenState) && (<>
          <div className='absolute top-0 h-[20vh] w-full z-10 flex justify-center items-center bg-gray-200 bg-opacity-50 font-press text-[40px] text-primary '>
            <p className='w-[520px] h-[44px]'>Welcome Back!</p>
          </div></>)
        }
        < Image
            src={"https://cdn.dribbble.com/users/482851/screenshots/2925978/media/ae36ef4ae4efe2fb5de838353de9a16b.gif"}
            width={100}
            height={100}
            alt=""
            className='w-full h-screen'
          /> 
      <div className={` absolute w-full h-screen flex flex-col justify-around items-center bg-gray-200 bg-opacity-50 py-[10%]
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
                        md:w-[300px] md:h-[70px] hover:shadow-2xl hover:border-4 border-primary`}
                    >
                    <Link 
                      href="http://localhost:3000/auth"
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
            className=" h-[60vh] md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px]"
          />
        </div>
        <div
          className={`
              ${showLogin} w-[200px] h-[50px] font-press text-[12px] rounded-full text-[#3E3B6A] bg-white flex items-center justify-between p-4
                md:w-[300px] md:h-[70px] hover:shadow-2xl hover:border-4 border-primary
                lg:hidden`}
        >
          <Link 
            href="http://localhost:3000/auth"
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

      </div>
    </>
  );
}