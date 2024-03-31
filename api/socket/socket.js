import { Server } from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
})

let users = []

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
    users.push({ userId, socketId })
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.filter(user => user.userId === userId)
}

io.on('connection', (socket) => {
    
    // console.log('a user connected')

    socket.on('addUser', (userId) => {
        addUser(userId, socket.id)
        io.emit('getUser', users)
    })

    // socket.on('typing', ({ receiverId }) => {
    //     const user = getUser(receiverId)
    //     io.to(user[0].socketId).emit('getTyping', 'typing...')
    // })
    // socket.emit('typing', 'typing...')

    socket.on('sendMessage', ({ senderId, text, receiverId }) => {
        const user = getUser(receiverId)
        const sender= getUser(senderId)
        io.to(user[0]?.socketId).to(sender[0]?.socketId).emit('getMessage', {
            senderId, text
        })
    })
})

export { app, io, server }