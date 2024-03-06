import React from 'react'
import { Link } from 'react-router-dom'

function Card({ post, innerRef, ...props }) {

  return (
    <Link ref={innerRef} {...props} key={post._id} to={`/post/${post._id}`} className='rounded-lg overflow-hidden'>
        <img className='w-full h-full object-cover' src={post.image} alt="" />
    </Link>
  )
}

export default Card