import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profile: {
        type: String,
        default: 'default.jpg'
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, { 
    timestamps: true 
});

const usermodel = mongoose.model('users', userSchema)

export default usermodel