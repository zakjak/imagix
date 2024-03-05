import Comment from "../models/comment.model.js"
import { errorHandler } from "../utils/errorHandler.js"

export const createComment = async (req, res, next) => {
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
    const { postId } = req.query

    try{
        const comments = await Comment.find({postId}).sort({ createdAt: -1 })
    
        res.status(200).json(comments)
    }catch(err){
        next(err)
    }
}

export const likeComment = async(req, res, next) => {
    const { commentId, userId } = req.params

    if(req.user.id !== userId){
        return next(errorHandler(403, 'Login to comment'))
    }

    if(!commentId || !userId || commentId === '' || userId === ''){
        return next(errorHandler(403, "Fields can't be empty"))
    }

    try{
        const comment = await Comment.findById({_id: commentId})
        const commentIndex = comment.likes.indexOf(userId)

        if(commentIndex === -1){
            comment.likes.push(userId)
            comment.numberOfLikes += 1
        }else{
            comment.likes.splice(commentIndex, 1)
            comment.numberOfLikes -= 1
        }

        await comment.save()

        res.status(200).json(comment)

    }catch(err){
        next(err)
    }
}

export const deleteComment = async (req, res, next) => {
    const { userId, commentId } = req.params


    if(userId !== req.user.id){
        return next(errorHandler(403, 'Unauthorized to delete'))
    }

    try{
        const deletedComment = await Comment.findByIdAndDelete(commentId )

        res.status(200).json(deletedComment)
    }catch(err){
        next(err)
    }
}

export const editComment = async (req, res, next) => {
    const { commentId, userId } = req.params
    const { comment } = req.body

    if(userId !== req.user.id){
        next(errorHandler(404, 'Unauthorized to edit comment'))
    }

    try{
        const editComment = await Comment.findByIdAndUpdate(commentId, {$set: {comment: comment}})

        res.status(200).json(editComment)
    }catch(err){
        next(err)
    }
}