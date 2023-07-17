import Friendsbar from '../../../../components/Friendsbar'
import Image from "next/image"
import Link from 'next/link'
import { achievements, notification_b } from '../../../../public'
import { history_game } from '../../../../constant'

function page() {
  return (
    <div className="layouts">
    <div className="my_container">
      <div className="wrapper relative">
        <p className="title">Achievements</p>
        <div className="md:block absolute right-[10px] top-[0px] hidden">
          <Link href={'/'}> <Image src={notification_b} width={40} alt="avatar" /> </Link>
        </div>

        <ul className="flex flex-col xs:flex-row flex-wrap gap-[20px] mt-[5rem]">
            {
              achievements.map((ach, index) => (
                <li key={index} className={`achievement ${(index % 2) ? ("achievement_yes") : ("achievement_not")}`}>
                  <Image src={ach} width={70} alt="ach" />
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