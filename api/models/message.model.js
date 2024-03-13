import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    message: {
        msg: String
    },
    sender: {
        sender: String,
        ref: 'User',
    },
    receiver: {
        receiver: String,
        ref: 'User'
    }, 
    replies: [
        {
            sender: {
                type: String, 
                required: true
            },
            content: {
                type: String, 
                required: true,
            },
            timestamp: {
                type: Date, 
                default: Date.now,
            },
        }
    ]
}, {timestamps: true})

const Message = mongoose.model('Message', MessageSchema)

export default Message