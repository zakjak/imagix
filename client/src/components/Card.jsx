import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Avatar } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { FaHeart } from 'react-icons/fa'
import { numberManipulate } from './Common'

function Card({ post, innerRef, setPosts, posts,...props }) {
  const [user, setUser] = useState({})
  const { currentUser } = useSelector(state => state.user)


  const fetchUsers = async () => {
    if(post?.owner === undefined){
        return;
    }
    try{
      const res = await fetch(`/api/user/getUser?userId=${post?.owner}`)
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
          const res = await fetch(`/api/post/likePost/${postId}/${currentUser?._id}`, {
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

  return (
    <>
    <motion.div 
      initial={{opacity: 0}}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
    >
      <Link 
        ref={innerRef} 
        {...props} 
        key={post._id} 
        to={`/post/${post._id}`} 
        className='rounded-lg overflow-hidden shadow-xl 
        dark:shadow-gray-900'>
          <div className="w-full h-[15rem] rounded-md overflow-hidden">
            <img className='w-full h-[130%] object-cover' 
            src={post.image} alt={`${post?.desc}`} />
          </div>
      </Link>
      <div className="flex justify-between px-1 mt-2">
        <Link to={`/profile/${user?._id}`} className="flex gap-1 items-center">
            <Avatar img={user?.picture} alt={`Profile of ${user?.username}`} size='sm' rounded/>
            <span className='text-xs dark:text-slate-300'>{user?.username}</span>
        </Link>
        <div className="">
                <div className="flex items-center gap-1">
                    <span 
                        className={`cursor-pointer ${post.likes.includes(currentUser._id) ? 'text-red-900' : 'text-gray-500'}`} 
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
    </motion.div>
    </>
  )
}

export default Card