import React, { useState, useEffect } from 'react';
import PriorityMatrix from './PriorityMatrix';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const task = {
        id: Date.now(),
        text: newTask,
        dueDate,
        priority: 'medium',
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setDueDate('');
    }
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditingTask(taskToEdit);
    setNewTask(taskToEdit.text);
    setDueDate(taskToEdit.dueDate);
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask.id ? { ...task, text: newTask, dueDate } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setNewTask('');
    setDueDate('');
  };

  const updateTaskPriority = (id, priority) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, priority } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className='container mx-auto p-4 dark:bg-gray-900 dark:text-white'>
      <h1 className='text-2xl font-bold mb-4'>Task Manager</h1>
      <div className='mb-4'>
        <input
          type='text'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className='border p-2 mr-2 dark:bg-gray-800 dark:border-gray-700'
          placeholder='Add a new task'
        />
        <input
          type='date'
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className='border p-2 mr-2 dark:bg-gray-800 dark:border-gray-700'
        />
        <button
          onClick={editingTask ? updateTask : addTask}
          className='bg-blue-500 text-white p-2'
        >
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <PriorityMatrix tasks={tasks} updateTaskPriority={updateTaskPriority} />
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className='flex justify-between items-center mb-2'>
            <div>
              <span>{task.text}</span>
              {task.dueDate && (
                <span className='ml-2 text-gray-500'>
                  ({new Date(task.dueDate).toDateString()})
                </span>
              )}
            </div>
            <div>
              <button
                onClick={() => editTask(task.id)}
                className='bg-yellow-500 text-white p-2 mr-2'
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className='bg-red-500 text-white p-2'
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
