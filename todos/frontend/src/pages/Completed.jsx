import TodoCard from "../components/TodoCard";
import todos from "../data";
function Completed() {
  const today = new Date().toDateString();
  const data = todos.filter((todo) => todo.isCompleted === true);
  return (
    <div className="p-10">
      <h1 className="text-lg font-bold">Completed Tasks</h1>
      <p className="mb-6 text-sm text-gray-600">{today}</p>

      <div className="mt-5 flex flex-wrap gap-4">
        {data.map((todos, idx) => (
          <TodoCard todo={todos} key={idx} />
        ))}
      </div>
    </div>
  );
}

export default Completed;
