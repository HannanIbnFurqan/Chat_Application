import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import  aiAssistantReply  from "../controller/ai.controller.js";

const router = express.Router();

router.post("/assist", isAuthenticated, aiAssistantReply);

export default router;