import express from "express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router({ mergeParams: true });

router.put("/", async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    res.status(404).json({ message: "Produto não encontrado" });
  }
  const { sale } = req.body;
  try {
    const promotion = await prisma.product.update({
      where: { id: productId },
      data: {
        sale: sale,
      },
    });
    res.status(201).json({ message: "Promoção criada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Não foi possível criar essa promoção" });
    console.log(error);
  }
});
export default router;
