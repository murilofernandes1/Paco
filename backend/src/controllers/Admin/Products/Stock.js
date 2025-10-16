import express from "express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
  const productId = req.params.id;
  const { size, color, quantity } = req.body;

  if (!productId) {
    res.status(404).json({ message: "Esse produto não existe" });
  }
  try {
    await prisma.stock.create({
      data: {
        product: { connect: { id: productId } },
        size: size,
        color: color,
        quantity: quantity,
      },
    });
    res.status(201).json({ message: "Estoque do produto criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Não foi possível criar o estoque" });
    console.log(error);
  }
});
export default router;
