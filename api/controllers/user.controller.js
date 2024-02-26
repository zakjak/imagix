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