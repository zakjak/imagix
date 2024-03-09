import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    desc: {
        type:String,
        required: true
    },
    image: {
        type: String,
        required: true,
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
    // tags: {
    //     type: String,
    //     default: []
    // }
}, {timestamps: true})

const Post = mongoose.model('Post', PostSchema)

export default Post