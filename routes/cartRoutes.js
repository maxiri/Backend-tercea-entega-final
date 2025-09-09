
import { Router } from "express";
import { body } from "express-validator";
import { saveCart, getCartById, payCart, cancelCart } from "../controllers/cartController.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.post(
  "/",
  body("items").isArray({ min: 1 }).withMessage("Items requeridos"),
  body("items.*.productId").isString().withMessage("productId requerido"),
  body("items.*.nombre").isString().withMessage("nombre requerido"),
  body("items.*.precio").isFloat({ min: 0 }).withMessage("precio inválido"),
  body("items.*.quantity").isInt({ min: 1 }).withMessage("quantity inválido"),
  validate,
  saveCart
);

router.get("/:id", getCartById);
router.put("/:id/pay", payCart);
router.put("/:id/cancel", cancelCart);

export default router;
