import Post from "../models/post.model.js"
import { errorHandler } from "../utils/errorHandler.js"

// CREATE A POST

export const createPost = async (req, res, next) => {
    const { desc, image, userId } = req.body

    if(!userId || userId === undefined || userId === '') {
        return next(errorHandler(404, 'UnAthorized to create post, Please login'))
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

// GET POSTS

export const getPost = async(req, res, next) => {
    const { ownerId, postId, order, limits, startIndex, searchTerm } = req.query
    
    try{
        const direction = parseInt(order) === 'asc' ? 1 : -1
        const limit = parseInt(limits) || 15
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

        const postCount = await Post.find({ owner: ownerId }).countDocuments()

        res.status(200).json({posts, postCount})
    }catch(err){
        next(err)
    }
}

// Like POST

export const likePost = async(req, res, next) => {
    const { postId, userId } = req.params

    // if(req.user.id !== userId){
    //     return next(errorHandler(403, 'Login to like post'))
    // }

    if(!postId || !userId || postId === '' || userId === ''){
        return next(errorHandler(403, "Unauthorized to like post"))
    }

    try{
        const post = await Post.findById({_id: postId})
        const postIndex = post.likes.indexOf(userId)

        if(postIndex === -1){
            post.likes.push(userId)
            post.numberOfLikes += 1
        }else{
            post.likes.splice(postIndex, 1)
            post.numberOfLikes -= 1
        }

        await post.save()

        res.status(200).json(post)

    }catch(err){
        next(err)
    }
}
