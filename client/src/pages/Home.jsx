import React, { useEffect, useState} from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import Card from '../components/Card'
import { Spinner } from 'flowbite-react'
import { Masonry } from '@mui/lab'
import { useLocation } from 'react-router-dom'




function Home() {
  const [posts, setPosts] = useState([])
  // const { inView, ref } = useInView({
  //   triggerOnce: true
  // })

const getPosts = async () => {
      const res = await fetch(`/api/post/getPost`)
      const data = await res.json()
      
      if(res.ok){
        setPosts(data?.posts)
      }
}

useEffect(() => {
  getPosts()
}, [])

console.log(posts)
// const { 
//   data, status, error, fetchNextPage, hasNextPage, isFetching
// } = useInfiniteQuery({
//   queryKey: ['posts'],
//   queryFn: getPost,
//   initialPageParam: 1,
//   getNextPageParam: (lastPage, allPages) => {
//     // console.log(allPageParam)
//     // return allPages[0]?.posts.length + 1
//     const nextPage = lastPage?.posts.length  ? allPages[0]?.posts.length + 1 : undefined;
//     return nextPage;
//   },
// })



// const content = data?.pages.map(posts => 
//   posts?.posts?.map((post, i) => {
//     if(posts?.posts.length === i + 1){
//       return <Card  post={post} key={post._id} innerRef={ref}  />
//     }else{
//       return <Card key={post._id} post={post} />
//     }
// })
// )


  // useEffect(() => {
  //   if(inView && hasNextPage){
  //     fetchNextPage()
  //   }
  // }, [inView, hasNextPage, fetchNextPage])


  return (
    <div className="mb-10">
      <div className='w-[80%] mx-auto mt-5 grid grid-cols-2 gap-3 md:grid-cols-3'>
      {
        posts && (
          posts.map(post => (
            <Card key={post._id} post={post} />
          ))
      
          )
        }
        </div>
    </div>
  )
}

export default Home