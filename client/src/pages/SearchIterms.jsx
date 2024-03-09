import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Card from '../components/Card'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { Masonry } from '@mui/lab'
import UserCard from '../components/UserCard'
import { useSelector } from 'react-redux'
import CardSearch from '../components/CardSearch'

function SearchIterms() {
    const { currentUser } = useSelector(state => state.user)
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const location = useLocation()
    const urlParams = new URLSearchParams(location.search)
    const searchTermUrl = urlParams.get('searchTerm')


    const fetchUsers = async () => {
        if(searchTermUrl){
            const searchQuery = urlParams.toString()
            const users = await fetch(`/api/user/getUser?${searchQuery}`)
            
            const data = await users.json()

            setUsers(data)
        }
    }

    const fetchPosts = async () => {
        if(searchTermUrl){
            const searchQuery = urlParams.toString()
            const posts = await fetch(`/api/post/getPost/?${searchQuery}`)
            
            const data = await posts.json()
            console.log(data)

            setPosts(data?.posts)
        }
    }


   useEffect(() => {
    fetchPosts()
    fetchUsers()
   }, [searchTermUrl])

  return (
    <div className='w-full p-5'>
        <h1 className='text-center mt-6 text-md dark:text-slate-200 text-gray-500'>Search results: <span className='text-xl dark:text-white'>{searchTermUrl}</span></h1>
        {
            posts?.length > 0 && (
                <div className='grid grid-cols-4 gap-4 w-[80%] mx-auto mt-6'>
                    {posts?.map(post => (
                        <CardSearch 
                            key={post._id} 
                            post={post} 
                            posts={posts} 
                            setPosts={setPosts} 
                        />
                    ))}
                </div>
            )
        }
        {
            users.length > 0 && (
                <div className="w-[80%] mx-auto mt-8 p-4 bg-slate-100 dark:bg-gray-800  rounded-2xl shadow-lg  dark:shadow-md">
                    <h1 className='text-2xl'>People</h1>
                    {users?.map(user => (
                        <UserCard key={user?._id} user={user} setUser={setUsers} users={users} />
                    ))}
                </div>
            )
        }
    </div>
  )
}

export default SearchIterms