import type { Task } from "../../../backend/src/data/Task";

import TaskItem from "./Taskitem";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

function TaskList({
  tasks,
  onDelete,
  onToggle,
}: TaskListProps) {
  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          My Tasks
        </h2>

        <span className="rounded-full bg-slate-200 px-3 py-1 text-sm text-slate-600">
          {tasks.length} tasks
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;