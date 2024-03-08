import { Avatar, Button } from 'flowbite-react'
import React from 'react'
import { follow } from './Common'
import { useSelector } from 'react-redux'

const UserCard = ({ user, setUser }) => {
    const { currentUser } = useSelector(state => state.user)
  return (
    <div className='flex items-center justify-between'>
        <div className="flex items-start gap-2 mt-4">
            <Avatar img={user.picture} rounded size='lg' />
            <div className="">
                <h1 className='text-2xl'>{user.username}</h1>
                <span className='text-slate-400'>{user.bio ? user.bio : 'No bio'}</span>
            </div>
        </div>
        {
            currentUser._id !== user._id && (
                <Button color='dark' onClick={() => follow(user?._id, currentUser?._id, currentUser, setUser, [user])}>
                {
                    user?.followers?.includes(currentUser?._id) ? 
                    'Following' : 'Follow'
                }
                </Button>
            )
        }
    </div>
  )
}

export default UserCard