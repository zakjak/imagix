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
    }
}, {timestamps: true})

const Post = mongoose.model('Post', PostSchema)

export default Post