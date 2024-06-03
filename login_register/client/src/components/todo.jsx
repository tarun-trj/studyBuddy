import React, { useState } from "react";
import Sidebar from "./sidebar.jsx";
import '../styles/styles.css';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (!input) return; // Prevent adding empty tasks
    const newTask = { id: Date.now(), text: input, completed: false };
    setTasks([...tasks, newTask]);
    setInput(""); // Clear input field
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filter tasks into two different lists based on completion status
  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <h2>Todo List</h2>
        <input
          type="text"
          className="form-control mb-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={handleAddTask} className="btn btn-primary mb-3">
          Add Task
        </button>

        <h3>Active Tasks</h3>
        <ul className="list-group">
          {activeTasks.map((task) => (
            <li key={task.id} className="list-group-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
                className="me-2"
              />
              {task.text}
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="btn btn-danger btn-sm float-end"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <h3>Completed Tasks</h3>
        <ul className="list-group">
          {completedTasks.map((task) => (
            <li key={task.id} className="list-group-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
                className="me-2"
              />
              {task.text}
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="btn btn-danger btn-sm float-end"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
