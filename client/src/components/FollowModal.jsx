import { Avatar, Button, Modal } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


const FollowModal = ({ openFollower, setOpenFollower, followers, follow, setFollowers}) => {
    const { currentUser } = useSelector(state => state.user)
    const navigate = useNavigate()

    const handleNavigate = (followerId) => {
        setOpenFollower(false)
        navigate(`/profile/${followerId}`)
    }


    const handleFollow = async (userId, currentUserId, currentUser, setUser, follower) => {
        try{
            if(currentUser && userId && currentUser){
                const res = await fetch(`/api/user/getUser/${userId}/${currentUserId}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                })
    
                if(res.ok){
                    const data = await res.json()
                    setFollowers(followers.map(follower =>
                        follower._id === userId ? {
                            ...follower,
                            followers: data.followers,
                            following: data.following
                        }: follower
                    ))
                }
            }
    
        }catch(err){
            console.log(err)
        }
    }
    
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
                                    <div onClick={() => handleNavigate(follower?._id)} className="flex items-center gap-2 cursor-pointer">
                                        <Avatar img={follower?.picture} size='lg' rounded />
                                        <span className='font-semibold'>{follower?.username}</span>
                                    </div>
                                    {
                                        currentUser._id !== follower?._id && (
                                            <Button onClick={() => handleFollow(follower?._id, currentUser?._id, currentUser, setFollowers, follower)} color='dark'>
                                                {
                                                    follower?.followers?.includes(currentUser._id) ? 
                                                    'Following' : 'Follow'
                                                }
                                            </Button>
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