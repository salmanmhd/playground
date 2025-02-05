import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';

// const todoList = [
//   {
//     id: 1,
//     title: 'todo one',
//     description: 'thisis description',
//     completed: false,
//   },
//   {
//     id: 1,
//     title: 'todo one',
//     description: 'thisis description',
//     completed: false,
//   },
//   {
//     id: 1,
//     title: 'todo one',
//     description: 'thisis description',
//     completed: false,
//   },
// ];
const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  console.log(BASE_URL);

  const handleAddTodo = () => {
    if (title.trim()) {
      const newTodo = {
        id: Date.now(),
        title,
        description,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTitle('');
      setDescription('');
    }
  };

  useEffect(() => {
    async function fetchTodos() {
      const res = await fetch(`${BASE_URL}/todo/6`);
      const data = await res.json();
      console.log(data);
    }

    fetchTodos();
  }, []);

  return (
    <div className='max-w-md mx-auto mt-10 drop-shadow-2xl p-6 bg-gray-900 rounded-lg'>
      <h1 className='text-2xl font-bold text-white mb-6'>Todo List</h1>

      <div className='mb-4'>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Todo Title'
          className='w-full p-2 mb-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Todo Description'
          className='w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button
          onClick={handleAddTodo}
          className='w-full mt-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
        >
          Add Todo
        </button>
      </div>

      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            title={todo.title}
            description={todo.description}
            completed={todo.completed}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
