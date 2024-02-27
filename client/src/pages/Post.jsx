import { Avatar, Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaHeart, FaPlay } from "react-icons/fa";
import EmojiPicker from 'emoji-picker-react'
import { useSelector } from 'react-redux';
import { Toast } from 'flowbite-react'; 
import { numberManipulate } from '../components/Common';

function Post() {
    const { currentUser } = useSelector(state => state.user)
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState([])
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [showLikeToast, setShowLikeToast] = useState(false)
    const [showCommentToast, setShowCommentToast] = useState(false)
    const [emoji, setEmoji] = useState(false)

    const postId = useParams()

    useEffect(() => {
        getPost()
        getUser()
        getComment()
    }, [postId, posts[0]?.owner])
    
    const getPost = async () => {
        const res = await fetch(`/api/post/getPost?postId=${postId?.id}`)
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
                    headers: {'Content-Type': 'application/json'},
                })

                if(res.ok){
                    getComment()
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
    <div className='mt-5'>
        <div className="w-[80%]  shadow-md mx-auto p-5 dark:bg-gray-900  rounded-2xl">
            {
                posts.map(post => (
                    <div key={post._id} className="grid gap-4 h-[30rem] grid-cols-1 md:grid-cols-2">
                        <div className="md:w-[90%] w-full mx-auto rounded-xl overflow-hidden">
                            <img className='w-full h-full object-cover' src={post.image} alt="" />
                        </div>
                        <div className="md:p-4">
                            <div className="flex justify-between ">
                                <Link to={`/profile/${post.owner}`} className="flex text-sm items-center gap-2">
                                    <Avatar className='flex float-start' rounded img={user?.picture} />
                                    <div className="">
                                        <p className=''>{user?.username}</p>
                                        <p className='text-gray-200'>{`${user?.followers?.length}k followers`}</p>
                                    </div>
                                </Link>
                                {
                                    currentUser._id !== user?._id && (
                                        <Button color='dark'>
                                            Follow
                                        </Button>
                                    )
                                }
                            </div>
                            <div className="h-[40%] md:h-[80%]">
                                <h1 className='text-lg'>{post?.desc}</h1>
                                <div className="">
                                    <h1>Comments: {comments.length > 0 && numberManipulate(comments.length)}</h1>
                                    {
                                        comments?.map(comment => (
                                            <div key={comment?._id} className="mt-2">
                                                <p>{comment?.comment}</p>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-xl flex items-center gap-1">
                                                        <FaHeart 
                                                            title='like'
                                                            className={`cursor-pointer ${comment.likes.includes(currentUser?._id) ? 'text-red-900' : 'text-white'}`} 
                                                            onClick={() => likeComment(comment?._id)} />
                                                        <span className='text-sm'>{`${comment?.numberOfLikes > 0 ? numberManipulate(comment?.numberOfLikes) : ''}`}</span>
                                                    </div>
                                                    <div className="text-sm cursor-pointer" title='reply'>Reply</div>
                                                </div>
                                                {
                                                    showLikeToast && (
                                                        <Toast>
                                                            <div className="ml-3 text-sm font-normal">Login to Like Comment</div>
                                                            <Toast.Toggle onDismiss={() => setShowLikeToast(false)} />
                                                        </Toast>
                                                    )
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="mt-2">
                            {showCommentToast && (
                                            <Toast className='absolute bottom-32'>
                                                <div className="ml-3 text-sm font-normal">Login to Comment</div>
                                                <Toast.Toggle onDismiss={() => setShowCommentToast(false)} />
                                            </Toast>
                                        )}
                                <div className="flex items-center border rounded-full h-12 px-2">
                                    <form onSubmit={handleSubmit} className='flex justify-center items-center w-full'>
                                        <input value={comment} onChange={e => setComment(e.target.value)} className='max-h-12 outline-none flex-1 bg-transparent' />
                                        <div onClick={() => setEmoji(!emoji)} className="">ad</div>
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
        <div className="">

        </div>
    </div>
  )
}

export default Post