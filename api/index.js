import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import authRouter from './routes/auth.route.js'

const app = express()

// Middleware
app.use(express.json())
app.use(cors({
    origin: '*',
    credentials: true
}))
dotenv.config()

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URL)
.then(console.log('Database Connected'))

app.use('/api/auth', authRouter)

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