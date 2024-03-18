import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Avatar } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { FaHeart } from 'react-icons/fa'
import { numberManipulate } from './Common'
import { Popover } from '@mui/material'

function Card({ post, innerRef, setPosts, posts,...props }) {
  const [user, setUser] = useState({})
  const { currentUser } = useSelector(state => state.user)
  const [openPopover, setOpenPopover] = useState(null)
  const [howLikeToast, setShowLikeToast] = useState(false)

  const location = useLocation()



  const fetchUsers = async () => {
    if(post?.owner === undefined){
        return;
    }
    try{
      const res = await fetch(`https://imagix-xwa1.onrender.com/api/user/getUser?userId=${post?.owner}`)
      const data = await res.json()

      if(res.ok){
        
        setUser(data)
      }
      
    }catch(err){
      console.log(err)
    }     
}

useEffect(() => {
  fetchUsers()
}, [])


const handlePostLikes = async (postId) => {
  try{
      if(currentUser){
          const res = await fetch(`https://imagix-xwa1.onrender.com/api/post/likePost/${postId}/${currentUser?._id}`, {
              method: 'PUT',
          })

          if(res.ok){
              const data = await res.json()
              setPosts(posts.map((post) => 
                  post._id === postId ? {
                      ...post,
                      likes: data.likes,
                      numberOfLikes: data.likes.length
                  }
                  :post
              ))
          }
      }else{
          setShowLikeToast(true)
          return;
      }

  }catch(err){
      console.log(err)
  }
}

const handlePopoverOpen = (e) => {
  setOpenPopover(e.currentTarget)
}

const handlePopoverClose = (e) => {
  setOpenPopover(null)
}

const open = Boolean(openPopover)

  return (
    <>
    <motion.div 
      initial={{opacity: 0}}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      // className='min-w-[20rem]'
    >
      <Link 
        ref={innerRef} 
        {...props} 
        key={post._id} 
        to={`/post/${post._id}`} 
        className='rounded-lg overflow-hidden shadow-xl 
        dark:shadow-gray-900'>
          <div className="w-full h-[15rem] md:h-[18rem] rounded-md overflow-hidden">
            <img className='w-full h-full object-cover' 
              src={post.image} alt={`${post?.desc}`} />
          </div>
      </Link>
      {
        !location.pathname.includes('profile') && (
      <div className="flex justify-between px-1 mt-2">
          <Link 
            onMouseEnter={handlePopoverOpen} 
            onMouseLeave={handlePopoverClose} 
            aria-haspopup='true'
            aria-owns={open ? 'mouse-over-popover': undefined} 
            to={`/profile/${user?._id}`} 
            className="flex gap-1 items-center"
          >
              <Avatar img={user?.picture} alt={`Profile of ${user?.username}`} size='sm' rounded/>
              <span className='text-xs dark:text-slate-300'>{user?.username}</span>
          </Link>
        <div className="flex items-center justify-center">
                <div className="flex items-center gap-1">
                    <span 
                        className={`cursor-pointer ${post?.likes.includes(currentUser?._id) ? 'text-red-900' : 'text-gray-500'}`} 
                        onClick={() => handlePostLikes(post?._id)}><FaHeart /></span>
                    <span>
                    <span 
                            className='text-sm'
                        >
                            {`${post?.numberOfLikes > 0 ? 
                                numberManipulate(post?.numberOfLikes) === 1 ? 
                                `${numberManipulate(post?.numberOfLikes)} ` : 
                                `${numberManipulate(post?.numberOfLikes)}` : ''}`}
                        </span>
                    </span>
                </div>
            </div>
      </div>
        )
      }
    </motion.div>
    </>
  )
}

export default Card