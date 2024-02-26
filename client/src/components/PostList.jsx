import React from 'react'
import Card from './Card'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

function PostList({ posts }) {
  
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{300: 1, 450: 2, 750: 3, 900: 4}} className=''>
        <Masonry gutter={10}>
          {
              posts.map(post => (
                  <Card key={post._id} post={post} />
              ))
          }
        </Masonry>
    </ResponsiveMasonry>
  )
}

export default PostList