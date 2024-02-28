import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PostList from './PostList'

function SearchIterms() {
    const location = useLocation()
    const [searchTerm, setSearchTerm] = useState('')
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTermUrl = urlParams.get('searchTerm')

        if(searchTermUrl){
            setSearchTerm(searchTermUrl)
        }
    

    const fetchPosts = async () => {
        const searchQuery = urlParams.toString()
        const res = await fetch(`/api/post/getPost?${searchQuery}`)

        if(res.ok){
            const data = await res.json()
            setPosts(data)
        }
        
    }
    fetchPosts()
}, [location.search])

  return (
    <div className='w-[80%] mx-auto mt-5'>
        <PostList posts={posts} />
    </div>
  )
}

export default SearchIterms