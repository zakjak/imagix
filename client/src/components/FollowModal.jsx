import { Avatar, Button, Modal } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const FollowModal = ({ openFollower, setOpenFollower, followers, follow }) => {
    const { currentUser } = useSelector(state => state.user)
  return (
    <Modal show={openFollower} onClose={() => setOpenFollower(false)}>
        <div className="">
            <Modal.Header>
                <span className='dark:text-gray-200'>{follow}</span>
            </Modal.Header>
            <Modal.Body className='flex flex-col gap-4'>
                {
                    followers.length === 0 ? (
                        <h1>No {follow}</h1>
                    ): (
                        <>
                            {followers?.map(follower => (
                                <div key={follower?._id} className="flex items-center border-b pb-2 last:pb-0 last:border-0 justify-between">   
                                    <Link to={`/profile/${follower?._id}`} className="flex items-center gap-2">
                                        <Avatar img={follower?.picture} size='lg' rounded />
                                        <span className='font-semibold'>{follower?.username}</span>
                                    </Link>
                                    {
                                        currentUser._id !== follower?._id && (
                                            <Button color='dark'>Follow</Button>
                                        ) 
                                    }
                                </div>
                            ))}
                        </>
                    )
                }
            </Modal.Body>

        </div>
    </Modal>
  )
}

export default FollowModal