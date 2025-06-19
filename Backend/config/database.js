import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("Connection successfully")
    }).catch((error) => {
        console.log("error = ", error)
    })
}

export default connectDB