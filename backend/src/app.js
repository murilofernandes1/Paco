import express from "express";
import userRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);

export default app;
