import { Router, type Request, type Response } from "express";
import { tasks } from "../data/Task";

const router = Router();

// GET /tasks
router.get("/", (_req: Request, res: Response) => {
  res.json(tasks);
});

// GET /tasks/:id
router.get("/:id", (req: Request, res: Response) => {
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