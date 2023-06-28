import {HiChatAlt2} from 'react-icons/hi';


export default function OnlineFriendsBox({id, picture, status, user_name} : {id : number, picture: string, status: string, user_name: string}) {
    return (
        <>
            <div className="w-full h-[60px] px-[10px]">
                <div className="flex items-center  justify-between w-full h-full">
                    <div className="flex items-center">
                        <div className="flex relative">
                            <img  src={`imgs/${picture}`} alt="profile_picture" className="w-[40px] h-[40px] mr-[10px] rounded-full" />
                            <span className={`absolute bottom-0 right-3  w-[10px] h-[10px] ${status} rounded-full`}></span>
                        </div>
                        <div className=" max-w-[170px] font-poppins text-left text-sm text-white font-semibold leading-6 tracking-wider truncate">
                           {user_name}
                        </div>
                    </div>
                    <div><HiChatAlt2 className="text-[22px] text-white cursor-pointer" /></div>
                </div>
            </div>
            <hr className="border-t-2  border-gray-400 w-full mt-[5px]" />
        </>
    )
}
