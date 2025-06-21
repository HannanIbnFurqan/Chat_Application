import express from "express"
import dotenv from "dotenv"

import connectDB from "./config/database.js";

dotenv.config();
const app = express();
const PORT = 500;

app.listen(PORT, ()=>{
    connectDB();
    console.log('Server is Running PORT ',PORT)
})