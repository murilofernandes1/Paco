import express from "express";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router();

router.post("/:productId/:userId", async (req, res) => {
  const { productId, userId } = req.params;
  const { paymentMethod, number, adress } = req.body;

  const paymentMethods = {
  PIX: "Pix",
  CARTAO_DE_CREDITO: "Cartão de Crédito",
  BOLETO: "Boleto",
};

const methodMap = {
  pix: paymentMethods.PIX,
  "cartão de crédito": paymentMethods.CARTAO_DE_CREDITO,
  boleto: paymentMethods.BOLETO,
};

const method = methodMap[paymentMethod.toLowerCase().trim()];
if (!method) throw new Error("Método inválido");


  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!productId) {
      res.status(404).json({ message: "Produto não encontrado" });
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      res.status(404).json({ message: "Nenhum usuário encontrado" });
    }
    const buy = await prisma.order.create({
      data: {
        product: { connect: { id: productId } },
        user: { connect: { id: userId } },
        number: number,
        address: adress,
        paymentMethod: method,
      },
    });
    res.status(200).json({ message: "Compra feita com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao comprar", error });
  }
});
export default router;
