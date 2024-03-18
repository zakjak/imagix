import { FaHeart } from "react-icons/fa";
import { numberManipulate } from "./Common";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Modal, TextInput } from "flowbite-react";
import moment from 'moment'

function Comment({ setComments, comments, comment, currentUser, showLikeToast, setShowLikeToast, likeComment }) {
    const [user, setUser] = useState([])
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [editComment, setEditComment] = useState(comment?.comment)

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(`http://localhost:3000/api/user/getUser?userId=${comment?.owner}`)
            const data = await res.json()

            if(res.ok){
                setUser(data)
            }
        }
        fetchUser()
    }, [comment])

    const handleDeleteComment = async (commentId) => {
        const res = await fetch(`http://localhost:3000/api/comment/${commentId}/${user?._id}`, {
            method: 'DELETE',
        })
        const data = await res.json()

        if(res.ok){
            const filter = setComments(comments?.filter(comment => comment?._id !== data?._id))
            setOpenDeleteModal(false)
        }
    }

    const handleEditComment = async (e) => {
        e.preventDefault()
        const res = await fetch(`http://localhost:3000/api/comment/${comment?._id}/${user?._id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({comment: editComment})
        })


        if(res.ok){ 
            const data = await res.json()
            const index = comments.findIndex(comment => comment?._id === data?._id)
            if(index !== -1){
                setComments(prev => {
                    const newArray = [...prev]
                    newArray[index] = data
                    return newArray
                })
                
                
            }
            setOpenEditModal(false)
        }
    }
 
  return (
    <div key={comment._id} className="mt-2">
        <div className="flex justify-between items-center">
            <div className="flex items-start gap-2">
                <div className="flex gap-2">
                    <Avatar img={user?.picture} rounded className="flex justify-end" />
                </div>
                <div className="">
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm">{user?.username}</p>
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
                            {comment?.numberOfLikes >= 1 && numberManipulate(comment?.numberOfLikes)}
                        </span>
                    </div>
                    {/* <div className="text-sm cursor-pointer" title='reply'>Reply</div> */}
                </div>
                </div>
            </div>
            <div className="">
                {
                    currentUser._id === comment?.owner && (
                        <Dropdown label='' dismissOnClick={false} renderTrigger={() => <div className="bg-slate-600 p-2 cursor-pointer rounded-full hover:bg-slate-700"><HiOutlineDotsVertical /></div>}>
                            <Dropdown.Item onClick={() => setOpenEditModal(true)}>
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
                        <Button onClick={() =>handleDeleteComment(comment?._id)}>I accept</Button>
                        <Button onClick={() => setOpenDeleteModal(false)}>Decline</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
                    <Modal.Body className="bg-gray-800 p-10 flex flex-col">
                    <div onClick={() => setOpenEditModal(false)} 
                    className="p-4 w-12 h-12 right-2 top-2 absolute 
                    flex items-center justify-center text-white
                     rounded-full text-2xl bg-slate-500 cursor-pointer hover:bg-slate-700">X</div>
                        <form className="flex mt-6 flex-col gap-4 items-center" onSubmit={handleEditComment}>
                            <TextInput className="w-full" value={editComment} onChange={(e) => setEditComment(e.target.value)} />
                            <Button className="w-[80%]" type="submit">Edit</Button>
                        </form>
                    </Modal.Body>
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