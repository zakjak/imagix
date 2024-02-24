import express from "express";
import { googleAuth } from "../controllers/auth.controllers.js";
import { signOut } from "../controllers/user.controller.js";

const router = express.Router()

router.post('/google', googleAuth)
router.post('/signout', signOut)

export default router