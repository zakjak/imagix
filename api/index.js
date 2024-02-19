import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()

// Middleware
dotenv.config()
app.use(cors())


// routes


app.listen('3000', () => {
    console.log('Server running')
})