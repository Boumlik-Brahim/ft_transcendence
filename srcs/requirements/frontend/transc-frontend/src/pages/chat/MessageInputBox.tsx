

import { FaPaperPlane } from 'react-icons/fa'
import { HiUserGroup } from 'react-icons/hi'
import { useDispatch } from 'react-redux';
import { on } from '../../store/reducer';



export default function MessageInputBox() {
    const showFiendList = () => {
        dispatch(on());
    };
    const dispatch = useDispatch();
    return (
        <>
            <div className='
                                    pr-[8px]  h-full w-[80%] flex items-center pl-[23px] 
                                    md:pl-[30px] md:w-[90%] 
            '>
            <input
                    placeholder="Type your message"
                    className={`
                            h-[40px] lg:h-[38px] w-full rounded-full text-primary-900 font-poppins font-semibold text-[11px] pl-3.5  
                            focus:outline-none  focus:border-primary-900 focus:ring-2 focus:ring-primary-900
                            placeholder:font-semibold placeholder:text-light-900 placeholder:text-[11px] 
                            md:h-[45px] md:text-[14px]  md:placeholder:text-[13px]
            `} />
            </div>
            <div className='
                                    h-full flex items-center justify-start w-[20%] pl-[5px]
                                    md:pl-[10px] md:w-[10%] 
            '>
                <FaPaperPlane className='
                                            text-primary-900 text-[17px]    cursor-pointer 
                                            md:text-[23px]
                '    
                />
                <HiUserGroup className='
                                            text-primary-900 text-[20px] ml-2.5 cursor-pointer 
                                            md:hidden
                '
                onClick={showFiendList}
                />
            </div>

        </>
    )
}
// }) {
//     const showFiendList = () => {
//         dispatch(on());
//     };
//     const dispatch = useDispatch();
//     return (
//         <>
//             <div className={`grow h-[10%] flex items-center justify-center  ${bgColor} `}>
//                 <div className={`w-full text-base text-primary-900 flex items-center justify-center`}>
//                     <input
//                         placeholder="Type your message"
//                         className={`h-9  w-[269px] rounded-full font-poppins font-semibold text-[11px] pl-3.5  
//                             md:pl-5 md:text-sm md:w-[470px]  md:h-[4vh]
//                             2xl:w-[60%] 
//                             focus:outline-none 
//                             placeholder:font-semibold placeholder:text-primary-900 placeholder:text-[11px] `}
//                     />
//                     <FaPaperPlane className='text-primary-900 w-[18px] h-[18px] ml-2  cursor-pointer md:ml-4 2xl:ml-4 ' />
//                     <HiUserGroup className='text-primary-900 text-base w-[18px] h-[18px] ml-2 cursor-pointer md:hidden  ' onClick={showFiendList} />
//                 </div>
//             </div>

//         </>
//     );