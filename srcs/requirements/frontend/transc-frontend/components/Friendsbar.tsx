import { OnlineFriends } from "../constant"
import Image from 'next/image'
import { message_w, search_w } from "../public";


function Friendsbar() {
  const online_array = OnlineFriends;
  return (
    <div className='friend'>
      {/* <div className="border flex items-center relative rounded-full w-full p-[10px] gap-[20px] max-w-[400px]">
        <Image src={search_w} width={50} alt="search" />
        <input type="text" placeholder="Search" className="w-full h-[40px] border-none bg-primary border-0 outline-0 text-white "/>
      </div>
      <hr className="w-full max-w-[400px]"/> */}
      <div className="w-[70%] flex flex-col gap-[50px]">
        <h1 className="text-white text-2xl font-bold place-self-start">Online Friend</h1>
        <ul className="w-full flex flex-col gap-[30px] min-w-[200px]">
            {
              online_array.map((friend, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div className="relative flex items-center gap-[10px] w-[100px]">
                    <div className="status"></div>
                    <Image key={`${friend.name}-${friend.id}`} src={friend.avarat} width={50} alt={friend.name} />
                    <p className="text-white">
                      {friend.name}
                    </p>
                  </div>
                  <div className="friend_message">
                    <Image key={`${friend.name}-${friend.id}`} src={message_w} width={30} alt={friend.name} />
                  </div>
                </li>

              ))
            }
        </ul>
      </div>
    </div>
  )
}

export default Friendsbar