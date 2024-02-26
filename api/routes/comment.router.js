import express from 'express'
import verifyUser from '../utils/verifyUser.js'
import { createComment, getComments, likeComment } from '../controllers/comment.controller.js'

const router = express.Router()

router.post('/createComment', verifyUser, createComment)
router.get('/getComment', getComments)
router.put('/likeComment/:commentId/:userId', verifyUser, likeComment)

export default router