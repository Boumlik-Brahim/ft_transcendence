
import { CgClose } from 'react-icons/cg'

import { useDispatch, useSelector} from 'react-redux';
import {  hidePopUp } from '../../store/reducer';
import { RootState } from '../../store/store';


export default function PopUpWindow() {
    const dispatch = useDispatch();
    const currentPopUpStatus = useSelector((state: RootState) => state.togglePopUp);
    const handlePopUpCreateChannel = () => {
        dispatch(hidePopUp());
        console.log(currentPopUpStatus);
    };
    return (
        // <div
        //     className={`${currentPopUpStatus.showPopUpCreateChannel ? "z-10 absolute  w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center  animate-show-up duration-1000" : "hidden"}`}>
        //     <div className="relative  text-primary-900  w-[56vw] h-[45%] pl-[38px] bg-transparent ">
        //         <div className="w-full  h-[10%] flex items-center justify-end">
        //             <CgClose className="w-[35px] h-[35px] text-white cursor-pointer" onClick={handlePopUpCreateChannel}/>
        //         </div>
        //         <div className="w-[95%] h-[90%] bg-white rounded-lg flex items-center justify-center ">
        //             <div className="h-[65%] w-[35%]  flex flex-col items-center">
        //                 <div className="w-full h-[20%] mb-[10px] flex items-center justify-center font-poppins text-base font-bold leading-6 tracking-normal uppercase">
        //                     Private
        //                 </div>
        //                 <div className="w-full h-[50%] flex flex-col justify-center">
        //                     <input placeholder="name" type="text" className=" text-primary-900 w-full h-[40px] font-poppins text-sm pl-[22px] mb-[15px] rounded-[5px] border-[1px] border-primary-900
        //                         focus:outline-none
        //                         placeholder:font-poppins placeholder:font-bold  placeholder:text-light-900 placeholder:text-xs placeholder:-translate-y-[1px]"
        //                     />
        //                     <input placeholder="password" type="password" className=" text-primary-900  w-full h-[40px] pl-[22px] rounded-[5px] border-[1px] border-primary-900
        //                         focus:outline-none
        //                         placeholder:font-poppins placeholder:font-bold  placeholder:text-light-900 placeholder:text-xs placeholder:-translate-y-[1px]"
        //                     />
        //                 </div>
        //                 <div className=" w-full h-[30%] pt-[10px] flex items-center justify-start ">
        //                     <button className="w-[87px] h-[37px] font-poppins text-xs font-bold leading-4 tracking-normal text-white rounded-full bg-primary-900">
        //                         create
        //                     </button>
        //                 </div>
        //             </div>
        //             <div className="w-[5%] h-[100%] flex justify-center items-center ">
        //                 <div className="h-[80%]  border-l-[1px] border-primary-900 "></div>
        //             </div>
        //             <div className="h-[50%] w-[35%] flex flex-col items-center">
        //                 <div className="w-full h-[20%]  flex items-center justify-center font-poppins text-base font-bold leading-6 tracking-normal uppercase">
        //                     public
        //                 </div>
        //                 <div className="w-full h-[50%] flex items-center">
        //                     <input placeholder="name" type="text" className=" text-primary-900 w-full h-[40px] font-poppins text-sm pl-[22px] rounded-[5px] border-[1px] border-primary-900
        //                         focus:outline-none
        //                         placeholder:font-poppins placeholder:font-bold  placeholder:text-light-900 placeholder:text-xs placeholder:-translate-y-[1px]"
        //                     />
        //                 </div>
        //                 <div className="w-full h-[30%] flex items-center">
        //                     <button className="w-[87px] h-[37px] font-poppins text-xs font-bold leading-4 tracking-normal text-white rounded-full bg-primary-900">
        //                         create
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>

        //     </div>

        // </div>


        <div className={`fixed inset-0 bg-gray-900 bg-opacity-20  ${currentPopUpStatus.showPopUpCreateChannel ? 'flex justify-center items-center ' : 'hidden'}`}>
            <div className="relative text-primary-900 w-[51vw] h-[45%] pl-[38px] bg-transparent transform transition-transform duration-1000 ease-in-out animate-show-up " >
                <div className="w-full h-[10%] flex items-center justify-end">
                    <CgClose className="  w-[35px] h-[35px] text-white cursor-pointer" onClick={handlePopUpCreateChannel} />
                </div>
                <div className="w-[95%] h-[90%] bg-white rounded-lg flex items-center justify-center">
                    <div className="h-[65%] w-[35%] flex flex-col items-center">
                        <div className="w-full h-[20%] mb-[10px] flex items-center justify-center font-poppins text-base font-bold leading-6 tracking-normal uppercase">
                            Private
                        </div>
                        <div className="w-full h-[50%] flex flex-col justify-center">
                            <input
                                placeholder="name"
                                type="text"
                                className="text-primary-900 w-full h-[40px] font-poppins text-sm pl-[22px] mb-[15px] rounded-[5px] border-[1px] border-primary-900 focus:outline-none placeholder:font-poppins placeholder:font-bold placeholder:text-light-900 placeholder:text-xs placeholder:-translate-y-[1px]"
                            />
                            <input
                                placeholder="password"
                                type="password"
                                className="text-primary-900 w-full h-[40px] pl-[22px] rounded-[5px] border-[1px] border-primary-900  focus:outline-none placeholder:font-poppins placeholder:font-bold placeholder:text-light-900 placeholder:text-xs placeholder:-translate-y-[1px]"
                            />
                        </div>
                        <div className="w-full h-[30%] pt-[10px] flex items-center justify-start">
                            <button className="w-[87px] h-[37px] font-poppins text-xs font-bold leading-4 tracking-normal text-white rounded-full bg-primary-900">create</button>
                        </div>
                    </div>
                    <div className="w-[5%] h-[100%] flex justify-center items-center">
                        <div className="h-[80%] border-l-[1px] border-primary-900"></div>
                    </div>
                    <div className="h-[50%] w-[35%] flex flex-col items-center">
                        <div className="w-full h-[20%] flex items-center justify-center font-poppins text-base font-bold leading-6 tracking-normal uppercase">
                            public
                        </div>
                        <div className="w-full h-[50%] flex items-center">
                            <input
                                placeholder="name"
                                type="text"
                                className="text-primary-900 w-full h-[40px] font-poppins text-sm pl-[22px] rounded-[5px] border-[1px] border-primary-900 focus:outline-none placeholder:font-poppins placeholder:font-bold placeholder:text-light-900 placeholder:text-xs placeholder:-translate-y-[1px]"
                            />
                        </div>
                        <div className="w-full h-[30%] flex items-center">
                            <button className="w-[87px] h-[37px] font-poppins text-xs font-bold leading-4 tracking-normal text-white rounded-full bg-primary-900">create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
