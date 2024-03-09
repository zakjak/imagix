import { Avatar, Button } from 'flowbite-react'
import React, { useEffect } from 'react'
import { follow } from './Common'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserCard = ({ user, setUser, users }) => {
    const { currentUser } = useSelector(state => state.user)

  return (
    <div className='flex items-center justify-between'>
        <Link to={`/profile/${user?._id}`} className="flex items-start gap-2 mt-4 cursor-pointer">
            <Avatar img={user?.picture} rounded size='lg' />
            <div className="">
                <h1 className='text-2xl'>{user?.username}</h1>
                <span className='text-slate-400'>{user?.bio ? user?.bio : 'No bio'}</span>
            </div>
        </Link>
        {
            currentUser._id !== user?._id && (
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