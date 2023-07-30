'use client'
import React, { useEffect } from 'react'
import Friendsbar from '../../../../components/Friendsbar'
import QRCodePage from '../../../../components/QrCode';
import Image from "next/image";
import { useState } from 'react';
import Cookies from 'universal-cookie';

function page() {
  const cookies = new Cookies();
  const userId = cookies.get('id');
  const [qrCodeActive, setQrCode] = useState<boolean>(false);
  const [disableTwoFa, setDisableTwoFa] = useState<boolean>(false);

  const handleActiveClick = () => {
    setQrCode(true);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetch(`http://localhost:3000/users/${userId}`);
        if (user.ok){
          const userData = await user.json();
          if(userData.isTwoFactorEnabled)
            setDisableTwoFa(true);
        }
        else{
          console.error('Failed to fetch user data');
        }
      }
      catch(error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchData();
  },[userId]);

  return (
    <div className="layouts">
      <div className='px-[20%] w-full h-[80vh] flex flex-col justify-evenly item-center text-[#3E3B6A] md:h-[100vh]'>
        <div className='flex justify-center item-center font-press'>
          <h1>Edit Profile</h1>
        </div>
        <div className='flex flex-col self-center'>
          <Image 
            src={'/fake/avatar.png'}
            width={150}
            height={150}
            alt=""  
          />
          <div className="flex items-center justify-center bg-grey-lighter mt-[-12px]">
              <label className="">
                  <svg className="w-8 h-8 cursor-pointer tracking-wide" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <input type='file' className="hidden" />
              </label>
          </div>
        </div>
        <div>
          <form className='w-full flex flex-col'>
            <label htmlFor="" className='text-center'>USERNAME</label>
            <input 
              type="text"
              id="username"
              name=""
              className='border'> 
              </input>
          </form>
        </div>
        <div className='w-full flex flex-col item-center justify-center' >
          <h3 className='flex justify-center item-center'>2FA-AUTHENTICATOR</h3>
          {
            disableTwoFa ? (
              <button onClick={handleActiveClick} className='w-[90%] h-[30px] text-white self-center text-center bg-[#3E3B6A] border rounded-lg'>ACTIVE</button>
              ) : (
                <button onClick={handleActiveClick} className='w-[90%] h-[30px] text-white self-center text-center bg-[#3E3B6A] border rounded-lg'>Desactivate</button>
            )
          }
        </div>
        <div className=' w-[80%] self-center flex justify-center item-center border-2 rounded-lg'>
          {
            qrCodeActive ? (
              <QRCodePage 
                userId={userId}
                blur=""/>
              ) : (
                <QRCodePage 
                  userId={userId}
                  blur="blur-sm"/>
            )
          }
        </div>
        <div className='w-full flex justify-center item-center'>
          <button className='w-[90%] h-[30px] text-white bg-[#3E3B6A] border rounded-lg'>SAVE</button>
        </div>
      </div>
      <Friendsbar />
    </div>
  );
}

export default page