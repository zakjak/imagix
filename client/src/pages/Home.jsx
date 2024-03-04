import React, { useEffect} from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import Card from '../components/Card'


function Home() {
  const { inView, ref } = useInView({
    triggerOnce: true
  })

const getPost = async ({ pageParam }) => {
    if(pageParam){
      const res = await fetch(`/api/post/getPost?limits=${pageParam * 9}`)
      return await res.json()
    }
}

const { 
  data, status, error, fetchNextPage, hasNextPage
} = useInfiniteQuery({
  queryKey: ['posts'],
  queryFn: getPost,
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages) => {
    const nextPage = lastPage?.posts.length ? allPages[0]?.posts.length + 1 : undefined
    return nextPage
  }
})

const content = data?.pages?.map(posts => 
  posts?.posts.map((post, i) => {
    if(posts?.posts.length === i + 1){
      return <Card  post={post} key={post._id} innerRef={ref}  />
    }else{
      return <Card key={post._id} post={post} />
    }
})
)

useEffect(() => {
  if(inView && hasNextPage){
    fetchNextPage()
  }
}, [inView, hasNextPage, fetchNextPage])

if(status === 'pending'){
  return <p>Loading...</p>
}

if(status === 'error'){
  return <p>Error: {error}</p>
}




  return (
    <div className='w-[80%] rounded-md shadow-2xl overflow-hidden cursor-pointer mx-auto mt-5 grid grid-cols-2 gap-2 md:grid-cols-3'>
      {content}
    </div>
  )
}

export default Home