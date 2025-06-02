import { ArrowDownWideNarrow, ChevronDown, Funnel, Plus } from "lucide-react";
import TodoCard from "../components/TodoCard";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
function ListTodos() {
  const { todos } = useSelector((state) => state.todo);
  const { list } = useSelector((state) => state.category);
  const { id } = useParams();
  const listName = list.find((el) => el.id === id)?.title;
  const capitalizedName = listName.charAt(0).toUpperCase() + listName.slice(1);
  const filteredTodo = todos.filter(
    (todo) => todo.list.toLowerCase() === listName.toLowerCase(),
  );
  return (
    <div className="h-screen bg-gray-50 px-4 pt-8">
      <div className="mb-4 flex justify-between">
        <h1 className="text-lg font-bold">
          {capitalizedName}{" "}
          <span className="text-md font-normal text-gray-500">
            ({filteredTodo.length})
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
      {filteredTodo.length > 0 ? (
        <div className="flex flex-wrap gap-4 pl-10">
          {filteredTodo.map((todo) => (
            <TodoCard todo={todo} key={todo.id} />
          ))}
        </div>
      ) : (
        <div className="mt-20 text-center">
          <h3 className="mb-2 text-lg font-semibold">No tasks found</h3>
          <p>Create your first task to get started.</p>
        </div>
      )}
    </div>
  );
}

export default ListTodos;
