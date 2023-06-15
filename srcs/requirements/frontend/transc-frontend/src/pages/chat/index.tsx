
import {FaPaperPlane} from 'react-icons/fa'
import {HiUserGroup} from 'react-icons/hi'

import MessageBox from './MessageBox'

export const Chat  = () => {
    return (
     <div className='h-[90vh] md:h-[100vh] w-full '>

        <div className='h-full w-full  bg-white ] '>
            <div className='flex  flex-col items-start rounded h-[90%]  overflow-auto'>
                
                <MessageBox 
                    messageContent= 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos, animi.'
                    date = '02/08/2023'
                    time = '10:45'
                    profilePicture= 'bben-aou.jpeg'
                />
                 <MessageBox 
                    messageContent= 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit aliquid ad, possimus aliquam sed ducimus.'
                    date = '02/08/2023'
                    time = '10:46'
                    profilePicture= 'profile.png'
                />
                 <MessageBox 
                    messageContent= 'ala ta kifach !'
                    date = '02/08/2023'
                    time = '10:47'
                    profilePicture= 'bben-aou.jpeg'
                />
                
                 <MessageBox 
                    messageContent= 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus eos aperiam distinctio illum a deleniti eum ipsa repellendus sed quidem nesciunt aliquam repudiandae, accusantium saepe magnam, voluptatem repellat beatae impedit? Deserunt ea repellat ratione autem, vitae delectus a doloribus recusandae, dolorum accusamus atque est? Quaerat illum neque dolores, nobis dolor ea? Voluptatem eaque similique magni itaque doloribus dignissimos eveniet. Cupiditate saepe, maiores beatae maxime voluptatum reiciendis quam error cumque fugit repudiandae. Neque accusantium numquam, saepe temporibus illo ex quaerat eos.'
                    date = '02/08/2023'
                    time = '10:45'
                    profilePicture= 'profile.png'
                />
               
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