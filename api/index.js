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
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
export const httpServer = createServer(app)

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

// CHAT LOGIC
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

let onlineUsers = []

const addNewUser = (userId, socketId) => {
    !onlineUsers.some(user => user.userId === userId) && 
    onlineUsers.push({userId, socketId})
}

const removeUser = (socketId) => {
    onlineUsers.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {
    return onlineUsers.find(user => user.userId === userId)
}

let live = ''

io.on('connection', (socket) => {

    socket.emit('otherUser', socket.id)

    socket.on('userOnline', (data) => {
        addNewUser(data?.liveUser, data.liveSocket)
        // live =  data.liveSocket
        // console.log(data)
    })

    socket.emit('liveUser', live)

    socket.on('join', (data) => {
        // const onlineUser = getUser(data.receiver)
        // socket.join(onlineUser.)
        // socket.join([data.sender, data.receiver])
    })

    socket.on('message', (data) => {
        const onlineUser = getUser(data.userId)
        // socket.join([data., data.receiver])
        io.to().emit('sent_message', data)
    })
})

httpServer.listen(PORT, () => {
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