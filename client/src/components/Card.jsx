import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Avatar, Button, Modal } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { FaHeart } from 'react-icons/fa'
import { numberManipulate } from './Common'
import { Popover } from '@mui/material'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { MdDeleteOutline } from "react-icons/md";



function Card({ post, setOpenDeleteModal, openDeleteModal,innerRef, setPosts, posts, ...props }) {
  const [user, setUser] = useState({})
  const { currentUser } = useSelector(state => state.user)
  const [openPopover, setOpenPopover] = useState(null)
  const [howLikeToast, setShowLikeToast] = useState(false)
  const [isMouseOver, setIsMouseOver] = useState(false)

  const location = useLocation()



  const fetchUsers = async () => {
    if(post?.owner === undefined){
        return;
    }
    try{
      const res = await fetch(`https://imagix-delta.vercel.app/api/user/getUser?userId=${post?.owner}`)
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
          const res = await fetch(`https://imagix-delta.vercel.app/api/post/likePost/${postId}/${currentUser?._id}`, {
              method: 'PUT',
          })

          if(res.ok){
              const data = await res.json()

              if(!location.pathname.includes('profile')){
                setPosts(
                  posts?.map((post) => 
                    post._id === postId ? {
                        ...post,
                        likes: data.likes,
                        numberOfLikes: data.likes.length
                    }
                    :post
                )
                )
              }else{
                setPosts({
                  postCount: posts?.postCount,
                  posts: posts?.posts?.map((post) => 
                    post._id === postId ? {
                        ...post,
                        likes: data.likes,
                        numberOfLikes: data.likes.length
                    }
                    :post
                )
                })
              }
              console.log(posts)
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

const onMouseOver = () => {
  setIsMouseOver(true)
}

const onMouseOut = () => {
  setIsMouseOver(false)
}

const deletePost = async (postId) => {
  const res = await fetch(`http://localhost:3000/api/post/deletePost/${postId}/${currentUser?._id}`, {
      method: 'DELETE',
  })
  const data = await res.json()

  if(res.ok){
      setPosts({
        postCount: posts?.postCount,
        posts: posts?.posts?.filter(post => post?._id !== data?._id)
      })
      setOpenDeleteModal(false)
  }
}

  return (
    <>
    <motion.div 
      initial={{opacity: 0}}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      // className='min-w-[20rem]'
    >
      <div  
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        className='rounded-lg overflow-hidden shadow-xl 
        dark:shadow-gray-900 bg-slate-800'>
          <div  className="w-full relative h-[30rem] md:h-[18rem] rounded-md overflow-hidden">
            <Link key={post._id} 
            ref={innerRef} 
            {...props}
              to={`/post/${post._id}`} 
            >
              <img className='h-full w-full z-10 object-cover line-clamp-1' 
                src={post.image} alt={`${post?.desc}`} />
            </Link>
            {
              location.pathname.includes('profile') && isMouseOver && (
                <>
                <div className='absolute bottom-0 p-4 h-14 bg-gradient-to-t from-zinc-700 to-transparent flex justify-between w-full'>
                  <span className='text-sm line-clamp-1 text-white'>{post?.desc}</span>
                  <div className="flex items-center gap-1">
                     <span 
                         className={`cursor-pointer ${post?.likes.includes(currentUser?._id) ? 'text-red-900' : 'text-gray-100'}`} 
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
                <div onClick={() => setOpenDeleteModal(true)} className='bg-zinc-600 absolute top-4 right-4 
                  hover:bg-zinc-800 p-1 rounded-full cursor-pointer'>
                  <MdDeleteOutline />
                </div>
                <Modal show={openDeleteModal} onClose={() => setOpenDeleteModal(false)} popup>
                  <Modal.Body>
                    <div className='flex flex-col gap-2 items-center justify-center'>
                      <AiOutlineExclamationCircle className='text-4xl text-red-600' />
                      <div className='md:text-xl text-lg text-gray-500'>
                          <p>Are you sure you want to delete this post?</p>
                      </div>
                      <div className='flex gap-2'>
                          <Button color='dark' onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
                          <Button color='failure' onClick={() => deletePost(post?._id)}>Yes, I'm sure</Button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
                </>
              )
            }
          </div>
      </div>
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