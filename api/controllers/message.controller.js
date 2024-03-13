import { httpServer } from "../index.js";
import { Server } from 'socket.io'

const io = new httpServer(httpServer, {
    cors: {
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => [
    console.log(socket.id)
])