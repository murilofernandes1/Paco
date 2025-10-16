import express from "express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.id;
  const userReview = req.body;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { product: true },
  });

  if (!orderId) {
    res.status(404).json({ message: "Pedido não encontrado" });
  }
  try {
    await prisma.review.create({
      data: {
        order: { connect: { id: orderId } },
        user: { connect: { id: userId } },
        product: { connect: { id: order.product.id } },
        content: userReview.content,
        stars: userReview.stars,
      },
    });
    res.status(200).json({ message: "Avaliação feita com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Não foi possível fazer a avaliação" });
  }
});

export default router;
