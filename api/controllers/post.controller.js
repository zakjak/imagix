import Post from "../models/post.model.js"
import { errorHandler } from "../utils/errorHandler.js"

export const createPost = async (req, res, next) => {
    const { desc, image, userId } = req.body

    if(req.user.id !== userId) {
        return next(errorHandler(404, 'UnAthorized to create post'))
    }

    try{
        const post =  await Post.create({
            desc, image, owner: userId
        })
        const newPost = await post.save()
        res.status(200).json(newPost)
    }catch(err){
        next(err)
    }
}

export const getPost = async(req, res, next) => {
    const { ownerId, postId } = req.query

    try{
        const posts = await Post.find({
            ...(ownerId && {owner: ownerId}),
            ...(postId && {_id: postId})
        }).sort({createdAt: -1})
    
        res.status(200).json(posts)
    }catch(err){
        next(err)
    }
}