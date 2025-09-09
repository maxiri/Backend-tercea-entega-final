import express from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validate.js";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post(
  "/register",
  body("email").isEmail().withMessage("Email inválido"),
  body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  validate,
  registerUser
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").exists(),
  validate,
  loginUser
);

export default router;
