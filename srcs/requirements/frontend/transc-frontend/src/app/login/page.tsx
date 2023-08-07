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
          if (res.data.isTwoFactorEnabled){
            setTwoFa(true);
            console.log("setted res.data.isTwoFactorEnabled -----+------");
          }
          if (!res.data.isTwoFactorEnabled && accessTokenCookie) {
            return router.push(`/profile/${userId}`);
          }
          // if (res.data.isTwoFactorEnabled && !accessTokenCookie)
          // setTwoFa(true);
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
  
  //------------------------------
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
      const response = await fetch(`http://localhost:3000/auth/2fa/authenticate?userId=${userId}&authCode=${concatenatedString}`, {
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
      console.log(error);
    }
    setFormData({inputField1: "",
    inputField2: "",
    inputField3: "",
    inputField4: "",
    inputField5: "",
    inputField6: ""})
  };
  //-----------------------------------------
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
      <div >
        {twoFa && 
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
             <button type="submit" className="mt-4 bg-[#3E3B6A] text-white px-4 py-2 rounded-md">
               Submit
           </button>
         </form>
       </div>}
      </div>
    </div>
  );
}

// export default page