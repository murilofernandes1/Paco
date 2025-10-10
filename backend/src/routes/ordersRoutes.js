import express from "express";
import CancelPurchase from "../controllers/Public/Orders/CancelOrder.js";
import ReviewProduct from "../controllers/Public/Orders/ReviewOrder.js";
import PayOrder from "../controllers/Public/Orders/PayOrder.js";
const router = express.Router();

//PAGAR PEDIDO
router.use("/pay", PayOrder);

//CANCELAR COMPRA
router.use("/cancel", CancelPurchase);

//AVALIAR PEDIDO
router.use("/review", ReviewProduct);

export default router;
