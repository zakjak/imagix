import React, { useEffect, useState} from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import Card from '../components/Card'
import { Spinner } from 'flowbite-react'
import { Masonry } from '@mui/lab'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

function Home() {
  const [posts, setPosts] = useState([])

const getPosts = async () => {
  const { data } = await axios.get('http://localhost:3000/api/post/getPost')

  if(data){
    setPosts(data?.posts)
  }
}

useEffect(() => {
  getPosts()
}, [])

  return (
    <div className="mb-10">
      <div className='w-[92%] mx-auto mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4'>
      {
        posts && (
          posts.map(post => (
            <Card key={post._id} posts={posts} post={post} setPosts={setPosts} />
          ))
      
          )
        }
        </div>
    </div>
  )
}

export default Home