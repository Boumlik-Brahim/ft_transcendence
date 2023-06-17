import {CgProfile} from 'react-icons/cg';
import {HiPresentationChartBar} from 'react-icons/hi'
import {GiAchievement, GiClassicalKnowledge} from 'react-icons/gi'
import {MdGroups2} from 'react-icons/md'
import {HiChat} from 'react-icons/hi'
import {IoLogoGameControllerB} from 'react-icons/io'
import {BsPower} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';



type IconType = 'CgProfile' | 'HiPresentationChartBar' | 'GiAchievement' | 'HiChat' | 'MdGroups2' | 'IoLogoGameControllerB' | 'BsPower';



export default function Sidebar() {
    const color = 'text-primary-400';
    const colorCheckedIcons = 'text-secondary-500';
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
        <div className={`col-span-2 sm:col-span-3 lg:col-span-3  bg-primary-900 ${color} border-2 border-yellow-400`}>
            <div className="flex flex-col items-center w-full h-full justify-between ">
                {/* <div className={`mt-[50px]  ${color} h-2  flex flex-col sm:items-center sm:justify-start pr-8`}> */}
                    <div className="mt-[60px]  xs:mt-[50px] xs:mb-[30px] lg:mt-[40px] lg:mb-[80px] ${color} h-2 sm:text-lg flex items-center flex-col ">
                            {/* <span className="sm:block sm:mt-auto sm:w-[90px] sm:h-[90px]  w-[40px] h-[20px]"> */}
                              <img className='xxs:w-[40px] xxs:[40px]  xs:w-[50px] xs:[50px] sm:w-[90px] sm:h-[90px] w-[60px] h-[60px]  md:w-[110px] md:h-[110px] lg:w-[70px] lg:h-[70px]' src='./imgs/logo.png'/>
                              {/* </span>  */}
                            <p className='pt-2 text-primary-400 font-press text-sm xxs:text-[11px] xs:text-[16px] md:text-2xl font-extrabold  text-center '>Pong <span className='text-secondary-500 '>Z</span>one</p>   
                    {/* </div> */}
                </div>
                <div className="flex flex-col xs:gap-6 gap-7 sm:gap-0 lg:gap-4 sm:items-start  md:gap-6 items-center justify-center border-2 border-green-400 w-full h-full">
                    <div onClick={() => handleIconClick('CgProfile')} className={`${color} cursor-pointer CgProfile icon sm:justify-start sm:pl-4 w-full border-2 border-black-400 bg-black lg:bg-red-500 flex lg:pl-8 md:bg-green-700  xl:bg-yellow-300 md:pl-6 md:justify-start lg:justify-start justify-center items-center`}>
                      
                        <span className='text-3xl xxs:text-[22px] xs:text-2xl md:text-4xl lg:text-[27px] f'>
                            <CgProfile />
                        </span>
                        <p className='hidden  sm:flex sm:pl-[15px] pl-5 text-xl font-poppins md:text-xl lg:text-[18px]'>Profile</p>
                     </div>
                    
                    <div onClick={() => handleIconClick('HiPresentationChartBar')} className={`${color} cursor-pointer HiPresentationChartBar icon sm:justify-start sm:pl-4 w-full border-2 border-black-400 lg:bg-red-500 flex lg:pl-8 lg:justify-start md:bg-green-700 md:pl-6 md:justify-start justify-center items-center`}>
                    
                        <span className='text-3xl xxs:text-[22px] xs:text-2xl md:text-4xl lg:text-[27px]'>
                          <HiPresentationChartBar/>
                        </span>
                        <p className='hidden sm:flex sm:pl-[15px] pl-5 sm:text-lg font-poppins md:text-xl lg:text-[18px] '>Leaderboard</p>
                    </div>
  
                    <div onClick={() => handleIconClick('GiAchievement')} className={`${color} cursor-pointer GiAchievement icon sm:justify-start sm:pl-4 w-full border-2 border-black-400 sm:bg-cyan-500 bg-red-500 flex lg:pl-8 lg:justify-start md:bg-green-700 md:pl-6 md:justify-start justify-center items-center`}>
                        <span className='text-3xl xxs:text-[22px] xs:text-2xl md:text-4xl lg:text-[27px]'>
                          <GiAchievement/>
                        </span>
                        <p className='hidden sm:flex sm:pl-[15px] pl-5 sm:text-lg sm:font-poppins md:text-xl lg:text-[18px]'>Achievements</p>
                    </div>
                    <div onClick={() => handleIconClick('HiChat')} className={`${color} cursor-pointer HiChat icon sm:justify-start sm:pl-4 w-full border-2 border-black-400 lg:bg-red-500 flex lg:pl-8 lg:justify-start md:bg-green-700 md:pl-6 md:justify-start justify-center items-center`}>
                        <span className='text-3xl xxs:text-[22px] xs:text-2xl md:text-4xl lg:text-[27px]'>
                          <HiChat />
                        </span>
                        <p className='hidden sm:flex sm:pl-[15px] pl-5 sm:text-lg sm:font-poppins md:text-xl lg:text-[18px]'>Chat</p>
                    </div>
                    <div onClick={() => handleIconClick('MdGroups2')} className={`${color} cursor-pointer MdGroups2 icon sm:justify-start sm:pl-4 w-full border-2 border-black-400 lg:bg-red-500 flex lg:pl-8 lg:justify-start md:bg-green-700 md:pl-6 md:justify-start justify-center items-center`}>
                        <span className='text-3xl xxs:text-[22px] xs:text-2xl md:text-4xl lg:text-[27px]'>
                          <MdGroups2 />
                        </span>
                        <p className='hidden sm:flex sm:pl-[15px] pl-5 sm:text-lg sm:font-poppins md:text-xl lg:text-[18px]'>Channels</p>
                    </div>
                    <div onClick={() => handleIconClick('IoLogoGameControllerB')} className={`${color} cursor-pointer IoLogoGameControllerB icon  sm:justify-start sm:pl-4 w-full border-2 border-black-400 lg:bg-red-500 flex lg:pl-8 lg:justify-start md:bg-green-700 md:pl-6 md:justify-start justify-center items-center`}>
                        <span className='text-3xl xxs:text-[22px] xs:text-2xl md:text-4xl lg:text-[27px]'>
                          <IoLogoGameControllerB />
                        </span>
                        <p className='hidden sm:flex sm:pl-[15px] pl-5 sm:text-lg sm:font-poppins md:text-xl lg:text-[18px]'>Game</p>
                    </div>
                    </div>
                <div className="pb-5 ">
                    <div onClick={() => handleIconClick('BsPower')} className={`${color} cursor-pointer BsPower icon w-full border-2 border-black-400 sm:justify-center xs:justify-center  lg:bg-red-500 flex lg:pl-6 lg:justify-start justify-center items-center`}>
                        <span className='text-3xl xxs:text-[22px] xs:text-2xl  md:text-4xl '>
                          <BsPower/>
                        </span>
                        <p className='hidden sm:flex sm:pl-3 sm:text-lg sm:font-poppins  md:text-xl lg:text-[18px]'>Logout</p>
                    </div>
                </div>
            </div>
        </div>
);
}