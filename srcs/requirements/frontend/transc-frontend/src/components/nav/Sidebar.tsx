import {CgProfile} from 'react-icons/cg';
import {HiPresentationChartBar} from 'react-icons/hi'
import {GiAchievement, GiClassicalKnowledge} from 'react-icons/gi'
import {MdGroups2} from 'react-icons/md'
import {HiChat} from 'react-icons/hi'
import {IoLogoGameControllerB} from 'react-icons/io'
import {BsPower} from 'react-icons/bs'
// import {GiThreeBurningBalls} from 'react-icons/gi'
import { useNavigate } from 'react-router-dom';
// import {FaTableTennis} from 'react-icons/fa'

type IconType = 'CgProfile' | 'HiPresentationChartBar' | 'GiAchievement' | 'HiChat' | 'MdGroups2' | 'IoLogoGameControllerB' | 'BsPower';



export default function Sidebar() {

    let color : string = 'text-primary-400';
    let colorCheckedIcons : string = 'text-secondary-500';
    const navigate = useNavigate();
    const handleIconClick = (icon: IconType) => {
        const iconElements = document.querySelectorAll('.icon');
        iconElements.forEach((iconElement) => {
            iconElement.classList.remove(`${colorCheckedIcons}`);
        });
        const selectedIconElement = document.querySelector(`.${icon}`);
        selectedIconElement?.classList.add(`${colorCheckedIcons}`);

        switch (icon) {
            case 'CgProfile':
              navigate('/profile');
              break;
            case 'HiPresentationChartBar':
              navigate('/leaderboard');
              break;
            case 'GiAchievement':
              navigate('/achievement');
              break;
            case 'HiChat':
              navigate('/chat');
              break;
            case 'MdGroups2':
              navigate('/channels');
              break;
            case 'IoLogoGameControllerB':
              navigate('/game');
              break;
            case 'BsPower':
              navigate('/game');
              break;
            default:
              break;
          }
};

return (
        <div className={`col-span-2 sm:col-span-3 bg-primary-900 ${color}`}>
            <div className="flex flex-col items-center w-full h-full justify-between">
                <div className={`mt-[50px]  ${color} h-2  flex flex-col sm:items-center sm:justify-start pr-8`}>
                    <div className="sm:text-lg sm:flex sm:items-center sm:flex-col">
                            <span className="block mt-auto w-[90px] h-[90px]"><img src='./imgs/logo.png'/></span> 
                            <p className='pt-2 text-primary-400 font-press text-xl '>Pong Zone</p>   
                    </div>
                </div>
                <div className="flex flex-col gap-6 sm:gap-9 items-center sm:items-start  ">
                    <span onClick={() => handleIconClick('CgProfile')} className={`${color} cursor-pointer CgProfile icon sm:flex sm:items-center `}>
                        <CgProfile size={25}/>
                        <p className='hidden sm:flex sm:pl-5 sm:text-xl font-poppins '>Profile</p>
                     </span>
                    <span onClick={() => handleIconClick('HiPresentationChartBar')} className={`${color} cursor-pointer HiPresentationChartBar icon sm:flex sm:items-center`}>
                        <HiPresentationChartBar size={25}/>
                        <p className='hidden sm:flex sm:pl-5 sm:text-lg font-poppins'>Leaderboard</p>
                    </span>
                    <span onClick={() => handleIconClick('GiAchievement')} className={`${color} cursor-pointer GiAchievement icon sm:flex sm:items-center  `}>
                        <GiAchievement size={25}/>
                        <p className='hidden sm:flex sm:pl-5 sm:text-lg sm:font-poppins'>Achievements</p>
                        </span>
                    <span onClick={() => handleIconClick('HiChat')} className={`${color} cursor-pointer HiChat icon sm:flex sm:items-center`}>
                        <HiChat  size={25}/>
                        <p className='hidden sm:flex sm:pl-5 sm:text-lg sm:font-poppins'>Chat</p>
                    </span>
                    <span onClick={() => handleIconClick('MdGroups2')} className={`${color} cursor-pointer MdGroups2 icon sm:flex sm:items-center`}>
                        <MdGroups2  size={25}/>
                        <p className='hidden sm:flex sm:pl-5 sm:text-lg sm:font-poppins'>Channels</p>
                    </span>
                    <span onClick={() => handleIconClick('IoLogoGameControllerB')} className={`${color} cursor-pointer IoLogoGameControllerB icon sm:flex sm:items-center`}>
                        <IoLogoGameControllerB  size={25}/>
                        <p className='hidden sm:flex sm:pl-5 sm:text-lg sm:font-poppins'>Game</p>
                    </span>
                </div>
                <div className="pb-5 text-primary-400 ">
                    <span onClick={() => handleIconClick('BsPower')} className={`${color} cursor-pointer BsPower icon sm:flex sm:items-center `}>
                        <BsPower size={25}/>
                        <p className='hidden sm:flex sm:pl-3 sm:text-lg sm:font-poppins   '>Logout</p>
                    </span>
                </div>
            </div>
        </div>
);
}