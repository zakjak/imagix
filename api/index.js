import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()

// Middleware
app.use(express.json())
app.use(cors({
    origin: '*',
    credentials: true
}))
dotenv.config()

// DATABASE CONNECTION


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})