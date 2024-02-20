import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routes/user.router.js'
import mongoose from 'mongoose'

const app = express()

// Middleware
dotenv.config()
app.use(cors({
    origin: '*',
    credentials: true
}))
app.use(express.json())

// Database
mongoose.connect(process.env.MONGO_URL)
.then(console.log('Database connected'))

// routes
app.use('/api/users', userRouter)


// Handle Error
app.use((err, req, res) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'internal server error'

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })

})

app.listen('3000', () => {
    console.log('Server running')
})