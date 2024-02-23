import express from "express";
import { googleAuth } from "../controllers/auth.controllers.js";

const router = express.Router()

router.post('/auth', googleAuth)

export default router