import { Avatar, Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaPlay } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Toast } from 'flowbite-react'; 
import { follow, numberManipulate } from '../components/Common';
import Comment from '../components/Comment';
import moment from 'moment';

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
                        owner: currentUser?._id
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

      const profilePage = (postOwner) => {
        window.history.pushState(`/profile/${postOwner}`)
        window.location.reload()
      }


      
  return (
    <div className='my-6 w-[80%] mx-auto bg-gray-300 dark:bg-gray-900 rounded-xl'>
            {
                posts?.map(post => (
                    <div key={post?._id} className="w-[95%] mx-auto rounded-xl">
                        <div className="pt-4 flex justify-between">
                        <Link onClick={() =>profilePage(post.owner)} to={`/profile/${post.owner}`} className="flex text-sm items-center gap-2">
                            <Avatar className='float-start' rounded img={user[0]?.picture} />
                            <div className="flex gap-2">
                                <div className="">
                                    <p>{user[0]?.username}</p>
                                    <p className='dark:text-gray-300 text-xs'>
                                        {`${user[0]?.followers?.length > 0 ?  
                                            numberManipulate(user[0]?.followers?.length) === 1 ? 
                                            `${numberManipulate(user[0]?.followers?.length)} follower`: 
                                            `${numberManipulate(user[0]?.followers?.length)} followers` : ''}`}
                                    </p>   
                                </div>
                                <div className="w-[.6px] h-[1rem] bg-slate-500" />
                                <p className='text-slate-500'>{moment(post?.createdAt).fromNow()}</p>
                            </div>
                        </Link>
                        <div className='flex justify-between'>
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
                        </div>
                        <div className="mt-2">
                            <p className='text-base md:px-2 w-[90%]'>{post?.desc}</p>
                        </div>
                        <div className="w-full mt-4 h-[40rem]">
                            <img className='w-full h-full object-cover' src={post.image} alt="" />
                        </div>
                        <div className="mt-2">
                                    {
                                        comments.length === 0 ?(
                                            <h1 className='text-lg'><p className='font-semibold'>No comments yet</p></h1>
                                        ): (
                                            <>
                                            <h1>Comments: {numberManipulate(comments.length)}</h1>
                                            {
                                                comments.map(comment => (
                                                    <Comment 
                                                        key={comment._id} 
                                                        setComments={setComments}
                                                        comments={comments}
                                                        likeComment={likeComment} 
                                                        setShowLikeToast={setShowLikeToast} 
                                                        currentUser={currentUser} 
                                                        showLikeToast={showLikeToast} 
                                                        comment={comment} 
                                                        setComment={setComment} 
                                                    />
                                                ))
                                            }
                                        </>
                                        )
                                    }
                                </div>
                        <div className="py-6">
                            <div className="">
                            {showCommentToast && (
                                            <Toast className='absolute bottom-32'>
                                                <div className="ml-3 text-sm font-normal">Login to Comment</div>
                                                <Toast.Toggle onDismiss={() => setShowCommentToast(false)} />
                                            </Toast>
                                        )}
                                <div className="flex items-center border border-gray-600 dark:border-gray-200 rounded-full h-12 px-2">
                                    <form onSubmit={handleSubmit} className='flex justify-center items-center w-full'>
                                        <div className="max-h-12 px-3 outline-none flex-1 bg-transparent">
                                            <input className='w-full bg-transparent outline-none' placeholder={`Write your comment, ${user[0]?.username.split(' ')[0]}`} value={comment} onChange={e => setComment(e.target.value)} />
                                        </div>
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
  )
}

export default Post