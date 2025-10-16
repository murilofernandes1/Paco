import express from "express";
import auth from "../middleware/auth.js";
import CancelOrder from "../controllers/Private/Orders/CancelOrder.js";
import ReviewProduct from "../controllers/Private/Orders/ReviewOrder.js";
import PayOrder from "../controllers/Private/Orders/PayOrder.js";
const router = express.Router();

//PAGAR PEDIDO
router.use("/:id/pay", auth, PayOrder);

//CANCELAR COMPRA
router.use("/:id/cancel", auth, CancelOrder);

//AVALIAR PEDIDO
router.use("/:id/review", auth, ReviewProduct);

export default router;
