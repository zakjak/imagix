import { Avatar, Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaHeart, FaPlay } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Toast } from 'flowbite-react'; 
import { follow, numberManipulate } from '../components/Common';
import Comment from '../components/Comment';

function Post() {
    const { currentUser } = useSelector(state => state.user)
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState([])
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [showLikeToast, setShowLikeToast] = useState(false)
    const [showCommentToast, setShowCommentToast] = useState(false)

    const postId = useParams()

    useEffect(() => {
        getPost()
        getUser()
        getComment()
    }, [postId, posts[0]?.owner])
    
    const getPost = async () => {
        const res = await fetch(`/api/post/getPost?postId=${postId?.id}`)
        const data = await res.json()
        // console.log(data.posts)
    
        if(res.ok){
            setPosts(data.posts)
        }
    }

      const getUser = async () =>{
        if(posts[0]?.owner === undefined){
            return;
        }
        try{
          const res = await fetch(`/api/user/getUser?userId=${posts[0]?.owner}`)
    
          if(res.ok){
            const data = await res.json()
            setUser(data)
          }
          
        }catch(err){
          console.log(err)
        }
      }

    
      const getComment = async () =>{
        try{
          const res = await fetch(`/api/comment/getComment?postId=${posts[0]?._id}`)
    
          if(res.ok){
            const data = await res.json()
            setComments(data)
          }
          
        }catch(err){
          console.log(err)
        }
      }

      const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            if(currentUser){
                const res = await fetch('/api/comment/createComment', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        comment,
                        postId: postId.id,
                        owner: user?._id
                    })
                })

                if(res.ok){
                    getComment()
                    setComment('')
                }
            }else{
                setShowCommentToast(true)
                return;
            }

        }catch(err){
            console.log(err)
        }
      }

      const likeComment = async (commentId) => {
        try{
            if(currentUser){
                const res = await fetch(`/api/comment/likeComment/${commentId}/${currentUser?._id}`, {
                    method: 'PUT',
                })

                if(res.ok){
                    const data = await res.json()
                    setComments(comments.map((comment) => 
                        comment._id === commentId ? {
                            ...comment,
                            likes: data.likes,
                            numberOfLikes: data.likes.length
                        }
                        :comment 
                    ))
                }
            }else{
                setShowLikeToast(true)
                return;
            }

        }catch(err){
            console.log(err)
        }
      }

      
  return (
    <div className='mt-5 mb-10'>
        <div className="w-[95%] h-[70rem] md:h-[50rem] md:w-[90%] lg:w-[80%] shadow-md mx-auto overflow-hidden dark:bg-gray-900 rounded-[2.5rem]">
            {
                posts?.map(post => (
                    <div key={post?._id} className="grid gap-4 h-full grid-cols-1 md:grid-cols-2">
                        <div className="w-full h-full">
                            <img className='w-full h-full object-cover' src={post.image} alt="" />
                        </div>
                        <div className="my-2 md:my-4 mx-6 relative">
                            <div className='flex justify-between'>
                                <Link to={`/profile/${post.owner}`} className="flex text-sm items-center gap-2">
                                    <Avatar className='flex float-start' rounded img={user[0]?.picture} />
                                    <div className="">
                                        <p className=''>{user[0]?.username}</p>
                                        <p className='dark:text-gray-300 '>
                                            {`${user[0]?.followers?.length > 0 ?  
                                                numberManipulate(user[0]?.followers?.length) === 1 ? 
                                                `${numberManipulate(user[0]?.followers?.length)} follower`: 
                                                `${numberManipulate(user[0]?.followers?.length)} followers` : ''}`}
                                        </p>
                                    </div>
                                </Link>
                                    {
                                        currentUser?._id !== user[0]?._id && (
                                            <Button color='dark' onClick={() => follow(user[0]?._id, currentUser?._id, currentUser, setUser, user)}>
                                                {
                                                    user[0]?.followers?.includes(currentUser?._id) ? 
                                                    'Following' : 'Follow'
                                                }
                                            </Button>
                                        )
                                    }
                            </div>
                            <div className=" mt-2">
                                <h1 className='text-xl lg:text-2xl md:px-2 w-[90%]'>{post?.desc}</h1>
                                <div className="mt-4">
                                    {
                                        comments.length === 0 ?(
                                            <h1 className='text-lg'><p className='font-semibold'>No comments yet</p></h1>
                                        ): (
                                            <>
                                            <h1>Comments: {numberManipulate(comments.length)}</h1>
                                            {
                                                comments.map(comment => (
                                                    <Comment key={comment._id} likeComment={likeComment} setShowLikeToast={setShowLikeToast} currentUser={currentUser} showLikeToast={showLikeToast} comment={comment}  />
                                                ))
                                            }
                                        </>
                                        )
                                    }
                                    
                                </div>
                            </div>
                            <div className="absolute w-full bottom-10 left-0">
                            {showCommentToast && (
                                            <Toast className='absolute bottom-32'>
                                                <div className="ml-3 text-sm font-normal">Login to Comment</div>
                                                <Toast.Toggle onDismiss={() => setShowCommentToast(false)} />
                                            </Toast>
                                        )}
                                <div className="flex items-center border border-gray-600 dark:border-gray-200 rounded-full h-12 px-2">
                                    <form onSubmit={handleSubmit} className='flex justify-center items-center w-full'>
                                        <input value={comment} onChange={e => setComment(e.target.value)} className='max-h-12 outline-none flex-1 bg-transparent' />
                                        {
                                            comment && (
                                                <button type='submit' className="">
                                                    <FaPlay />
                                                </button>
                                            )
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Post