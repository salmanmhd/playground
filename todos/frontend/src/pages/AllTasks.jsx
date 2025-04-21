import { ArrowDownWideNarrow, ChevronDown, Funnel, Plus } from "lucide-react";
import todos from "../data";
import TodoCard from "../components/TodoCard";
function AllTasks() {
  return (
    <div className="h-screen bg-gray-50 px-4 pt-8">
      <div className="mb-4 flex justify-between">
        <h1 className="text-lg font-bold">
          All Tasks{" "}
          <span className="text-md font-normal text-gray-500">
            ({todos.length})
          </span>
        </h1>
        <div className="flex h-8 items-center gap-2">
          <button className="flex h-8 items-center rounded-md bg-blue-500 px-4 py-2 text-white">
            {<Plus className="mr-2 size-5" />} New Task
          </button>
          <button className="flex h-8 items-center gap-2 rounded-md border border-zinc-300 px-3">
            <Funnel size={16} />
            Filters
            <ChevronDown size={14} />
          </button>
          <button className="flex h-8 items-center gap-2 rounded-md border border-zinc-300 px-4">
            <ArrowDownWideNarrow size={16} />
            Sort
            <ChevronDown size={14} />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 pl-10">
        {todos.map((todo) => (
          <TodoCard todo={todo} key={todo.id} />
        ))}
      </div>
    </div>
  );
}

export default AllTasks;
