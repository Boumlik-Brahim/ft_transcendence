'use client'
import React from "react";
import QRCodePage from '../../../../components/QrCode';
import Cookies from 'universal-cookie'
import { useState } from "react";
import Sidebar from "../../../../components/Sidebar";
import Image from "next/image"
import Link from "next/link"
import TwoFaForm from "../../../../components/TwoFaForm";
import Friendsbar from "../../../../components/Friendsbar";
import Notification from "../../../../components/Notification";


export default function TwoFa () {
  const cookies = new Cookies();
  const userId = cookies.get('id');
  
  return (
    <>
      <Sidebar/>
      <div className="layouts">
        <div className="my_container">
        <div className="wrapper relative">
            <div className="md:block absolute right-[0px] top-[0px] hidden">
            {  <Notification userId={userId} userSession={userId} />}
            </div>
          </div>
          <div className="h-[80vh] w-[100%] flex flex-col items-center justify-start mt-[10%]
            md:gap-8">
            <div className="w-[250px] flex justify-center item-center border-2 rounded-lg my-4
              md:w-[300px]">
              <QRCodePage userId={userId} />
            </div>
            <div>
              <TwoFaForm userId={userId}/>
            </div>
            <div className="mt-4">
              <Link href="/setting">
                  <Image
                  src={'/HOME.svg'}
                  width={32}
                  height={32}
                  alt="Go Back"/>
              </Link>
            </div>
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