import TodoCard from "../components/TodoCard";
import todos from "../data";
function Today() {
  const today = new Date();
  const data = todos.filter(
    (todo) => todo.date === today.toISOString().split("T")[0],
  );
  return (
    <div className="p-10">
      <h1 className="text-lg font-bold">Today's Tasks</h1>
      <p className="mb-6 text-sm text-gray-600">{today.toDateString()}</p>
      <h1 className="text-lg font-bold">
        All Tasks{" "}
        <span className="text-md font-normal text-gray-500">
          ({data.length})
        </span>
      </h1>
      <div className="mt-5 flex flex-wrap gap-4 pl-10">
        {data.map((todos, idx) => (
          <TodoCard todo={todos} key={idx} />
        ))}
      </div>
    </div>
  );
}

export default Today;
