import { errorHandler } from "./errorHandler"
import jwt from 'jsonwebtoken'

const verifyUser = (res, req, next) => {
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