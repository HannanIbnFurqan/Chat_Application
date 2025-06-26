import express from "express";
import { register, login, logout, getOtherUser } from "../controller/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/register", register);  
router.post("/login", login);
router.post("/logout", logout);
router.get("/", isAuthenticated, getOtherUser);

export default router;
