import express from "express";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allProducts = await prisma.product.findMany();
    if (!allProducts) {
      res.status(404).json({ message: "Nenhum produto encontrado" });
    }
    const products = allProducts.map((product) => ({
      ...product,
      price: product.price / 100,
    }));
    res.status(200).json({ message: "Todos produtos no catálogo:", products });
  } catch (error) {
    res.status(500).json({ message: "Não foi possível listar os produtos" });
  }
});

router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    res.status(404).json({ message: "Produto não encontrado" });
  }
  try {
    const selectedProduct = await prisma.product.findUnique({
      where: { id: productId },
    });
    res.status(200).json({ message: "Produto selecionado:", selectedProduct });
  } catch (error) {
    res.status(500).json({ message: "Não foi possivel mostrar o produto" });
  }
});
export default router;
