import React from 'react'
import { Link } from 'react-router-dom'

function Card({ post }) {
  return (
    <Link to={`/post/${post._id}`} className='rounded-md overflow-hidden cursor-pointer'>
        <img src={post.image} alt="" />
    </Link>
  )
}

export default Card