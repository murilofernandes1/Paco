import express from "express";
import Register from "../controllers/Public/Users/Register.js";
import Login from "../controllers/Public/Users/Login.js";
const router = express.Router();

router.use("/register", Register);
router.use("/login", Login);

export default router;
