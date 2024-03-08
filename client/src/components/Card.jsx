import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Card({ post, innerRef, ...props }) {

  return (
    <>
    <motion.div 
      initial={{opacity: 0}}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
    >
    <Link ref={innerRef} {...props} key={post._id} to={`/post/${post._id}`} className='rounded-lg overflow-hidden shadow-xl dark:shadow-gray-900'>
        <img className='w-full h-full object-cover' src={post.image} alt="" />
    </Link>
    </motion.div>
    </>
  )
}

export default Card