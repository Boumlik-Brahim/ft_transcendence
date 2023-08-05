'use client'
import React from "react";
import QRCodePage from '../../../../components/QrCode';
import Cookies from 'universal-cookie'
import { useState } from "react";


export default function TwoFa () {
  const cookies = new Cookies();
  const userId = cookies.get('id');
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formDataValues = Object.values(formData);
    const concatenatedString = formDataValues.join("");
    try {
      const response = await fetch(`http://localhost:3000/auth/2fa/turn-on?userId=${userId}&authCode=${concatenatedString}`, {
        method: 'POST',
      })
      if (!response.ok) {
        if (response.status === 401) {
          const errorData = await response.json();
          alert("Authentication failed: " + errorData.message);
        } else {
          console.log("Unexpected error occurred.");
        }
      }
    } catch (error) {
      console.log("-------------Catch Error---------------", error);
    }
  };

  return (
    <div className="h-[80vh] flex flex-col items-center justify-start">
      <div className="w-[50%]  flex justify-center item-center border-2 rounded-lg my-4">
        <QRCodePage userId={userId} />
      </div>
      <div>
        <form action="" method="post" onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
            <div className="w-[80%] flex flex-row items-center justify-evenly mx-auto no-scrollbar">
              {inputFieldIds.map((fieldId, index) => (
                <div className="w-16 h-16" key={fieldId}>
                  <input
                    className=" no-scrollbar w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-sm bg-white focus:bg-gray-200 focus:ring-1 ring-[#3E3B6A]"
                    type="number"
                    name={fieldId}
                    id={fieldId}
                    value={formData[fieldId as keyof typeof formData]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
            <button type="submit" className="mt-4 bg-[#3E3B6A] text-white px-4 py-2 rounded-md">
              Submit
          </button>
        </form>
      </div>
    </div>
  );
}