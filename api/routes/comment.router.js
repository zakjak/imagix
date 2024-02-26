import express from 'express'
import verifyUser from '../utils/verifyUser.js'
import { createPost } from '../controllers/comment.controller.js'

const router = express.Router()

router.post('/createPost', verifyUser, createPost)

export default router