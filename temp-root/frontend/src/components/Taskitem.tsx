import type { Task } from "../../../backend/src/data/Task";

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

function TaskItem({
  task,
  onDelete,
  onToggle,
}: TaskItemProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          className="h-5 w-5"
        />

        <span
          className={`font-medium ${
            task.done
              ? "text-slate-400 line-through"
              : "text-slate-800"
          }`}
        >
          {task.title}
        </span>
      </div>

      <div className="flex gap-2">
        <button className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
          Edit
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;