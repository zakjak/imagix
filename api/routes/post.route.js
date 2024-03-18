import express from "express";
import { createPost, getPost, likePost } from "../controllers/post.controller.js";
import verifyUser from "../utils/verifyUser.js";

const router = express.Router()

router.post('/create', createPost)
router.get('/getPost', getPost)
router.put('/likePost/:postId/:userId',likePost)

export default router