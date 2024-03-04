import { FaHeart } from "react-icons/fa";
import { numberManipulate } from "./Common";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Avatar } from "flowbite-react";
import moment from 'moment'

function Comment({ comment, currentUser, showLikeToast, setShowLikeToast, likeComment }) {
    const [user, setUser] = useState({})

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(`/api/user/getUser?userId=${comment?.owner}`)
            const data = await res.json()

            if(res.ok){
                setUser(data)
            }
        }
        fetchUser()
    }, [comment])

    console.log()


  return (
    <div key={comment._id} className="mt-2">
        <div className="flex justify-between items-center">
            <div className="flex items-start gap-2">
                <div className="flex gap-2">
                    <Avatar img={user[0]?.picture} rounded className="flex justify-end" />
                </div>
                <div className="">
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm">{user[0]?.username}</p>
                        <div className="w-[.6px] h-[1rem] bg-white" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">{moment(comment?.createdAt).fromNow()}</p>
                    </div>
                    <div className="my-2 text-base">
                        <p>{comment.comment}</p>
                    </div>
                    <div className="flex items-center gap-4">
                    <div className="text-xl flex items-center gap-1">
                        <FaHeart 
                            title='like'
                            className={`heart text-sm cursor-pointer drop-shadow-2x ${comment.likes.includes(currentUser._id) ? 'text-red-900' : 'text-white'}`} 
                            onClick={() => likeComment(comment._id)} />
                        <span 
                            className='text-sm'
                        >
                            {`${comment?.numberOfLikes > 0 ? 
                                numberManipulate(comment?.numberOfLikes) === 1 ? 
                                `${numberManipulate(comment?.numberOfLikes)} like` : 
                                `${numberManipulate(comment?.numberOfLikes)} likes` : ''}`}
                        </span>
                    </div>
                    <div className="text-sm cursor-pointer" title='reply'>Reply</div>
                </div>
                </div>
                
            </div>
            <div className="cursor-pointer p-2 rounded-full bg-gray-700 hover:bg-gray-800">
                <HiOutlineDotsVertical />
            </div>
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
  )
}

export default Comment