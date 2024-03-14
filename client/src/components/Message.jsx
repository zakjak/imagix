import { Avatar, Button } from 'flowbite-react'
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa'
import { IoIosClose } from "react-icons/io";
import { io } from 'socket.io-client'

const Message = ({ user, setOpenMessage, openMessage }) => {
    const [message, setMessage] = useState('')
    const socket = io('http://localhost:3000/api/message')

    useEffect(() => {
        socket?.emit('newUser', user?.id)
    }, [socket, user?.id, openMessage])
    

  return (
    <div
        className='w-[26rem] h-[30rem] z-10 rounded-lg fixed bottom-4 right-10 bg-gray-200 dark:bg-slate-800 shadow-lg' 
    >
        <div className="relative"></div>
        <div className="w-full border-b border-gray-400 h-[10%] flex items-center px-2 justify-between">
            <div className="flex items-center gap-1">
                <Avatar img={user?.picture} rounded size='sm'  />
                <span className='text-gray-600 dark:text-gray-200 text-sm font-semibold'>{user?.username}</span>
            </div>
            <div onClick={() => setOpenMessage(false)} className='bg-gray-700 text-white hover:bg-gray-900 cursor-pointer p-1 rounded-full text-2xl'>
                <IoIosClose />
            </div>
        </div>
        <div className="w-full h-[70%] p-2 overflow-y-scroll flex flex-col gap-3">
            <div className="w-[90%]">
                <div className="flex gap-2 items-start">
                        <Avatar className='max- max-w-[2rem] min-w-[2rem]' img={user?.picture} rounded size='sm' />
                    <div className="bg-slate-900 dark:bg-gray-200 p-2 rounded-lg">
                        <p className='text-gray-100 dark:text-slate-900 tracking-tighter 
                            text-justify text-sm'>Lorem ipsum dolor sit, 
                            amet consectetur adipisicing elit. Aspernatur 
                            laudantium assumenda autem blanditiis illum doloribus 
                            quaerat at ex aliquam provident!
                        </p>
                        <p className='text-gray-400 text-right text-sm'>6:00</p>
                    </div>
                </div>
            </div>
        </div>
        <div className=" w-full flex flex-col gap-1 border-t border-slate-400 h-[20%]">
            <textarea 
                placeholder='Write your message?' 
                onChange={e => setMessage(e.target.value)}
                className='w-full border-0 bg-transparent border-b border-slate-400 resize-none outline-none text-gray-800 dark:text-slate-200 min-h-[3rem] max-h-[3rem]'></textarea>
            {
                message && (
                    <div className='flex justify-between items-center px-2'>
                        <span className='text-sm text-gray-500 
                        dark:text-gray-300'>
                            {`${message.length === 1 ? 
                                `${message.length} character` : 
                                `${message.length} characters`}`}
                        </span>
                        <Button className='mx-2' color='dark'>
                            <FaPlay />
                        </Button>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Message