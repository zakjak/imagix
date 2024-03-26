import express from "express";
import { createPost, deletePost, getPost, likePost } from "../controllers/post.controller.js";
import verifyUser from "../utils/verifyUser.js";

const router = express.Router()

router.post('/create', createPost)
router.get('/getPost', getPost)
router.put('/likePost/:postId/:userId',likePost)
router.delete('/deletePost/:postId/:userId', deletePost)

export default router