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
import { app, server } from "./socket/socket.js";

// import { createServer } from 'http'
// import { Server } from 'socket.io'
dotenv.config()
// export const httpServer = createServer(app)

// Middleware
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
app.use('/api/message', messageRouter)

// CHAT LOGIC
// const io = new Server(httpServer, {
//     cors: {
//         origin: '*',
//         methods: ['GET', 'POST']
//     }
// })




server.listen(3000, () => {
    console.log(`Server running on port 3000`)
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