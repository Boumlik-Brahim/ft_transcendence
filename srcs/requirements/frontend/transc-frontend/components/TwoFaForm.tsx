'use client'
import React, {useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import {useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props{
    userId: string,
}

export default function TwoFaForm({userId}: Props) {
  
  const [shouldNavigate, setShouldNavigate] = useState<boolean>(false);
  const [formData, setFormData] = useState({f1: "", f2: "", f3: "", f4: "", f5: "", f6: ""});
  
  const cookie = new Cookies();
  const router = useRouter();

  const accessToken = cookie.get('accessToken');
  const maxInputFields = 6;
  const inputFieldIds = Array.from({ length: maxInputFields }, (_, index) => `inputField${index + 1}`);
    
    
  useEffect(() => {
    if (shouldNavigate)
      router.push(`${process.env.NEXT_PUBLIC_APP_URI}:5173/setting`);
  }, [shouldNavigate])
  
  const handleChange = async (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formDataValues = Object.values(formData);
    const concatenatedString = formDataValues.join("");
    try {
      const userData = await fetch(`${process.env.NEXT_PUBLIC_APP_URI}:3000/users/${userId}`);
      const user = await userData.json();
      const response = user.isTwoFactorEnabled ? 
        await fetch(`${process.env.NEXT_PUBLIC_APP_URI}:3000/auth/2fa/authenticate?userId=${userId}&authCode=${concatenatedString}`, {
          method: 'POST',
        }) :
        await fetch(`${process.env.NEXT_PUBLIC_APP_URI}:3000/auth/2fa/turn-on?userId=${userId}&authCode=${concatenatedString}`,{
          method: "POST",
        });
      if (response.ok){
        const res = await response.json();
        if (accessToken === undefined)
          cookie.set('accessToken', res.token);
        setShouldNavigate(true);
      }
      else if (!response.ok){
        toast.error('Wrong Code!', {
          position: toast.POSITION.TOP_CENTER,
        });
        setFormData({f1: "", f2: "", f3: "", f4: "", f5: "", f6: ""})
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form action="" method="post" onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <div className="w-[80%] flex flex-row items-center justify-evenly mx-auto
            md:w-[100%]">
            {inputFieldIds.map((fieldId, index) => (
                <div className="w-16 h-16" key={fieldId}>
                  <input
                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-sm bg-white focus:bg-gray-200 focus:ring-1 ring-[#3E3B6A]"
                    type="text"
                    name={fieldId}
                    id={fieldId}
                    pattern="^[0-9]$"
                    maxLength={1} 
                    value={formData[fieldId as keyof typeof formData]}
                    onChange={handleChange}
                  />
                </div>
              ))}
        </div>
        <button type="submit" className="mt-12 bg-[#3E3B6A] text-white px-4 py-2 rounded-md">
          Submit
        </button>
        <ToastContainer/>
      </form>
    </div>
  )
}