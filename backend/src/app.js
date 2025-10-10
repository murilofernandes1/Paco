import express from "express";
import userRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
const app = express();
app.use(express.json());

app.use("/users", userRoutes);

app.use("/products", productsRoutes);

export default app;
