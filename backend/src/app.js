import express from "express";
import auth from "./middleware/auth.js";
import userRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", auth, productsRoutes);
app.use("/orders", auth, ordersRoutes);

export default app;
