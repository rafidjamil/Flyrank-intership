import { useState } from "react";
import TaskForm from "./components/Taskform";
import TaskList from "./components/Tasklist";
import type { Task } from "../../backend/src/data/Task";


function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Learn React",
      done: false,
    },
    {
      id: 2,
      title: "Learn Node.js",
      done: true,
    },
    {
      id: 3,
      title: "Build my first API",
      done: false,
    },
  ]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      done: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <h1 className="text-3xl font-bold text-slate-900">Task Manager</h1>
          <p className="mt-1 text-slate-500">Manage your daily tasks</p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <TaskForm onAddTask={addTask} />
        </div>

        <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
      </main>
    </div>
  );
}

export default App;