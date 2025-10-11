import express from "express";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router({ mergeParams: true });

router.delete("/", async (req, res) => {
  const orderId = req.params.id;
  if (!orderId) {
    res.status(404).json({ message: "Pedido não encontrado" });
  }
  try {
    await prisma.order.delete({
      where: { id: orderId },
    });
    res.status(200).json({ message: "Pedido cancelado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Não foi possivel cancelar o pedido" });
  }
});
export default router;
