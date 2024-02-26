import React from 'react'

function Card({ post }) {
  return (
    <div className='rounded-md overflow-hidden'>
        <img src={post.image} alt="" />
    </div>
  )
}

export default Card