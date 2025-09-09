import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../Config/db.js";
import productRoutes from "../routes/productRoutes.js";
import cartRoutes from "../routes/cartRoutes.js";
import taskRoutes from "../routes/taskRoutes.js";
import { notFound, errorHandler } from "../middleware/errorHandler.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

// Health check
app.get("/api/health", (_req, res) => res.json({ ok: true, name: "tienda-backend", version: "1.0.0" }));

// Rutas de API
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/tasks", taskRoutes);

// Servir React build en producción
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

// 404 + errores
app.use(notFound);
app.use(errorHandler);

// Conectar DB y levantar server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));
});
