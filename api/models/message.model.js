import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        ref: 'User',
    },
    receiverId: {
        type: String,
        ref: 'User'
    }
}, {timestamps: true})

const Message = mongoose.model('Message', MessageSchema)

export default Message