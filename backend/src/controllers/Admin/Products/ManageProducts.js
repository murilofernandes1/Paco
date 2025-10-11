import express from "express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router({ mergeParams: true });

// ROTA PARA NOVOS PRODUTOS
router.post("/", async (req, res) => {
  const { name, price, quantity } = req.body;

  try {
    await prisma.product.create({
      data: {
        name: name,
        price: price,
        quantity: quantity,
      },
    });
    if (!name) {
      res.status(500).json({ message: "Nome inválido" });
    }
    if (!price) {
      res.status(500).json({ message: "Preço inválido" });
    }
    if (!quantity) {
      res.status(500).json({ message: "Quantidade inválida" });
    }
    res.status(201).json({
      message: `O produto: ${name}, de valor: ${price} e ${quantity} quantidades foi adicionado com sucesso!`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Não foi possivel adicionar o produto", error: error });
    console.log(error);
  }
});

//ATUALIZAR UM PRODUTO
router.put("/", async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    res.status(404).json({ message: "Produto não encontrado" });
  }
  const { name, price, quantity } = req.body;
  try {
    const productUpdated = await prisma.product.update({
      where: { id: productId },
      data: {
        ...(name && { name }),
        ...(price && { price }),
        ...(quantity && { quantity }),
      },
    });
    res.status(200).json({
      message: `Produto atualizado com sucesso`,
    });
  } catch (error) {
    res.status(500).json({ message: "Não foi possivel atualizar o produto" });
  }
});

//DELETAR UM PRODUTO

router.delete("/", async (req, res) => {
  const productId = req.params.id;

  try {
    await prisma.product.delete({
      where: { id: productId },
    });
    res.status(200).json({ message: "Produto deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Não foi possível deletar o produto" });
  }
});
export default router;
