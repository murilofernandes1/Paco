import express from "express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
  const orderId = req.params.id;
  if (!orderId) {
    res.status(404).json({ message: "Pedido não encontrado" });
  }
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "Payed" },
    });
    res.status(200).json({ message: "Pedido pago com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Não foi possivel pagar o pedido", error });
  }
});
export default router;
