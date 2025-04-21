import { Calendar, Circle, CircleCheck, CircleCheckBig } from "lucide-react";

function TodoCard({ todo }) {
  const completedSubtask = todo.subtask.filter(
    (task) => task.isCompleted,
  ).length;
  const totalSubtask = todo.subtask.length;
  const subtaskCompletionPercent = Math.floor(
    (completedSubtask / totalSubtask) * 100,
  );
  return (
    <div className="w-72 cursor-pointer rounded-md border border-zinc-300 bg-white p-3 drop-shadow-md">
      <div className="flex items-center gap-2">
        <p className={`size-[0.4rem] rounded-full bg-red-500`}></p>
        <p className="font-semibold">{todo.title}</p>
        <button className="flex size-5 items-center justify-center rounded-full hover:bg-gray-200">
          {todo.isCompleted ? (
            <CircleCheck size={16} className="text-blue-500" />
          ) : (
            <Circle size={16} className="hover:text-blue-500" />
          )}
        </button>
      </div>
      <div className="pl-4 text-sm text-zinc-600">
        {todo.subtask.map((task, i) => (
          <p key={i}>{task.title}</p>
        ))}
      </div>
      {todo.subtask.length > 0 && (
        <>
          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="text-xs text-zinc-600">
              {todo.subtask.filter((s) => s.isCompleted).length}/
              {todo.subtask.length} subtasks
            </p>
            <p className="text-xs text-zinc-600">{subtaskCompletionPercent}%</p>
          </div>
          <progress
            value={todo.subtask.filter((s) => s.isCompleted).length}
            max={todo.subtask.length}
            className="h-2 w-full overflow-hidden rounded-full [&::-moz-progress-bar]:bg-blue-500 [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-value]:bg-blue-500"
          ></progress>
        </>
      )}
      <div className="flex gap-4">
        <p className="flex items-center gap-1.5 text-xs text-zinc-600">
          <Calendar size={14} />
          {todo.date}
        </p>
        <p className="flex items-center gap-1.5 text-xs text-zinc-600">
          <CircleCheckBig size={14} />
          {completedSubtask}/{totalSubtask}
        </p>
      </div>
    </div>
  );
}

export default TodoCard;
