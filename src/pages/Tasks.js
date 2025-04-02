import React, { useState } from 'react';
import { 
  FiPlus, FiSearch, FiCalendar, FiFlag, FiTrash2, 
  FiEdit2, FiCheck, FiX, FiFilter, FiClock 
} from 'react-icons/fi';
import './Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      text: 'Fix bug in API', 
      description: 'Investigate and fix the authentication issue in the API',
      priority: 'high', 
      category: 'Development',
      dueDate: '2024-03-20',
      completed: false,
      createdAt: '2024-03-15'
    },
    { 
      id: 2, 
      text: 'Update UI for dashboard', 
      description: 'Implement new design system for the main dashboard',
      priority: 'medium', 
      category: 'Design',
      dueDate: '2024-03-25',
      completed: false,
      createdAt: '2024-03-15'
    },
    { 
      id: 3, 
      text: 'Write documentation', 
      description: 'Create user guide for the new features',
      priority: 'low', 
      category: 'Documentation',
      dueDate: '2024-03-30',
      completed: false,
      createdAt: '2024-03-15'
    },
  ]);

  const [newTask, setNewTask] = useState({
    text: '',
    description: '',
    priority: 'medium',
    category: '',
    dueDate: ''
  });

  const [filter, setFilter] = useState({
    search: '',
    priority: 'all',
    category: 'all',
    status: 'all'
  });

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const categories = ['Development', 'Design', 'Documentation', 'Testing', 'Meeting'];

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.text.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          ...newTask,
          completed: false,
          createdAt: new Date().toISOString().split('T')[0]
        }
      ]);
      setNewTask({
        text: '',
        description: '',
        priority: 'medium',
        category: '',
        dueDate: ''
      });
      setIsAddingTask(false);
    }
  };

  const updateTask = (e) => {
    e.preventDefault();
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...editingTask } : task
        )
      );
      setEditingTask(null);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text.toLowerCase().includes(filter.search.toLowerCase()) ||
                         task.description.toLowerCase().includes(filter.search.toLowerCase());
    const matchesPriority = filter.priority === 'all' || task.priority === filter.priority;
    const matchesCategory = filter.category === 'all' || task.category === filter.category;
    const matchesStatus = filter.status === 'all' || 
                         (filter.status === 'completed' ? task.completed : !task.completed);
    return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
  });

  const getPriorityColor = (priority) => {
    const colors = {
      high: '#ef4444',
      medium: '#f59e0b',
      low: '#10b981'
    };
    return colors[priority] || colors.medium;
  };

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h1>📌 Task Manager</h1>
        <button 
          className="add-task-button"
          onClick={() => setIsAddingTask(true)}
        >
          <FiPlus /> New Task
        </button>
      </div>

      <div className="tasks-filters">
        <div className="search-bar">
          <FiSearch />
          <input
            type="text"
            placeholder="Search tasks..."
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
        </div>

        <div className="filter-options">
          <select
            value={filter.priority}
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          <select
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="tasks-list">
        {filteredTasks.map((task) => (
          <div 
            key={task.id} 
            className={`task-card ${task.completed ? 'completed' : ''}`}
          >
            {editingTask?.id === task.id ? (
              <form onSubmit={updateTask} className="edit-task-form">
                <input
                  type="text"
                  value={editingTask.text}
                  onChange={(e) => setEditingTask({ ...editingTask, text: e.target.value })}
                  placeholder="Task title"
                />
                <textarea
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  placeholder="Description"
                />
                <div className="form-row">
                  <select
                    value={editingTask.priority}
                    onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                  <select
                    value={editingTask.category}
                    onChange={(e) => setEditingTask({ ...editingTask, category: e.target.value })}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={editingTask.dueDate}
                    onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-button">
                    <FiCheck /> Save
                  </button>
                  <button type="button" onClick={() => setEditingTask(null)} className="cancel-button">
                    <FiX /> Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="task-header">
                  <div className="task-title">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
                    />
                    <span>{task.text}</span>
                  </div>
                  <div className="task-actions">
                    <button onClick={() => setEditingTask(task)}>
                      <FiEdit2 />
                    </button>
                    <button onClick={() => deleteTask(task.id)}>
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                <p className="task-description">{task.description}</p>
                <div className="task-footer">
                  <span className="task-category">{task.category}</span>
                  <span 
                    className="task-priority"
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                  >
                    {task.priority}
                  </span>
                  <span className="task-due-date">
                    <FiCalendar /> {task.dueDate}
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {isAddingTask && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Task</h2>
            <form onSubmit={addTask}>
              <input
                type="text"
                placeholder="Task title"
                value={newTask.text}
                onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
              <div className="form-row">
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  required
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
                <select
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="save-button">
                  <FiCheck /> Add Task
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsAddingTask(false)}
                  className="cancel-button"
                >
                  <FiX /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
