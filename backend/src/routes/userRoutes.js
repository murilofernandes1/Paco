import express from "express";
import Register from "../controllers/Users/Register.js";
import Login from "../controllers/Users/Login.js";
const router = express.Router();

router.use("/register", Register);
router.use("/login", Login);
export default router;
