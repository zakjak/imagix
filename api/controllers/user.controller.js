import User from "../models/user.model.js"
import { errorHandler } from "../utils/errorHandler.js"

export const signOut = (req, res, next) => {
    res.clearCookie('token')
}

export const updateUser = async (req, res, next) => {
    const { userId } = req.params
    const { banner, bio } = req.body

    if(!userId || userId === '' || userId === undefined){
        return next(errorHandler(403, 'Unauthorized to update user'))
    }

    try{
        const updateUser = await User.findByIdAndUpdate(userId, 
            {$set: { banner: banner, bio: bio}})
        const { password, ...rest } = updateUser._doc
        res.status(200).json(rest)
    }catch(err){
        console.log(err)
    }
}

export const getUser = async(req, res, next) => {
    const { userId, searchTerm, order, limits} = req.query
    if(userId === '' && !userId || 
    searchTerm === '' && !searchTerm){
        return next(errorHandler(404, 'No user found!'))
    }

    try{
        const sorDirection = parseInt(order) === 'asc' ? 1 : -1
        const limit = parseInt(limits) || 9
        const users = await User.find({
            ...(userId && {_id: userId}),
            ...(searchTerm && {
                $or: [
                    {username: {$regex: `${searchTerm}`, $options: 'i'}}
                ]
            })
        }).sort({ createdAt: sorDirection }).limit(limit)

            const {password, ...rest} = users[0]?._doc
            res.status(200).json(rest)
    
    }catch(err){
        console.log(err)
    }
}

// FOLLOWERS
export const getFollowers = async (req, res, next)=> {
    const { followersId, order, limits } = req.query

    const followersArray = followersId.split(',')

    if(!followersId || followersId === ''){
        return next(errorHandler(404, 'Followers not found'))
    }

    try{
        const sorDirection = parseInt(order) === 'asc' ? 1 : -1
        const limit = parseInt(limits) || 9
            const followers = await User.find({
                ...(followersId && {_id: {$in: followersArray}}),
            }).sort({createdAt: sorDirection}).limit(limit)

            res.status(200).json(followers)
        

    }catch(err){
        console.log(err)
    }


}


export const followUser = async(req, res, next) =>{
    const { followerId, userId } = req.params

    if(!followerId || !userId || 
        followerId === undefined || 
        userId === undefined || followerId === '' || userId === ''){
            return next(errorHandler(401, 'Log in to follow the user'))
        }

    try{
        const follower = await User.findById({_id: followerId})
        const following = await User.findById({_id: userId})

        const followerIndex = follower.followers.indexOf(userId)
        const followingIndex = following.following.indexOf(followerId)

        if(follower && following){
            if(followerIndex === -1){
                if(!follower.followers.includes(userId) || 
                !following.following.includes(followerId)){
                    follower.followers.push(userId)
                    following.following.push(followerId)
                }
            }else {
                follower.followers.splice(followerIndex, 1)
                following.following.splice(followingIndex, 1)
            }
    
            await follower.save()
            res.status(200).json(follower)
        }

        if(following && follower){
            if(followingIndex === -1) {
                if(!following.following.includes(followerId)
                || !follower.followers.includes(userId))
                following.following.push(followerId)
                follower.followers.push(userId)
            }else{
                following.following.splice(followingIndex, 1)
                follower.followers.splice(followerIndex, 1)
            }
            await following.save()
            res.status(200).json(following)
        }

    }catch(err){
        next(err)
    }
}