'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Avatar } from '@radix-ui/themes'
import React from 'react'

function page() {
    const { user } = useUser()
  return (
    <div className='w-ful'>
        <div className=' h-[50vh] flex items-center gap-2 flex-col'>
            <div className=' w-[6rem] mt-4 h-[6rem] rounded-full overflow-hidden'>
                <Avatar 
                    src={user?.picture} 
                    fallback={`${user?.name.slice(0, 1)}`} 
                />
            </div>
            <span className='font-bold text-lg md:text-xl '>
                {user?.name}
            </span>
            <span className='text-sm text-gray-400'>
                {user?.email}
            </span>
        </div>
    </div>
  )
}

export default page