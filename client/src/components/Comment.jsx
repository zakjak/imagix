import { FaHeart } from "react-icons/fa";
import { numberManipulate } from "./Common";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Modal } from "flowbite-react";
import moment from 'moment'

function Comment({ setComments, comments, comment,currentUser, showLikeToast, setShowLikeToast, likeComment }) {
    const [user, setUser] = useState([])
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

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

    const handleDelete = async (commentId) => {
        const res = await fetch(`/api/comment/${commentId}/${user[0]?._id}`, {
            method: 'DELETE',
        })
        const data = await res.json()

        if(res.ok){
            const filter = setComments(comments?.filter(comment => comment?._id !== data?._id))
            setOpenDeleteModal(false)
        }
    }
 
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
            <div className="">
                {
                    currentUser._id === comment?.owner && (
                        <Dropdown label='' dismissOnClick={false} renderTrigger={() => <div className="bg-slate-600 p-2 cursor-pointer rounded-full hover:bg-slate-700"><HiOutlineDotsVertical /></div>}>
                            <Dropdown.Item>
                                Edit
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item  onClick={() => setOpenDeleteModal(true)}>
                                Delete
                            </Dropdown.Item>
                        </Dropdown>

                    )
                }
                <Modal show={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                    <Modal.Body>
                        <div className="">
                            <p className="font-bold text-lg">Are you sure you want to delete your comment?</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() =>handleDelete(comment?._id)}>I accept</Button>
                        <Button onClick={() => setOpenDeleteModal(false)}>Decline</Button>
                    </Modal.Footer>
                </Modal>
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