import React from 'react';

const PriorityMatrix = ({ tasks, updateTaskPriority }) => {
  const priorities = [
    { label: 'Urgent & Important', value: 'high' },
    { label: 'Important but Not Urgent', value: 'medium' },
    { label: 'Urgent but Not Important', value: 'medium' },
    { label: 'Not Urgent & Not Important', value: 'low' },
  ];

  return (
    <div className='grid grid-cols-2 gap-4 mb-4'>
      {priorities.map((priority, index) => (
        <div key={index} className='border p-4 dark:border-gray-700'>
          <h2 className='text-xl font-bold mb-2'>{priority.label}</h2>
          <ul>
            {tasks
              .filter((task) => task.priority === priority.value)
              .map((task) => (
                <li
                  key={task.id}
                  className='flex justify-between items-center mb-2'
                >
                  <span>{task.text}</span>
                  <select
                    value={task.priority}
                    onChange={(e) =>
                      updateTaskPriority(task.id, e.target.value)
                    }
                    className='border p-2 dark:bg-gray-800 dark:border-gray-700'
                  >
                    {priorities.map((p, i) => (
                      <option key={i} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PriorityMatrix;
