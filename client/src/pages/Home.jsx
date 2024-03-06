import React, { useEffect} from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import Card from '../components/Card'
import { Spinner } from 'flowbite-react'
import { Masonry } from '@mui/lab'
import { useLocation } from 'react-router-dom'




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
  data, status, error, fetchNextPage, hasNextPage, isFetching
} = useInfiniteQuery({
  queryKey: ['posts'],
  queryFn: getPost,
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages) => {
    const nextPage = lastPage.length ? allPages.length + 1 : undefined;
    return nextPage;
  },
})


const content = data?.pages?.map(posts => 
  posts?.posts.map((post, i) => {
    if(posts?.posts.length == i + 1){
      return <Card post={post} key={post._id} innerRef={ref}  />
    }else{
      return <Card  key={post._id} post={post} />
    }
})
)




  useEffect(() => {
    if(inView && hasNextPage){
      fetchNextPage()
    }

  }, [inView, hasNextPage, fetchNextPage])


if(status === 'pending'){
  return <div className="w-full h-screen flex justify-center mt-4">
    <Spinner size="xl" /> 
  </div>
}

if(status === 'error'){
  return <p>Error: {error}</p>
}




  return (
    <div className='mt-6 w-[90%] mx-auto scroll-smooth grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {content}
    </div>
  )
}

export default Home