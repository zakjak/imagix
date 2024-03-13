import { Avatar, Button } from 'flowbite-react'
import { useState } from 'react';
import { FaPlay } from 'react-icons/fa'
import { IoIosClose } from "react-icons/io";

const Message = ({ user, setOpenMessage }) => {
    const [message, setMessage] = useState('')

  return (
    <div
        className='w-[26rem] h-[30rem] z-10 rounded-lg fixed bottom-0 right-10 bg-white' 
    >
        <div className="w-full border-b h-[10%] flex items-center px-2 justify-between">
            <div className="flex items-center gap-1">
                <Avatar img={user?.picture} rounded size='sm'  />
                <span className='text-gray-600 text-sm font-semibold'>{user?.username}</span>
            </div>
            <div onClick={() => setOpenMessage(false)} className='bg-gray-700  hover:bg-gray-900 cursor-pointer p-1 rounded-full text-2xl'>
                <IoIosClose />
            </div>
        </div>
        <div className="w-full h-[70%] p-2 overflow-y-scroll">
            <div className="w-[90%]">
                <div className="flex gap-2 items-start">
                        <Avatar className='max- max-w-[2rem] min-w-[2rem]' img={user?.picture} rounded size='sm' />
                    <div className="">
                        <p className='text-black text-justify text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur laudantium assumenda autem blanditiis illum doloribus quaerat at ex aliquam provident!</p>
                    </div>
                </div>
                <p className='text-gray-400 text-right text-sm'>6:00</p>
            </div>
            
            
            
        </div>
        <div className=" w-full flex flex-col items-end gap-1 border-t h-[20%]">
            <textarea 
                placeholder='Write your message?' 
                onChange={e => setMessage(e.target.value)}
                className='w-full border-0 resize-none outline-none text-gray-800 min-h-[3rem] max-h-[3rem]'></textarea>
            {
                message && (
                    <Button className='mx-2' color='dark'>
                        <FaPlay />
                    </Button>
                )
            }
        </div>
    </div>
  )
}

export default Message