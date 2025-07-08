import express from "express"
import sendMessage from "../controller/message.controller.js";
const route = express.Router();

route.post("/message", sendMessage)