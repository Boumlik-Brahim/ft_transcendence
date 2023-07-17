import Friendsbar from '../../../../components/Friendsbar'
import Image from "next/image"
import Link from 'next/link'
import { avatar, notification_b, winner } from '../../../../public'
import './leaderboard.css'
import { leaderboard_list } from '../../../../constant'

function page() {
  return (
    <div className="layouts">
      <div className="my_container">
        <div className="wrapper relative">
          <p className="title">Leaderboard</p>
          <div className="md:block absolute right-[10px] top-[0px] hidden">
            <Link href={'/'}> <Image src={notification_b} width={40} alt="avatar" /> </Link>
          </div>

          {/* <div className="topthree">
            <div className="topuser text-[#F0831E]">
              <Image src={avatar} width={120} alt="avatar" /> 
              <p>{'bastilay l7ot'}</p>
            </div>
            <div className="topuser text-[#F2A901] relative">
              <Image src={winner} alt="avatar" className='absolute w-[350px] max-w-[500px] z-0 bottom-[10px]' /> 
              <Image src={avatar} width={180} alt="avatar"  className='z-10'/> 
              <p>{'Osama bel'}</p>
            </div>
            <div className="topuser text-[#C0C0C0]">
              <Image src={avatar} width={100} alt="avatar" /> 
              <p>{'mol 7anot'}</p>
            </div>
          </div> */}

          <ul className='flex flex-col gap-[30px] w-full'>
            {
              leaderboard_list.map((ply, index) => (
                <li className='flex w-full items-center'>
                  <p className='text-s font-semibold text-primary w-[50px] flex items-center justify-center'>
                    {index + 1}
                  </p>
                  <div className='flex items-center justify-between h-[50px] pr-[20px] min-w-[200px] w-full gradients rounded-full'>
                    <Link href={'/'} className='flex items-center gap-[10px] max-w-[100px] xs:max-w-[200px]'> 
                      <Image src={ply.avarat} width={70} alt="avatar" /> 
                      <p className='text-xs xs:text-sm font-semibold text-primary'>{ply.name}</p>
                    </Link>
                    <p className='text-s font-semibold text-primary'>
                      {ply.point}
                    </p>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      <Friendsbar />
    </div> 
  )
}

export default page