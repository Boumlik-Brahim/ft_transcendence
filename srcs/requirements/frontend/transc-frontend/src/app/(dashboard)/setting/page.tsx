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
  const [enterInput, setEnterInput] = useState("hidden");
  const [qrCodeActive, setQrCode] = useState<boolean>(false);
  const [disableTwoFa, setDisableTwoFa] = useState<boolean>(false);
  const [checkIfTwoFa, setCheckIfTwoFa] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const userData = await fetch(`http://localhost:3000/users/${userId}`);
      if (userData.ok){
        const user = await userData.json();
        if(user.isTwoFactorEnabled){
          setDisableTwoFa(false);
          await fetch(`http://localhost:3000/users/${userId}/two-factor`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isTwoFactorEnabled: false }), 
          });;
        }
      }
      else{
        console.error('Failed to fetch user data');
      }
    }
    catch(error) {
      console.error('Error fetching user data:', error);
    }
  }

  const handleActiveClick = () => {
    setQrCode(true);
    setEnterInput("");
    fetchData();
  }
  
  const [formData, setFormData] = useState({
    inputField1: '',
    inputField2: '',
    inputField3: '',
    inputField4: '',
    inputField5: '',
    inputField6: '',
  });
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      console.log(e.target.name);
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    async function check () {
      const userData = await fetch(`http://localhost:3000/users/${userId}`);
      const user = await userData.json();
      if (user.isTwoFactorEnabled){
        setDisableTwoFa(true);
        setCheckIfTwoFa(false);
        setEnterInput("hidden");
        setQrCode(false);
      }
    }
    check();
  }, [checkIfTwoFa])
  
  const handleSaveClick = async () => {
    console.log('Form Data:', formData);
    fetch(`http://localhost:3000/auth/2fa/turn-on?userId=${userId}&authCode=${formData}`, {
      method: 'POST',
    })
    setCheckIfTwoFa(true);
  };

  return (
    <div className="layouts">
      <div className='px-[20%] w-full h-[80vh] flex flex-col justify-start item-center text-[#3E3B6A] md:h-[100vh]'>
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
              name="username"
              className='border'> 
              </input>
          </form>
        </div>
        <div className='w-full flex flex-col item-center justify-center' >
          <h3 className='flex justify-center item-center'>2FA-AUTHENTICATOR</h3>
          {
            disableTwoFa ? (
              <button onClick={handleActiveClick} className='w-[90%] h-[30px] text-white self-center text-center bg-[#3E3B6A] border rounded-lg'>Desactivate</button>
              ) : (
                <button onClick={handleActiveClick} className='w-[90%] h-[30px] text-white self-center text-center bg-[#3E3B6A] border rounded-lg'>ACTIVE</button>
            )
          }
        </div>
        <div className='flex flex-col items-center'>
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
          <form action="" method="post" className={`${enterInput}`}>
              <div className="flex space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-md">
                  <div className="w-12 h-12 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="number"
                      name="inputField1"
                      id="inputField1"
                      max="1"
                      onChange={handleChange}
                      value={formData.inputField1}
                    ></input>
                  </div>
                  <div className="w-12 h-12 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="number"
                      name="inputField2"
                      id="inputField2"
                      max="1"
                      onChange={handleChange}
                      value={formData.inputField2}
                    ></input>
                  </div>
                  <div className="w-12 h-12 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="number"
                      name="inputField3"
                      id="inputField3"
                      max="1"
                      onChange={handleChange}
                      value={formData.inputField3}
                    ></input>
                  </div>
                  <div className="w-12 h-12 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="number"
                      name="inputField4"
                      id="inputField4"
                      max="1"
                      onChange={handleChange}
                      value={formData.inputField4}
                    ></input>
                  </div>
                  <div className="w-12 h-12 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="number"
                      name="inputField5"
                      id="inputField5"
                      max="1"
                      onChange={handleChange}
                      value={formData.inputField5}
                      ></input>
                  </div>
                  <div className="w-12 h-12 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="number"
                      name="inputField6"
                      id="inputField6"
                      max="1"
                      onChange={handleChange}
                      value={formData.inputField6}
                    ></input>
                  </div>
                </div>
              </div>
          </form>
        </div>
        <div className='w-full flex justify-center item-center'>
          <button onClick={handleSaveClick} className='w-[90%] h-[30px] text-white bg-[#3E3B6A] border rounded-lg'>SAVE</button>
        </div>
      </div>
      <Friendsbar />
    </div>
  );
}

export default page