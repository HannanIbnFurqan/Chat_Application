import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    Fullname: {
        type: String,
        required: true,
        trim: true,
    },
    Username: {
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
    profilePhoto: {
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