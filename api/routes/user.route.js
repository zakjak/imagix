import express from 'express'
import verifyUser from '../utils/verifyUser.js'
import { getUser, updateUser } from '../controllers/user.controller.js'

const router = express.Router()

router.put('/update/:userId', verifyUser, updateUser)
router.get('/getUser/:userId', verifyUser, getUser)


export default router