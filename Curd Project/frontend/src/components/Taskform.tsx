import { useState } from "react";

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    onAddTask(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-slate-900">
        Add a new task
      </h2>

      <div className="mt-4 flex gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="What do you need to do?"
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
        />

        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-700"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;