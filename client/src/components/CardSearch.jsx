import { Avatar } from 'flowbite-react'
import React from 'react'

const CardSearch = ({ post }) => {
  return (
    <div>
        <div className="rounded-md overflow-hidden">
            <img className='w-full' src={post.image} alt="" />
        </div>
        <div className="w-full flex pt-2 justify-between">
            <div className="flex gap-1 items-center">
                <Avatar size='sm' rounded/>
                <span>{'sads'}</span>
            </div>
            <div className="">
                {post.likes}
            </div>
        </div>
    </div>
  )
}

export default CardSearch