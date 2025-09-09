
import Task from "../Models/Task.js";

// GET /api/tasks
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({}).lean();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// GET /api/tasks/:id
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).lean();
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// POST /api/tasks
export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }
    const task = await Task.create({ title, description });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// PUT /api/tasks/:id
export const updateTask = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    const updated = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updated) return res.status(404).json({ message: "Tarea no encontrada" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res, next) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Tarea no encontrada" });
    res.json({ message: "Tarea eliminada" });
  } catch (err) {
    next(err);
  }
};
