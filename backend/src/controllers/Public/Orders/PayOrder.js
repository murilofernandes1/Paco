import express from "express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prissma = new PrismaClient();
const router = express.Router();

router.post("/:orderId", async (params) => {});
export default router;
