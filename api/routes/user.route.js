import express from 'express'
import verifyUser from '../utils/verifyUser.js'
import { followUser, getFollowers, getUser, updateUser } from '../controllers/user.controller.js'

const router = express.Router()

router.put('/update/:userId', verifyUser, updateUser)
router.get('/getUser', getUser)
router.get('/getFollowers', getFollowers)
router.put('/getUser/:followerId/:userId', verifyUser, followUser)


export default router