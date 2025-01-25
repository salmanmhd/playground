import { Trash2, CheckCircle } from 'lucide-react';

interface TodoItemProps {
  title: string;
  description: string;
  completed: boolean;
}
const TodoItem = ({ title, description, completed = false }: TodoItemProps) => {
  //   const [completed, setCompleted] = useState(initialCompleted);

  return (
    <div className='bg-gray-800 text-white rounded-lg p-4 mb-2 flex items-center space-x-4 shadow-md'>
      <button
        // onClick={() => setCompleted(!completed)}
        className='focus:outline-none'
      >
        <CheckCircle
          className={`h-6 w-6 ${
            completed ? 'text-green-500' : 'text-gray-500'
          }`}
        />
      </button>
      <div className='flex-grow'>
        <h3
          className={`text-lg font-semibold ${
            completed ? 'line-through text-gray-500' : ''
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm ${completed ? 'text-gray-600' : 'text-gray-400'}`}
        >
          {description}
        </p>
      </div>
      <button className='text-red-500 hover:text-red-600 focus:outline-none'>
        <Trash2 className='h-5 w-5' />
      </button>
    </div>
  );
};

export default TodoItem;
