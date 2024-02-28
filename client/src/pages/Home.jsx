import React, { useEffect, useState } from 'react'
import PostList from '../components/PostList'
import InfiniteScroll from "react-infinite-scroll";

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPost()
}, [])

const getPost = async () => {
    const res = await fetch(`/api/post/getPost`)
    const data = await res.json()

    if(res.ok){
        setPosts([...data, ...data])
    }
}


  return (
    <div className='w-[80%] mx-auto mt-5'>
      <PostList posts={posts} />
    </div>
  )
}

export default Home