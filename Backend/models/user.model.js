import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,

    },
    profilephoto: {
        type: String,
        default: ""

    },

    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    }
}, { timestamps: true })

const User = new mongoose.model("User", userModel);

export default User;