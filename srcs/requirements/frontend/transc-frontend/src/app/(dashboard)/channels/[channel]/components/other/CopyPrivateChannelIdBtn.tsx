// "use client"

// import Image from "next/image"
// import { socket } from "../../../page";
// import { redirect, useRouter } from 'next/navigation'
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from 'universal-cookie';

// interface CopyPrivateChannelIdBtn{
//     channelId: string,
//     userId: string,
// }


// function CopyPrivateChannelIdBtn({channelId,userId} : CopyPrivateChannelIdBtn) {


//     return (
//         <div className="w-full h-[15%] flex items-center justify-center" >
//             <button className="w-[70%] h-[50px] bg-white rounded-full flex items-center ">
//                 <div className="pl-[16px] mr-[32%] flex items-center">
//                     <Image src={"/shareLink.svg"} width={14} height={8} alt={"leave"} className="" />
//                     {/* <Image src={"/vector.svg"} width={14} height={21} alt={"leave"} className="relative left-[50%]" /> */}

//                 </div>
//                 <div className="text-primary text-[17px] font-poppins font-medium uppercase">
//                     link
//                 </div>
//             </button>
//         </div>
//     )
// }
// export default CopyPrivateChannelIdBtn;
