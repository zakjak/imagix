import express from 'express'
import verifyUser from '../utils/verifyUser.js'
import { createComment, deleteComment, editComment, getComments, likeComment } from '../controllers/comment.controller.js'

const router = express.Router()

router.post('/createComment', createComment)
router.get('/getComment', getComments)
router.put('/likeComment/:commentId/:userId', likeComment)
router.delete('/:commentId/:userId', deleteComment)
router.put('/:commentId/:userId', editComment)

export default router