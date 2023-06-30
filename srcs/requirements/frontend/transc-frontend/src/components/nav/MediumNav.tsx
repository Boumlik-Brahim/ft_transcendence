import { useMediaQuery } from '@react-hook/media-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';


interface NavbarProps {
  onClick: (path: string) => void;
}

export default function MediumNav(props: NavbarProps) {
  const isMdScreen = useMediaQuery('(min-width: 768px)');
  const isLgScreen = useMediaQuery('(min-width: 1230px)');

  const isCreateChannelOn = useSelector((state: RootState) => state.createChannelToggle);
  return (
    <div className={`${isCreateChannelOn.createChannelBtnToggled ? "hidden" : ""} && ${(isMdScreen && !isLgScreen) ? "bg-primary-900 w-full h-full" : "hidden"}`}>
      <div className="w-full h-[15%]  flex items-center justify-center">
        <div className=" w-[80px] h-[40px]  flex flex-col items-center text-white font-press  text-[20px] font-normal leading-5 uppercase">
          <span >Ping</span>
          <span>Pong</span>
        </div>
      </div>
      <div className=" w-full h-[70%] flex flex-col items-center justify-center">
        <div className="w-full h-[48px]  mt-[12px] flex items-center justify-center" onClick={() => props.onClick("/profile")}>
          <img src="/imgs/profile.png" className="w-[30px] h-[30px]" />
        </div>
        <div className="w-full h-[48px]  mt-[25px] flex items-center justify-center" onClick={() => props.onClick("/leaderboard")}>
          <img src="/imgs/leaderboard.png" className="w-[30px] h-[30px] " />
        </div>
        <div className="w-full h-[48px]  mt-[25px] flex items-center justify-center" onClick={() => props.onClick("/achievements")}>
          <img src="/imgs/achievements.png" className="w-[30px] h-[30px]" />
        </div>
        <div className="w-full h-[48px]  mt-[25px] flex items-center justify-center" onClick={() => props.onClick("/channels")}>
          <img src="/imgs/channels.png" className="w-[30px] h-[30px]" />
        </div>
        <div className="w-full h-[48px]  mt-[25px] flex items-center justify-center" onClick={() => props.onClick("/friends")}>
          <img src="/imgs/friends.png" className="w-[30px] h-[30px]" />
        </div>
        <div className="w-full h-[48px]  mt-[25px] flex items-center justify-center" onClick={() => props.onClick("/settings")}>
          <img src="/imgs/settings1.png" className="w-[30px] h-[30px]" />
        </div>
        <div className="w-full h-[48px]  mt-[25px] flex items-center justify-center" onClick={() => props.onClick("/game")}>
          <img src="/imgs/play.png" className="w-[30px] h-[30px]" />
        </div>
      </div>
      <div className="w-full h-[15%] flex items-center justify-center">
        <div className="w-full h-[48px]  flex items-center  justify-center">
          <img src="/imgs/logout.png" className="w-[30px] h-[30px]" />
        </div>
      </div>
    </div>
  )
}


