import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    message: {
        msg: String
    },
    from: {
        sender: String
    },
    to: {
        receiver: String
    }
})

const MessageModel = mongoose.model('Message', MessageSchema)

export default MessageModel