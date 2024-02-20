import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const googleAuth = async (req, res, next) => {
    const { name, picture, email} = req.body

    try{
        const isValid = await User.findOne({email})
        if(isValid){
            const { password, ...rest } = isValid._doc
            const token = jwt.sign({ id: isValid._id }, process.env.JWT_SECRET)
            res.status(200).cookie('token', token, {
                httpOnly: true
            }).json(rest)
        }else{
            const pass = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hash = bcrypt.hashSync(pass, 10)
            const newUser = await User({
                name: name,
                picture: picture,
                email: email,
                password: hash
            })

            const user = await newUser.save()

            const { password, ...rest } = user._doc
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
            res.status(200).cookie('token', token, {
                httpOnly: true
            }).json(rest)
        }      
    }catch(err){
        next(err)
    }
}