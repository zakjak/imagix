import express from 'express'
import { getMessages, sendMessage } from '../controllers/message.controller.js'

const router = express.Router()

router.post('/sendMessage/:senderId/:receiverId', sendMessage)
router.get('/getMessages/:senderId/:receiverId', getMessages)

export default router