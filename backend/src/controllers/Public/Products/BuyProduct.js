import express from "express";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router();

router.post("/:productId/:userId", async (req, res) => {
  const { productId, userId } = req.params;
  const { userChoice, number, adress } = req.body;
  const paymentMethods = {
    PIX: "Pix",
    CARTAO_DE_CREDITO: "Cartão de Crédito",
    BOLETO: "Boleto",
  };

  async function MethodChoosed(userChoice) {
    let method;
    if (userChoice === "Pix") {
      method = paymentMethods.PIX;
    } else if (userChoice === "Cartão de Crédito") {
      method = paymentMethods.CARTAO_DE_CREDITO;
    } else if (userChoice === "Boleto") {
      method = paymentMethods.BOLETO;
    } else {
      throw new Error("Método inválido");
    }
  }
  const method = MethodChoosed(userChoice);

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
        adress: adress,
        payments: method,
      },
    });
    res.status(200).json({ message: "Compra feita com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao comprar", error });
  }
});
export default router;
