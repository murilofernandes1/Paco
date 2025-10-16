import express from "express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  console.log(req.userId);
  const userId = req.userId;
  if (!userId) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        orders: {
          include: { review: true },
        },
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Não foi possível encontrar o usuário", error });
    console.log(error);
  }
});
export default router;
