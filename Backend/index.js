import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRouter.js"; // Correct filename
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";
import aiRoute from "./routes/aiRoute.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 6000;

//  Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());


// Connect DB before server starts
connectDB();

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/ai", aiRoute); 


app.listen(PORT, () => {
    console.log("Server is running on PORT", PORT);
});
