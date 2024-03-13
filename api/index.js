import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'
import commentRouter from './routes/comment.router.js'
import messageRouter from './routes/message.route.js'
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer()
const io = new Server(httpServer)

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

// WEB SOCKET CONNETION
io.on('connection', (socket) => {

})

httpServer.listen(3002)

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/comment', commentRouter)
app.use('/api/message', messageRouter)

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