
import  Image from 'next/image'
import { useEffect, useState } from 'react';
import { socket } from '../../../page';
import Cookies from 'universal-cookie';



interface popUpProps {
    userId: string;
    channelId : string;
    show: boolean;
    clicks : number;
    setClicks:React.Dispatch<React.SetStateAction<number>>
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
  }



  const cookies = new Cookies();
  const userIdFromCookie = cookies.get('id');

function ActionsPopUpOwner({userId, channelId ,show, clicks, setClicks, setShow } : popUpProps){


        // ^ ---------------------------- states for clicks --------------------------------------
        const [btnToggling, setBtnToggling] = useState({
            muteBtnToggled: false,
            BanBtnToggled: false,
            kickBtnToggled: false,
            AdminBtnToggled: false,
        });
    // ^ -------------------------------------------------------------------------------------

    const [durationSeconds, setDurationSeconds] = useState<number>(0);
    const [durationSecondsMute, setDurationSecondsMute] = useState<number>(0);

    const [totalDuration, setTotalDuration] = useState<number>(60);

    function updateDurationSeconds(newDurationSeconds: number) {
        setDurationSeconds(newDurationSeconds);
    }

    function formatDurationString(durationSeconds: number): string {
        if (durationSeconds >= 3600) {
            // Display duration in hours and minutes
            const hours = Math.floor(durationSeconds / 3600);
            const minutes = Math.floor((durationSeconds - hours * 3600) / 60);
            return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')} min`;
        } else {
            // Display duration in minutes
            const minutes = Math.floor(durationSeconds / 60);
            return `${minutes.toString().padStart(1, '0')} min`;
        }
    }

    function handleAddButtonClick() {
        updateDurationSeconds(durationSeconds + 60);
    }

    function handleSubtractButtonClick() {
        updateDurationSeconds(Math.max(durationSeconds - 60, 0));
    }

    useEffect(() => {
        setTotalDuration(Math.ceil(durationSeconds / 60));
    }, [durationSeconds]);

    function updateMuteDurationSeconds(newDurationSeconds: number) {
        setDurationSecondsMute(newDurationSeconds);
    }
    function handleSubtractMuteButtonClick() {
        updateMuteDurationSeconds(Math.max(durationSecondsMute - 60, 0));
    }

    function handleAddMuteButtonClick() {
        updateMuteDurationSeconds(durationSecondsMute + 60);
    }

    useEffect(()=>{

        console.log("----- pop-up ---- : user  : ", userId, " clicked btn");
    },[])

    // const handleToggle = (btnName : string) => {
    //     setBtnToggling((prevState :any) => ({
    //       ...prevState,
    //       [btnName]: !prevState[btnName],
    //     }));
    // }
    
    const   handleKickMember = ()=>{

        
        // setBtnToggling((prevState :any) => ({
        //     ...prevState,
        //     ["kickBtnToggled"]: !prevState["kickBtnToggled"],
        //   }));
        socket.emit("kickMember", {
            channelId: channelId,
            userId: userId,
        })  
        
        setClicks(clicks + 1)
        setShow(false);
    }

    useEffect(()=>{
        socket.on("memberKickedSuccessfully", () => {
            console.log(" !! => user : ", userId , " has been kicked !");
            console.log(btnToggling);
        })
    },[socket])
    

    const handleSetAdmin = () =>{

        console.log("set admin btn has been clicked !")
    }




    return(
        <>
             <div className="w-[146px] h-[120px] bg-white absolute  top-[5%] left-[29%] rounded-xl ">
                    <div className="w-full h-full flex   ">

                        <div className="w-[41px] h-full  flex flex-col items-center justify-center mt-[5px] ">

                            <div className="w-full h-[20px] mb-[10px] border-r-[1px] border-channel-700 flex items-center justify-center cursor-pointer">
                                <Image src={"/mute_b.svg"} alt="delete_channel" width={20} height={20} className=" " />
                            </div>
                            <div className="w-full h-[20px] mb-[10px] border-r-[1px] border-channel-700 flex items-center justify-center cursor-pointer">
                                <Image src={"/forbidden_b.svg"} alt="ban" width={20} height={20} className=" " />
                            </div>
                            <div className="w-full h-[20px] mb-[10px] border-r-[1px] border-channel-700 flex items-center justify-center cursor-pointer" onClick={handleKickMember}>
                                <Image src={"/kick.svg"} alt="kick" width={20} height={20} className=" " />
                            </div>

                            <div className="w-full h-[20px] mb-[10px] border-r-[1px] border-channel-700 flex items-center justify-center cursor-pointer" onClick={handleSetAdmin}>
                                <Image src={"/setAdmin.svg"} alt="setAdmin" width={20} height={20} className=" " />
                            </div>

                        </div>
                        <div className="w-[105px] h-full flex flex-col items-center justify-center   mt-[5px] ">
                            <div className="w-full h-[20px] mb-[10px] flex items-center px-[4px]">
                                <div className="h-full w-[17px]  text-primary text-[7px] flex items-center  font-poppins font-medium ">
                                    Mute
                                </div>
                                <div className="w-[63px] h-[14px]  ml-[7px] flex items-center">
                                    <Image src={"/arrowLeft.svg"} alt="time" width={7} height={7} className=" mr-[3px] cursor-pointer" onClick={handleSubtractMuteButtonClick} />
                                    <div className="w-[45px] h-[14px] bg-channel-600 rounded-sm flex items-center justify-center ">
                                        <span className="text-primary text-[5px] font-poppins font-medium mr-[2px]">
                                            {formatDurationString(durationSecondsMute)}
                                        </span>
                                    </div>
                                    <Image src={"/arrowRight.svg"} alt="time" width={7} height={7} className=" ml-[3px] cursor-pointer"  onClick={handleAddMuteButtonClick} />

                                </div>
                            </div>

                            <div className="w-full h-[20px] mb-[10px] flex items-center px-[4px]">
                                <div className="h-full w-[17px]  text-primary text-[7px] flex items-center  font-poppins font-medium">
                                    Ban
                                </div>
                                <div className="w-[63px] h-[14px]  ml-[7px] flex items-center">
                                    <Image src={"/arrowLeft.svg"} alt="time" width={7} height={7} className=" mr-[3px] cursor-pointer" onClick={handleSubtractButtonClick} />
                                    <div className="w-[45px] h-[14px] bg-channel-600 rounded-sm flex items-center justify-center ">
                                        <span className="text-primary text-[5px] font-poppins font-medium mr-[2px]">
                                            {formatDurationString(durationSeconds)}
                                        </span>

                                    </div>
                                    <Image src={"/arrowRight.svg"} alt="time" width={7} height={7} className=" ml-[3px] cursor-pointer" onClick={handleAddButtonClick} />

                                </div>
                            </div>


                            <div className="w-full h-[20px] mb-[10px] flex items-center px-[4px]">
                                <div className="h-full w-[17px]  text-primary text-[7px] flex items-center  font-poppins font-medium">
                                    Kick
                                </div>
                            </div>


                            <div className="w-full h-[20px] mb-[10px] flex items-center px-[4px]">
                                <div className="h-full w-[17px]  text-primary text-[7px] flex items-center  font-poppins font-medium">
                                     Admin
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
        
        </>
    )
}
export default ActionsPopUpOwner;