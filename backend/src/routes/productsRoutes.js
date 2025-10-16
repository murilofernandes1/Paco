import express from "express";
import auth from "../middleware/auth.js";
import ManageProducts from "../controllers/Admin/Products/ManageProducts.js";
import Products from "../controllers/Public/Products/Products.js";
import SeeProduct from "../controllers/Public/Products/SeeProduct.js";
import BuyProducts from "../controllers/Private/Buy/BuyProduct.js";

const router = express.Router();

//ADMINSTRAR PRODUTOS
router.use("/:id/manage", ManageProducts);
router.use("/:id/manage", ManageProducts);
router.use("/manage", ManageProducts);

//VER PRODUTOS
router.use("/", Products);
router.use("/:id", SeeProduct);

//COMPRAR PRODUTOS
router.use("/:id/buy", auth, BuyProducts);

export default router;
