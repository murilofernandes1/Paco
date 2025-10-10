import express from "express";
import ManageProducts from "../controllers/Admin/Products/ManageProducts.js";
import Products from "../controllers/Public/Products/Products.js";
import BuyProducts from "../controllers/Public/Products/BuyProduct.js";

const router = express.Router();

//ADMINSTRAR PRODUTOS
router.use("/manage", ManageProducts);
router.use("/manage/:id", ManageProducts);

//VER PRODUTOS
router.use("/", Products);
router.use("/:id", Products);

//COMPRAR PRODUTOS
router.use("/buy", BuyProducts);

export default router;
