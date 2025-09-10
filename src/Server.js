
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../Config/db.js";

import productRoutes from "../routes/productRoutes.js";
import cartRoutes from "../routes/cartRoutes.js";
import taskRoutes from "../routes/taskRoutes.js";

import { notFound, errorHandler } from "../middleware/errorHandler.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

// Health check
app.get("/", (_req, res) =>
  res.json({ ok: true, name: "tienda-backend", version: "1.0.0" })
);

// Rutas API
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/tasks", taskRoutes);

// 404 + manejador de errores
app.use(notFound);
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 API running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Error conectando a la DB:", err);
  });
