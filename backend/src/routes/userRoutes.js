import express from "express";
import Register from "../controllers/Public/Users/Register.js";
import Login from "../controllers/Public/Users/Login.js";
import Me from "../controllers/Private/Me/Me.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.use("/register", Register);
router.use("/login", Login);
router.use("/me", auth, Me);
export default router;
