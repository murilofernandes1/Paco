import express from "express";
import ManageProducts from "../controllers/Products/ManageProducts.js";
import Products from "../controllers/Products/Products.js";
const router = express.Router();

//ADMINSTRAR PRODUTOS
router.use("/manage", ManageProducts);
router.use("/manage/:id", ManageProducts);

//VER PRODUTOS
router.use("/", Products);
router.use("/:id", Products);
export default router;
