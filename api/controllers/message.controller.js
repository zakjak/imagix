import Conversation from "../models/conversation.js"
import Message from "../models/message.model.js"
import { errorHandler } from "../utils/errorHandler.js"

export const sendMessage = async (req, res, next) => {
    const { message } = req.body
    const { senderId, receiverId } = req.params

    if(!senderId || senderId === '' || !receiverId || receiverId === ''){
        return next(errorHandler(404, 'Please login'))
    }

    try{
        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save(), newMessage.save()])

        res.status(200).json(newMessage)

    }catch(err){
        next(err)
    }
}

export const getMessages = async (req, res, next) => {
    const {senderId, receiverId} = req.params

    if(senderId === '' || !senderId || receiverId === '' || !receiverId){
        return next(errorHandler(403, 'Please Login, to send message'))
    }

    try{
        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        }).populate('messages')

        if(!conversation) return res.status(200).json([])

        const messages = conversation.messages

        res.status(200).json(messages)
    }catch(err){
        next(err)
    }
}