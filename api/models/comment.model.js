import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    comment: {
        type:String,
        required: true
    },
    postId: {
        type: String
    },
    owner: {
        type: String
    },
    likes: {
        type: [String],
        default: []
    },
    numberOfLikes: {
        type: Number, 
        default: 0
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Reply'
    }]
}, {timestamps: true})

const Comment = mongoose.model('Comment', CommentSchema)

export default Comment