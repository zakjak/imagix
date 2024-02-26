import express from "express";
import { createPost, getPost } from "../controllers/post.controller.js";
import verifyUser from "../utils/verifyUser.js";

const router = express.Router()

router.post('/create', verifyUser, createPost)
router.get('/getPost', getPost)

export default router