
import { Router } from "express";
import { body, param } from "express-validator";
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from "../controllers/taskControllers.js";
import { validate } from "../middleware/validate.js";

const router = Router();

// GET /api/tasks
router.get("/", getTasks);

// GET /api/tasks/:id
router.get("/:id", param("id").isMongoId().withMessage("ID inválido"), validate, getTaskById);

// POST /api/tasks
router.post(
  "/",
  body("title").isString().notEmpty().withMessage("Título requerido"),
  body("description").isString().notEmpty().withMessage("Descripción requerida"),
  validate,
  createTask
);

// PUT /api/tasks/:id
router.put(
  "/:id",
  param("id").isMongoId().withMessage("ID inválido"),
  body("title").optional().isString(),
  body("description").optional().isString(),
  body("completed").optional().isBoolean(),
  validate,
  updateTask
);

// DELETE /api/tasks/:id
router.delete("/:id", param("id").isMongoId().withMessage("ID inválido"), validate, deleteTask);

export default router;
