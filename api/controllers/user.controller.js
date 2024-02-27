import User from "../models/user.model.js"
import { errorHandler } from "../utils/errorHandler.js"

export const signOut = (req, res, next) => {
    res.clearCookie('token')
}

export const updateUser = async (req, res, next) => {
    const { userId } = req.params
    const { banner, bio } = req.body
    

    if(userId !== req.user.id){
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
    const {userId} = req.params

    if(!userId ||  userId === ''){
        return next(errorHandler(404, 'No user found!'))
    }

    try{
        const user = await User.findById(userId)
        const { password, ...rest } = user._doc
    
        res.status(200).json(rest)
    }catch(err){
        console.log(err)
    }
}

export const followUser = async(req, res, next) =>{
    const { followerId, userId } = req.params

    if(!req.user.id){
        return next(errorHandler(404, 'Sign in to follower user'))
    }

    try{
        const follower = await User.findById({_id: followerId})
        const following = await User.findById({_id: userId})

        const followerIndex = follower.following.indexOf(userId)
        const followingIndex = following.followers.indexOf(followerId)

        if(followerIndex === -1){
            follower.following.push(userId)
        }else {
            follower.following.splice(followerIndex, 1)
        }

        await follower.save()
        res.status(200).json(follower)

        if(followingIndex === -1) {
            following.followers.push(followerId)
        }else{
            following.followers.splice(followingIndex, 1)
        }

        await following.save()
        res.status(200).json(following)

    }catch(err){
        next(err)
    }
}