import { Router } from "express";
import { tasks } from "../data/Task";

const router = Router();

// GET /tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    res.status(404).json({
      error: `Task ${id} not found`,
    });
    return;
  }

  res.json(task);
});

export default router;