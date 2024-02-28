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
    const { ownerId, postId, order, limits, startIndex, searchTerm } = req.query

    try{
        const direction = parseInt(order) === 'asc' ? 1 : -1
        const limit = parseInt(limits) || 9
        const start = parseInt(startIndex) || 0
        const posts = await Post.find({
            ...(postId && {_id: postId}),
            ...(ownerId && {owner: ownerId}),
            ...(searchTerm && {
                $or: [
                    {desc: {$regex: `${searchTerm}`, $options: 'i'}}
                ]
            })
        }).sort({createdAt: direction})
        .skip(start).limit(limit)
    
        res.status(200).json(posts)
    }catch(err){
        next(err)
    }
}