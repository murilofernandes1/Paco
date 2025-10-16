import express from "express";
import auth from "../middleware/auth.js";
import ManageProducts from "../controllers/Admin/Products/ManageProducts.js";
import Products from "../controllers/Public/Products/Products.js";
import SeeProduct from "../controllers/Public/Products/SeeProduct.js";
import BuyProducts from "../controllers/Private/Buy/BuyProduct.js";
import Sale from "../controllers/Admin/Products/Sale.js";
4;
import Stock from "../controllers/Admin/Products/Stock.js";

const router = express.Router();

//ADMINSTRAR PRODUTOS
router.use("/:id/manage", auth, ManageProducts);
router.use("/:id/manage", auth, ManageProducts);
router.use("/manage", auth, ManageProducts);

//ADICIONAR PROMOÇÕES
router.use("/:id/sale", auth, Sale);

//ADICIONAR ESTOQUE PARA PRODUTOS
router.use("/:id/stock", Stock);
//VER PRODUTOS
router.use("/", Products);
router.use("/:id", SeeProduct);

//COMPRAR PRODUTOS
router.use("/:id/buy", auth, BuyProducts);

export default router;
