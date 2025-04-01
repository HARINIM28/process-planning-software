import React, { useState } from 'react';
import './Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Fix bug in API', priority: 'High', completed: false },
    { id: 2, text: 'Update UI for dashboard', priority: 'Medium', completed: false },
    { id: 3, text: 'Write documentation', priority: 'Low', completed: false },
  ]);

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="tasks-container">
      <h2>📌 Task Manager</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span>{task.text} ({task.priority})</span>
            <button onClick={() => toggleComplete(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
