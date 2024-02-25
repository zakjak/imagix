import { errorHandler } from "./errorHandler.js"
import jwt from 'jsonwebtoken'

const verifyUser = (req, res, next) => {
    const token  = req.cookies.token
    
    if(!token){
        next(errorHandler(404, "User unauthorized"))
    } 
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return next(errorHandler(404, "User unauthorized"))
        }

        req.user = user
        next()
    })
}

export default verifyUser