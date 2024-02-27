import express from 'express'
import verifyUser from '../utils/verifyUser.js'
import { followUser, getUser, updateUser } from '../controllers/user.controller.js'

const router = express.Router()

router.put('/update/:userId', verifyUser, updateUser)
router.get('/getUser/:userId', getUser)
router.put('/getUser/:followerId/:userId', verifyUser, followUser)


export default router