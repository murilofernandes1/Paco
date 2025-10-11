import express from "express";
import auth from "../middleware/auth.js";
import CancelPurchase from "../controllers/Public/Orders/CancelOrder.js";
import ReviewProduct from "../controllers/Public/Orders/ReviewOrder.js";
import PayOrder from "../controllers/Public/Orders/PayOrder.js";
const router = express.Router();

//PAGAR PEDIDO
router.use("/:id/pay", auth, PayOrder);

//CANCELAR COMPRA
router.use("/:id/cancel", auth, CancelPurchase);

//AVALIAR PEDIDO
router.use("/:id/review", auth, ReviewProduct);

export default router;
