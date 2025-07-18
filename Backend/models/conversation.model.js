import mongoose, { mongo } from "mongoose";

const conversationModel = new mongoose.Schema({
    participants: [{
         type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    messages:[{
         type: mongoose.Schema.Types.ObjectId,
        ref:"Message"
    }],
})

const Conversation = new mongoose.model("Conversation", conversationModel);