
import {FaPaperPlane} from 'react-icons/fa'
import {HiUserGroup} from 'react-icons/hi'

import MessageBox from './MessageBox'

export const Chat  = () => {
    return (
     <div className='h-[90vh] w-full '>

        <div className='h-full w-full  bg-white ] '>
            <div className='flex  flex-col  pl-[23px] items-start rounded h-[90%]  overflow-auto'>
                {/* <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p>
                <p className='p-[5px]'>message</p> */}
                <MessageBox />
                




            </div>
            <div className='grow h-[10%]  flex items-center justify-center bg-primary-100 '>
                <div className='w-full text-base text-primary-900 flex items-center justify-center'>
                    <input placeholder="Type your message" className='h-9 w-[269px] rounded-full font-poppins text-[13px] focus:outline-none placeholder:text-primary-900 placeholder:text-[13px] pl-3.5'/>
                    <FaPaperPlane className='text-primary-900 w-[18px] h-[18px] ml-2 cursor-pointer'/>
                    <HiUserGroup className='text-primary-900 text-base w-[18px] h-[18px] ml-2 cursor-pointer'/>
                </div>
            </div>
        </div>
     </div>
        
    )
}