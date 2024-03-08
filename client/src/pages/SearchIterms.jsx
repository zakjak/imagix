import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Card from '../components/Card'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { Masonry } from '@mui/lab'

function SearchIterms() {
    const location = useLocation()
    const urlParams = new URLSearchParams(location.search)
    const searchTermUrl = urlParams.get('searchTerm')

    const { ref, inView } = useInView

    const fetchPosts = async () => {
        if(searchTermUrl){
            const searchQuery = urlParams.toString()
            console.log(searchQuery)
            const res = await fetch(`/api/post/getPost?${searchQuery}`)
            return await res.json()
        }
    }

   console.log(location.searchTermUrl)

const {
    data, hasNextPage, fetchNextPage
} = useInfiniteQuery({
    queryKey: ['search'],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
        const nextPage = allPage.length ? lastPage.length + 1 : undefined
        return nextPage
    }
})

const content = data?.pages.map(posts => 
    posts.posts.map((post, i) => {
        if(posts.posts.length === i + 1){
            return <Card post={post} key={post._id} innerRef={ref} />
        }else{
            return <Card post={post} key={post._id}  />
        }
    })
)

useEffect(() => {
    if(inView && hasNextPage){
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])
 
  return (
    <div className='grid grid-cols-4 gap-4 w-[80%] mx-auto mt-6'>
        {content}
    </div>
  )
}

export default SearchIterms