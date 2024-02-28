import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { numberManipulate } from "./Common";

function Comment({ comment, currentUser, showLikeToast, setShowLikeToast, likeComment }) {
  return (
    <div key={comment._id} className="mt-2">
            <p>{comment.comment}</p>
            <div className="flex items-center gap-4">
                <div className="text-xl flex items-center gap-1">
                    <FaHeart 
                        title='like'
                        className={`heart cursor-pointer drop-shadow-2x ${comment.likes.includes(currentUser._id) ? 'text-red-900' : 'text-white'}`} 
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