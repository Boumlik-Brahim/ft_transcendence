'use client'
import React, { Component, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';

interface Props{
    userId: string,
}

const cookie = new Cookies();

export default function TwoFaForm({userId}: Props) {
    const router = useRouter();
    const maxInputFields = 6;
    const inputFieldIds = Array.from({ length: maxInputFields }, (_, index) => `inputField${index + 1}`);
        
    const [formData, setFormData] = useState({
        inputField1: "",
        inputField2: "",
        inputField3: "",
        inputField4: "",
        inputField5: "",
        inputField6: "",
    });

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
            const userData = await fetch(`http://localhost:3000/users/${userId}`);
            const user = await userData.json();
            const response = user.isTwoFactorEnabled ? 
              await fetch(`http://localhost:3000/auth/2fa/authenticate?userId=${userId}&authCode=${concatenatedString}`, {
                method: 'POST',
              }) :
              await fetch(`http://localhost:3000/auth/2fa/turn-on?userId=${userId}&authCode=${concatenatedString}`,{
                method: "POST",
              });
            if (!response.ok) {
              if (response.status === 401) {
                const errorData = await response.json();
                alert("Authentication failed: " + errorData.message);
              } else {
                console.log("Unexpected error occurred.");
              }
            }
            const res = await response.json();
            cookie.set('accessToken', res.token);
            router.push(`http://localhost:5173/profile/${userId}`);
        } catch (error) {
            console.log(error);
        }
        setFormData({inputField1: "",
        inputField2: "",
        inputField3: "",
        inputField4: "",
        inputField5: "",
        inputField6: ""})
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
                    value={formData[fieldId as keyof typeof formData]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
            <button type="submit" className="mt-12 bg-[#3E3B6A] text-white px-4 py-2 rounded-md">
              Submit
          </button>
        </form>
      </div>
    )
}