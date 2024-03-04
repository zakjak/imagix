import React from 'react'
import { Link } from 'react-router-dom'

function Card({ post, innerRef, ...props }) {
  const heights = ['20rem', '27rem', '50rem', '40rem', '60rem'] 
  const randomHeight = (Math.round(Math.random()) * (heights.length -1))

  return (
    <Link ref={innerRef} {...props} key={post._id} to={`/post/${post._id}`} className={`w-full h-[${heights[randomHeight]}] cursor-pointer rounded-md shadow-2xl overflow-hidden`}>
        <img className='w-full h-full object-cover' src={post.image} alt="" />
    </Link>
  )
}

export default Card