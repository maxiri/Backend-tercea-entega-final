
import { Router } from "express";
import { body, param } from "express-validator";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { validate } from "../middleware/validate.js";

const router = Router();

// GET /api/products
router.get("/", getProducts);

// GET /api/products/:id
router.get("/:id", param("id").isMongoId().withMessage("ID inválido"), validate, getProductById);

// POST /api/products
router.post(
  "/",
  body("nombre").isString().notEmpty().withMessage("Nombre obligatorio"),
  body("descripcionCorta").isString().notEmpty().withMessage("Descripción corta obligatoria"),
  body("categoria").isString().notEmpty().withMessage("Categoría obligatoria"),
  body("precio").isFloat({ min: 0 }).withMessage("Precio inválido"),
  // opcionales soportados por tu UI
  body("descripcionLarga").optional().isString(),
  body("subcategoria").optional().isString(),
  body("stock").optional().isInt({ min: 0 }),
  body("foto").optional().isString(),
  body("marca").optional().isString(),
  body("envioGratis").optional().isBoolean(),
  body("edadDesde").optional().isInt({ min: 0 }),
  body("edadHasta").optional().isInt({ min: 0 }),
  validate,
  createProduct
);

// PUT /api/products/:id
router.put(
  "/:id",
  param("id").isMongoId().withMessage("ID inválido"),
  body("nombre").optional().isString(),
  body("descripcionCorta").optional().isString(),
  body("descripcionLarga").optional().isString(),
  body("categoria").optional().isString(),
  body("subcategoria").optional().isString(),
  body("precio").optional().isFloat({ min: 0 }),
  body("stock").optional().isInt({ min: 0 }),
  body("foto").optional().isString(),
  body("marca").optional().isString(),
  body("envioGratis").optional().isBoolean(),
  body("edadDesde").optional().isInt({ min: 0 }),
  body("edadHasta").optional().isInt({ min: 0 }),
  validate,
  updateProduct
);

// DELETE /api/products/:id
router.delete("/:id", param("id").isMongoId().withMessage("ID inválido"), validate, deleteProduct);

export default router;
