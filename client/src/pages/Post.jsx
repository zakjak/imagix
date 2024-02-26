import { Avatar, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaPlay } from "react-icons/fa";

function Post() {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState([])
    const [comment, setComment] = useState('')

    const postId = useParams()

    useEffect(() => {
        getPost()
        getUser()
    }, [postId, posts[0]?.owner])
    
    const getPost = async () => {
        const res = await fetch(`/api/post/getPost?postId=${postId.id}`)
        const data = await res.json()
    
        if(res.ok){
            setPosts(data)
        }
    }

      const getUser = async () =>{
        try{
          const res = await fetch(`/api/user/getUser/${posts[0]?.owner}`)
    
          if(res.ok){
            const data = await res.json()
            console.log(data)
            setUser(data)
          }
          
        }catch(err){
          console.log(err)
        }
      }

  return (
    <div className='mt-5'>
        <div className="w-[80%]  shadow-md mx-auto p-5 dark:bg-gray-900  rounded-2xl">
            {
                posts.map(post => (
                    <div key={post._id} className="grid gap-4 h-[30rem] grid-cols-1 md:grid-cols-2">
                        <div className="md:w-[90%] w-full mx-auto rounded-xl overflow-hidden">
                            <img className='w-full h-full object-cover' src={post.image} alt="" />
                        </div>
                        <div className="md:p-4">
                            <div className="flex text-sm items-center gap-2">
                                <Avatar className='flex float-start' rounded img={user?.picture} />
                                <div className="">
                                    <p className=''>{user?.username}</p>
                                    <p className='text-gray-200'>{`${user?.followers?.length}k followers`}</p>
                                </div>
                            </div>
                            <div className="h-[80%]">
                                <h1 className='text-lg'>{post?.desc}</h1>
                                <div className="">
                                    <h1>Comments</h1>
                                </div>
                            </div>
                            <div className="mt-2 ">
                                <div className="flex items-center border rounded-full h-12 px-2">
                                    <input value={comment} onChange={e => setComment(e.target.value)} className='max-h-12 outline-none flex-1 bg-transparent' />
                                    {
                                        comment && (
                                            <div className="">
                                                <FaPlay />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
        <div className="">

        </div>
    </div>
  )
}

export default Post