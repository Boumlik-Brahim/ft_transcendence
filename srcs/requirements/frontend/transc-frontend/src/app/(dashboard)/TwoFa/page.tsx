'use client'
import React from "react";
import QRCodePage from '../../../../components/QrCode';
import Cookies from 'universal-cookie'
import { useState } from "react";
import Sidebar from "../../../../components/Sidebar";
import Image from "next/image"
import Link from "next/link"
import TwoFaForm from "../../../../components/TwoFaForm";


export default function TwoFa () {
  const cookies = new Cookies();
  const userId = cookies.get('id');
  
  return (
    <>
      <Sidebar/>
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
    </>
  );
}