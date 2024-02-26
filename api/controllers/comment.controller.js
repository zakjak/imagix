import Comment from "../models/comment.model.js"
import { errorHandler } from "../utils/errorHandler.js"

export const createPost = async (req, res, next) => {
    const { postId, comment, owner } = req.body

    if(!req.user.id){
        return next(errorHandler(404, 'Unauthorized'))
    }

    try{
        const newComment = await Comment.create({
            postId, comment, owner
        })
    
        const comments = await newComment.save()
    
        res.status(200).json(comments)
    }catch(err){
        next(err)
    }
}

export const getComments = async (req, res, next) => {
    const {  } = req.queries
}