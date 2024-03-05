import express from 'express'
import verifyUser from '../utils/verifyUser.js'
import { createComment, deleteComment, editComment, getComments, likeComment } from '../controllers/comment.controller.js'

const router = express.Router()

router.post('/createComment', verifyUser, createComment)
router.get('/getComment', getComments)
router.put('/likeComment/:commentId/:userId', verifyUser, likeComment)
router.delete('/:commentId/:userId', verifyUser, deleteComment)
router.post('/:commentId/:userId', verifyUser, editComment)

export default router