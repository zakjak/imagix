import express from 'express'
import verifyUser from '../utils/verifyUser.js'
import { followUser, getFollowers, getUser, updateUser } from '../controllers/user.controller.js'

const router = express.Router()

router.put('/update/:userId', updateUser)
router.get('/getUser', getUser)
router.get('/getFollowers', getFollowers)
router.put('/getUser/:followerId/:userId', followUser)


export default router