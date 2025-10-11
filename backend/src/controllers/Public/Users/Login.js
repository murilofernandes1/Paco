import express from "express";
import bcrypt from "bcrypt";
import pkg from "@prisma/client";
import jwt from "jsonwebtoken";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();

router.post("/", async (req, res) => {
  const userInfo = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email: userInfo.email },
    });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    //comparando a senha fornecida pelo usuário, com a que consta no db
    const isMatch = await bcrypt.compare(userInfo.password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: "Senha inválida" });
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1y" });
    res
      .status(200)
      .json({ message: `Bem vindo, ${user.name}. Seu Token é: ${token}` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Algo deu errado, tente novamente", error: error });
  }
});
export default router;
