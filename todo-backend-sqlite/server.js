const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

// Helper function: SQLite me boolean 0/1 hota hai, usko true/false me convert karne ke liye
const formatTask = (task) => {
  if (!task) return null;
  return { ...task, done: Boolean(task.done) };
};

// ==========================================
// STAGE 1: READ ENDPOINTS (GET)
// ==========================================

// GET /tasks - Sare tasks read karo
app.get('/tasks', (req, res) => {
  const tasks = db.prepare('SELECT * FROM tasks').all();
  res.json(tasks.map(formatTask));
});

// GET /tasks/:id - Specific task padho
app.get('/tasks/:id', (req, res) => {
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(formatTask(task));
});

// ==========================================
// STAGE 2: CREATE ENDPOINT (POST)
// ==========================================

// POST /tasks - Naya task banao
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const result = db.prepare('INSERT INTO tasks (title, done) VALUES (?, 0)').run(title.trim());
  const newTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);
  
  res.status(201).json(formatTask(newTask));
});

// ==========================================
// STAGE 3: UPDATE & DELETE ENDPOINTS
// ==========================================

// PUT /tasks/:id - Task update karo
app.put('/tasks/:id', (req, res) => {
  const { title, done } = req.body;
  const existingTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);

  if (!existingTask) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const newTitle = title !== undefined ? title : existingTask.title;
  const newDone = done !== undefined ? (done ? 1 : 0) : existingTask.done;

  db.prepare('UPDATE tasks SET title = ?, done = ? WHERE id = ?').run(newTitle, newDone, req.params.id);
  
  const updatedTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
  res.json(formatTask(updatedTask));
});

// DELETE /tasks/:id - Task delete karo
app.delete('/tasks/:id', (req, res) => {
  const existingTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);

  if (!existingTask) {
    return res.status(404).json({ error: 'Task not found' });
  }

  db.prepare('DELETE FROM tasks WHERE id = ?').run(req.params.id);
  res.status(200).json({ message: 'Task deleted successfully' });
});

// Server Start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});