import express from "express";
import CancelPurchase from "../controllers/Public/Orders/CancelPurchase.js";
import ReviewProduct from "../controllers/Public/Orders/ReviewProduct.js";
const router = express.Router();

//CANCELAR COMPRA
router.use("/cancel", CancelPurchase);

//AVALIAR PEDIDO
router.use("/review", ReviewProduct);

export default router;
