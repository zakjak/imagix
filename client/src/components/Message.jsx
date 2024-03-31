import { Avatar, Button } from 'flowbite-react'
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa'
import { IoIosClose } from "react-icons/io";
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client'
import moment from 'moment'

const Message = ({ arrivalMessages, user, setOpenMessage, onlineUser }) => {
    const [newMessage, setNewMessage] = useState('')
    const { currentUser } = useSelector(state => state.user)
    const [messages, setMessages] = useState([])
    const [senders, setSenders] = useState([])
    
    const socket = io('http://localhost:3001')

    
    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const res = await fetch(`http://localhost:3000/api/message/sendMessage/${currentUser?._id}/${onlineUser[0].userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: newMessage,
                })
            })
            const data = await res.json()
            
            if(res.ok){
                socket.emit('sendMessage', {
                    senderId: data?.senderId,
                    text: data?.message,
                    receiverId: data?.receiverId,
                    createdAt: data?.createdAt
                })
                setNewMessage('')
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        const getMessages = async () => {
            
            const res = await fetch(`http://localhost:3000/api/message/getMessages/${currentUser?._id}/${user?._id}`)

            const data = await res.json()
            setMessages(data)
            }
        getMessages()
    }, [])

    const getUser = async () => {
        const usersId = []
        messages.forEach(message => {
            usersId.push(message.senderId)
        })

        const res = await fetch(`http://localhost:3000/api/user/getFollowers?followersId=${usersId}`)
        const data = await res.json()
        if(res.ok){
            setSenders(data)
        }
    }
    
    useEffect(() => {
            getUser()
    }, [messages])
   
    
      useEffect(() => {
        arrivalMessages && setMessages((prev) => [...prev, arrivalMessages])
      }, [arrivalMessages])

      useEffect(() => {
        socket.emit('typing', { receiverId: onlineUser[0]?.userId })
      }, [])

    //   useEffect(() => {
    //     socket.on('getTyping', (data) => {
    //         console.log(data)
    //     })
    //   }, [newMessage])
  return (
    <div
        className='w-[26rem] h-[30rem] z-10 rounded-lg fixed bottom-4 right-10 bg-gray-200 dark:bg-slate-800 shadow-lg' 
    >
        <div className="relative flex"></div>
        <div className="w-full border-b border-gray-400 h-[10%] flex items-center px-2 justify-between">
            <div className="flex items-center gap-2">
                <Avatar img={user?.picture} rounded size='sm'  />
                <span className='text-gray-600 dark:text-gray-200 text-sm font-semibold'>
                    {user?.username}
                </span>
                {
                    onlineUser.length > 0 ? (
                        <div className='flex items-center justify-center gap-1'>
                            <div className='h-2 w-2 rounded-full bg-green-600'></div>
                            <span className='text-gray-300 text-sm'>online</span>
                        </div>
                    ) : (
                        <div className='flex items-center justify-center gap-1'>
                            <div className='h-2 w-2 rounded-full bg-gray-600'></div>
                            <span className='text-gray-300 text-sm'>offline</span>
                        </div>
                    )
                }
            </div>
            <div onClick={() => setOpenMessage(false)} className='bg-gray-700 text-white hover:bg-gray-900 cursor-pointer p-1 rounded-full text-2xl'>
                <IoIosClose />
            </div>
        </div>
        <div className="w-full h-[70%] p-2 overflow-y-scroll flex flex-col gap-3">
            <div className="w-[90%] flex flex-col gap-2">
                {
                    messages?.map((message, i) => {
                        const userfilter = senders?.filter(sender => sender._id === message.senderId)
                        return(
                        <div key={i} className="flex gap-4 items-end chat chat-start">
                                <Avatar className='max- max-w-[2rem] min-w-[2rem]' img={userfilter[0]?.picture} rounded size='sm' />
                            <div className="bg-slate-900 chat-bubble dark:bg-gray-200 p-2 rounded-lg">
                                <p className='text-gray-100 dark:text-slate-900 tracking-tighter 
                                    text-justify text-sm'>{message.message}
                                </p>
                                <p className='text-gray-400 text-right text-sm'>{moment(message.createdAt).format('LT')}</p>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
        <form onSubmit={handleSubmit} className=" w-full flex flex-col gap-1 border-t border-slate-400 h-[20%]">
            <textarea 
                value={newMessage}
                placeholder='Write your message?' 
                onChange={e => setNewMessage(e.target.value)}
                className='w-full border-0 bg-transparent border-b border-slate-400 resize-none outline-none text-gray-800 dark:text-slate-200 min-h-[3rem] max-h-[3rem]'></textarea>
            {
                newMessage && (
                    <div className='flex justify-between items-center px-2'>
                        <span className='text-sm text-gray-500 
                        dark:text-gray-300'>
                            {`${newMessage.length === 1 ? 
                                `${newMessage.length} character` : 
                                `${newMessage.length} characters`}`}
                        </span>
                        <Button type='submit' className='mx-2' color='dark'>
                            <FaPlay />
                        </Button>
                    </div>
                )
            }
        </form>
    </div>
  )
}

export default Message