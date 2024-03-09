import { Avatar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'
import { numberManipulate } from './Common'

const CardSearch = ({ post, setPosts, posts }) => {
    const { currentUser } = useSelector(state => state.user)
    const [showLikeToast, setShowLikeToast] = useState(false)
    const [user, setUser] = useState({})

    const location = useLocation()

    const handlePostLikes = async (postId) => {
        try{
            if(currentUser){
                const res = await fetch(`/api/post/likePost/${postId}/${currentUser?._id}`, {
                    method: 'PUT',
                })

                if(res.ok){
                    const data = await res.json()
                    setPosts(posts.map((post) => 
                        post._id === postId ? {
                            ...post,
                            likes: data.likes,
                            numberOfLikes: data.likes.length
                        }
                        :post
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

    const getUser = async () => {
            if(post?.owner === undefined){
                return;
            }
            try{
              const res = await fetch(`/api/user/getUser?userId=${post?.owner}`)
              const data = await res.json()
        
              if(res.ok){
                
                setUser(data)
              }
              
            }catch(err){
              console.log(err)
            }     
    }
      
    useEffect(() => {
        getUser()
    }, [location.search])
      
    
  return (
    <div>
        <Link to={`/post/${post?._id}`} className="">
            <div className="rounded-md overflow-hidden">
                <img className='w-full' src={post.image} alt="" />
            </div>
        </Link>
        <div className="w-[90%] mx-auto flex pt-2 justify-between items-center">
            <Link to={`/profile/${user[0]?._id}`} className="flex gap-1 items-center">
                <Avatar img={user[0]?.picture} size='sm' rounded/>
                <span className='text-xs dark:text-slate-300'>{user[0]?.username}</span>
            </Link>
            <div className="">
                <div className="flex items-center gap-1">
                    <span 
                        className={`cursor-pointer ${post.likes.includes(currentUser._id) ? 'text-red-900' : 'text-gray-500'}`} 
                        onClick={() => handlePostLikes(post?._id)}><FaHeart /></span>
                    <span>
                    <span 
                            className='text-sm'
                        >
                            {`${post?.numberOfLikes > 0 ? 
                                numberManipulate(post?.numberOfLikes) === 1 ? 
                                `${numberManipulate(post?.numberOfLikes)} ` : 
                                `${numberManipulate(post?.numberOfLikes)}` : ''}`}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardSearch