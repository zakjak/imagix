import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'
import commentRouter from './routes/comment.router.js'
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser'

const app = express()

// Middleware
dotenv.config()
app.use(express.json())
app.use(cors({
    origin: '*',
    credentials: true
}))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cookieParser())

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URL)
.then(console.log('Database Connected'))

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/comment', commentRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})