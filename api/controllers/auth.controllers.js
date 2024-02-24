import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const googleAuth = async (req, res, next) => {
    const { username, email, picture } = req.body

    try{
        const isValid = await User.findOne({ email })
        if(isValid){
            const { password, ...rest } = isValid._doc
            
            const token = jwt.sign({id: rest._id}, process.env.JWT_SECRET)
            res.status(200).cookie('token', token, {
                httpOnly: true
            }).json(rest)
        }else{
            const pass = Math.random().toString(36).split(-8) + Math.random().toString(36).split(-8)
            const hash = bcrypt.hashSync(pass, 10)
            const user = await User.create({
                username,
                email,
                password: hash,
                picture
            })
            const newUser = await user.save()
            const { password, ...rest } = newUser._doc
            const token = jwt.sign({id: rest._id}, process.env.JWT_SECRET)
            res.status(200).cookie('token', token, {
                httpOnly: true
            }).json(rest)
        }
    }catch(err){
        next(err)
    }
}