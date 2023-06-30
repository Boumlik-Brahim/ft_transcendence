import { useMediaQuery } from '@react-hook/media-query';


interface NavbarProps {
    onClick: (path: string) => void;
}

export default function MediumNav(props: NavbarProps) {
    const isLgScreen = useMediaQuery('(min-width: 1230px)');

    return (
        <div className={`${isLgScreen ? "bg-primary-900 h-full w-full" : "hidden"}`}>
            <div className="w-full h-[15%]  flex items-center justify-center">
                <div className=" w-[80px] h-[40px]  flex flex-col items-center text-white font-press  text-[20px] font-normal leading-5 uppercase">
                    <span >Ping</span>
                    <span>Pong</span>
                </div>
            </div>
            <div className=" w-full h-[70%] flex flex-col items-center justify-center">
                <div className="w-[254px] h-[48px] bg-white rounded-full mt-[12px] flex items-center pl-[30px] cursor-pointer" onClick={() => props.onClick("/profile")}>
                    <div className="w-[160px] h-full flex items-center ">
                        <img src="/imgs/profile.png" className="w-[30px] h-[30px]" />
                        <span className="pl-[6px] font-poppins font-semibold text-[14px]  text-black  tracking-wider">
                            Profile
                        </span>
                    </div>
                </div>
                <div className="w-[254px] h-[48px] bg-white rounded-full mt-[12px] flex items-center pl-[30px] cursor-pointer" onClick={() => props.onClick("/leaderboard")}>
                    <div className="w-[160px] h-full flex items-center ">
                        <img src="/imgs/leaderboard.png" className="w-[30px] h-[30px] " />
                        <span className="pl-[6px] font-poppins font-semibold text-[14px]  text-secondary-400 tracking-wider">
                            Leaderboard
                        </span>
                    </div>
                </div>
                <div className="w-[254px] h-[48px] bg-white rounded-full mt-[12px] flex items-center pl-[30px] cursor-pointer" onClick={() => props.onClick("/achievements")}>
                    <div className="w-[160px] h-full flex items-center ">
                        <img src="/imgs/achievements.png" className="w-[30px] h-[30px]" />
                        <span className="pl-[6px] font-poppins font-semibold text-[14px]  text-secondary-800  tracking-wider">
                            Achievements
                        </span>
                    </div>
                </div>
                <div className="w-[254px] h-[48px] bg-white rounded-full mt-[12px] flex items-center pl-[30px] cursor-pointer" onClick={() => props.onClick("/channels")}>
                    <div className="w-[160px] h-full flex items-center ">
                        <img src="/imgs/channels.png" className="w-[30px] h-[30px]" />
                        <span className="pl-[6px] font-poppins font-semibold text-[14px]  text-secondary-700  tracking-wider">
                            Channels
                        </span>
                    </div>
                </div>
                <div className="w-[254px] h-[48px] bg-white rounded-full mt-[12px] flex items-center pl-[30px] cursor-pointer " onClick={() => props.onClick("/friends")}>
                    <div className="w-[160px] h-full flex items-center ">
                        <img src="/imgs/friends.png" className="w-[30px] h-[30px]" />
                        <span className="pl-[6px] font-poppins font-semibold text-[14px]  text-secondary-200  tracking-wider">
                            Friends
                        </span>
                    </div>
                </div>
                <div className="w-[254px] h-[48px] bg-white rounded-full mt-[12px] flex items-center pl-[30px] cursor-pointer" onClick={() => props.onClick("/settings")}>
                    <div className="w-[160px] h-full flex items-center ">
                        <img src="/imgs/settings1.png" className="w-[30px] h-[30px]" />
                        <span className="pl-[6px] font-poppins font-semibold text-[14px]  text-secondary-100  tracking-wider">
                            Settings
                        </span>
                    </div>
                </div>
                <div className="w-[254px] h-[48px] bg-white rounded-full mt-[12px] flex items-center pl-[30px] cursor-pointer" onClick={() => props.onClick("/game")}>
                    <div className="w-[160px] h-full flex items-center ">
                        <img src="/imgs/play.png" className="w-[30px] h-[30px]" />
                        <span className="pl-[6px] font-poppins font-semibold text-[14px]  text-primary-800  tracking-wider">
                            Play
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-full h-[15%] flex items-center justify-center">
                <div className="w-[254px] h-[48px] bg-white rounded-full flex items-center  pl-[30px] cursor-pointer">
                    <div className="w-[160px] h-full flex items-center ">
                        <img src="/imgs/logout.png" className="w-[30px] h-[30px]" />
                        <span className="pl-[6px] font-poppins font-semibold text-[14px]  text-primary-800  tracking-wider">
                            Logout
                        </span>
                    </div>
                </div>
            </div>

        </div>

    );
}