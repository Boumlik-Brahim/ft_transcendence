'use client'
import React, { useEffect } from 'react'
import Friendsbar from '../../../../components/Friendsbar'
import Image from "next/image";
import { useState } from 'react';
import Cookies from 'universal-cookie';
import Link from 'next/link';
import Sidebar from '../../../../components/Sidebar';
import Notification from '../../../../components/Notification';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function page() {
  /* ------------------------------------ - ----------------------------------- */
  const cookies = new Cookies();
  const userId: string = cookies.get('id');
  const accessToken: string = cookies.get('accessToken');
  const [disableTwoFa, setDisableTwoFa] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [userData, setUserData] = useState<string>("");

  useEffect(() => {
    async function TakeImageUrl() {
      try{
        const data = await fetch(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userId}/image`,{
          credentials: "include",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (data.ok){
          const userData = await data.json();
          setImageUrl(userData.Avatar);
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    TakeImageUrl();
  },[imageUrl])
  
  useEffect(() => {
    async function checkTwoFa () {
      const userData = await fetch(`http://localhost:3000/users/${userId}`,{
        credentials: "include",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const user = await userData.json();
      if (user.isTwoFactorEnabled){
        setDisableTwoFa(true);
      }
    }
    checkTwoFa();
  }, [])

  const handleActiveClick = async () => {
      try {
        const userData = await fetch(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userId}`);
        if (userData.ok){
          const user = await userData.json();
          if(user.isTwoFactorEnabled){
            setDisableTwoFa(false);
            await fetch(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userId}/two-factor`, {
              method: 'PATCH',
              credentials: "include",
              headers: {
                Authorization: `Bearer ${accessToken}`,
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

  const handleUserNameChange = (event: any) => {
    setUserData(event.target.value);
  }

  const handleSaveClick = async () => {
    if (userData){
      const username = userData;
      setUserData('');
      const response = await fetch(`http://localhost:3000/users/${userId}/update/username`,{
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: username }), 
      });
      if (response.ok){
        toast.success('Saved successfully!', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
    else{
      // I need to show the user an message of invalid input
    }
    setUserData('');
  }
  
  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    try{
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch(`http://localhost:3000/users/${userId}/upload`, {
        method: 'POST',
        body: formData,
        credentials: "include",
      });
      if (response.ok){
        const res = await response.json();
        setImageUrl(res.data);
        toast.success('Saved successfully!', {
          position: toast.POSITION.TOP_CENTER,
        });   
      }
      else{
        toast.error('Wrong File!', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
    catch(error) {
      console.error(error);
    }
  };


  return (
    <>
      <Sidebar/>
      <div className="layouts">
        <div className="my_container relative">
          <div className="wrapper relative">
            <div className="md:block absolute right-[0px] top-[0px] hidden">
            {  <Notification userId={userId} userSession={userId} />}
            </div>
          </div>
          <div className=''>
            <form className='w-full flex flex-col justify-center'>
              <label htmlFor="" className=' mb-1 text-lg self-center'>USERNAME</label>
              <input 
                type="text"
                id="username"
                name="username"
                placeholder="userName"
                value={userData}
                onChange={handleUserNameChange}
                className='border-[2px] w-[240px] h-[40px] pl-[2px] self-center rounded-lg'> 
                </input>
            </form>
          </div>
          <div className='w-full flex flex-col item-center justify-center' >
            <h3 className='mb-1 text-lg self-center'>2FA-AUTHENTICATOR</h3>
            {
              disableTwoFa ? (
                <button onClick={handleActiveClick} className='w-[240px] h-[40px]  text-white self-center text-center bg-[#3E3B6A] border rounded-lg'>Desactivate</button>
                ) : (
                  <Link
                  href="/twofa" className='w-[240px] h-[40px] self-center text-white text-center bg-[#3E3B6A] rounded-lg'
                  >
                    <p className='h-full flex justify-center items-center text-lg'>TwoFa</p>
                  </Link>
              )
            }
            <ToastContainer/>
          </div>
          <div className='self-center '>
            <button onClick={handleSaveClick} className='w-[240px] h-[40px] self-center text-white text-lg bg-[#3E3B6A] rounded-lg'>SAVE</button>
            <ToastContainer/>
          </div>
      </div>
        <Friendsbar
          userId= {userId}
          userSessionId = {userId}
        />
      </div>
    </>
  );
}

export default page