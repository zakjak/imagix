import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 6
    },
    picture: {
        type: String,
        default: 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
    },
    bio: {
        type: String,
        default: ''
    },
    banner:{
        type: String,
        default: 'https://www.kingsleygate.com/wp-content/uploads/2023/03/Natile-Blog-4.jpg'
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    }
}, {timestamps: true})

const User = mongoose.model('User', UserSchema)

export default User