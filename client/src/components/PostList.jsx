import React from 'react'
import Card from './Card'
import { Masonry } from '@mui/lab'

function PostList({ posts }) {
  
  return (
      <Masonry columns={{ xs: 2, md: 3, lg: 4 }}>
        {
          posts.map(post => (
              <Card key={post._id} post={post} />
          ))
        }
      </Masonry>
  )
}

export default PostList