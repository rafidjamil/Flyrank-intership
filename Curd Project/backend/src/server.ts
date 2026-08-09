import express, { type Request, type Response } from "express";
import cors from "cors";
import taskRoutes from "./routes/TaskRoutes";

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
  });
});

app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
  });
});

app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});