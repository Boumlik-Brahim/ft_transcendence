'use client'
import React, { useEffect } from 'react'
import Friendsbar from '../../../../components/Friendsbar'
import Image from "next/image";
import { useState } from 'react';
import Cookies from 'universal-cookie';
import Link from 'next/link';

function page() {
  const cookies = new Cookies();
  const userId = cookies.get('id');
  const [disableTwoFa, setDisableTwoFa] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    async function fetchData () {
      try{
        const data = await fetch(`http://localhost:3000/users/${userId}`);
        if (data.ok){
          const userData = await data.json();
          setImageUrl(userData.Avatar);
        }
        else {
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchData();
  },[])
  
  const handleActiveClick = async () => {
      try {
        const userData = await fetch(`http://localhost:3000/users/${userId}`);
        if (userData.ok){
          const user = await userData.json();
          if(user.isTwoFactorEnabled){
            console.log("Found TwoFactorEnable");
            setDisableTwoFa(false);
            await fetch(`http://localhost:3000/users/${userId}/two-factor`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ isTwoFactorEnabled: false }), 
            });;
          }
          // else {
          //   console.log("Found TwoFactorDisable");
          //   setDisableTwoFa(true);
          // }
        }
        else{
          console.error('Failed to fetch user data');
        }
      }
      catch(error) {
        console.error('Error fetching user data:', error);
      }
  }
  useEffect(() => {
    async function check () {
      const userData = await fetch(`http://localhost:3000/users/${userId}`);
      const user = await userData.json();
      if (user.isTwoFactorEnabled){
        setDisableTwoFa(true);
      }
    }
    check();
  }, [])

  // async function postData (data: FormData) {
  //   try{
  //     const response = await fetch('http://localhost:3000/upload', {
  //       method: 'POST',
  //       body: data,
  //     });
  //   }
  //   catch (error) {

  //   }
  // }

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    try{
      // setSelectedFile(file);
      const formData = new FormData();
      if (selectedFile) {
        formData.append('image', selectedFile);
        const response = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData,
        });
      }
    }
    catch(error) {
      console.error(error);
    }
  };


  return (
    <div className="layouts">
      <div className='px-[20%] w-full h-[80vh] flex flex-col justify-evenly item-center text-[#3E3B6A] md:h-[100vh]'>
        <div className='flex justify-center item-center font-press'>
          <h1>Edit Profile</h1>
        </div>
        <div className='flex flex-col self-center'>
          <Image 
            src={`${imageUrl}`}
            width={150}
            height={150}
            alt=""
            className='rounded-full'
          />
          <div className="group w-12 h-12 bg-white flex items-center justify-center self-center mt-[-20px] rounded-full relative">
            <label className="">
              <svg className="w-8 h-8 cursor-pointer tracking-wide" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <p className="absolute mt-6 ml-10 text-sm text-center w-24 bg-opacity-50 bg-black text-white py-1 rounded opacity-0 group-hover:opacity-100">
              Upload Image
            </p>
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
                <Link
                href="/TwoFa" className='w-[90%] h-[30px] text-white self-center text-center bg-[#3E3B6A] border rounded-lg'
                >
                  TwoFa
                </Link>
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