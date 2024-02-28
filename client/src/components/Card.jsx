import React from 'react'
import { Link } from 'react-router-dom'

function Card({ post }) {
  const heights = [150, 30, 90, 70, 90, 100, 150, 30, 50, 80];
  return (

    <Link to={`/post/${post._id}`} className='rounded-md shadow-2xl overflow-hidden cursor-pointer'>
        <img src={post.image} alt="" />
    </Link>
        
  )
}

export default Card