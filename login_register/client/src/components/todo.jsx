import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar.jsx";
import '../styles/styles.css';
import axios from 'axios';
import Stopwatch from "./stopwatch.jsx";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3002/tasks', {
          headers: {
            'User-Email': user.email,
          },
        });
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!input) return; // Prevent adding empty tasks
    const newTask = { description: input, completed: false, email: user.email };

    try {
      const response = await fetch('http://127.0.0.1:3002/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      const result = await response.json();
      if (response.ok) {
        setTasks([...tasks, result.task]);
        setInput(""); // Clear input field
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:3002/tasks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== id));
      } else {
        const result = await response.json();
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleTask = async (id) => {
    const task = tasks.find((task) => task._id === id);
    console.log(tasks);
    if (!task) return;

    try {
      const response = await fetch(`http://127.0.0.1:3002/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !task.completed }),
      });

      if (response.ok) {
        setTasks(
          tasks.map((task) =>
            task._id === id ? { ...task, completed: !task.completed } : task
          )
        );
      } else {
        const result = await response.json();
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="home-container">
      <Sidebar />
      <Stopwatch />
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

        <h3>Tasks</h3>
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task._id} className="list-group-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task._id)}
                className="me-2"
              />
              {task.description}
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="btn btn-danger btn-sm float-end"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {/* <h3>Completed Tasks</h3>
        <ul className="list-group">
          {completedTasks.map((task) => (
            <li key={task._id} className="list-group-item">
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
        </ul> */}
      </div>
      <button onClick={() => console.log(tasks)}>chec</button>
    </div>
  );
}

export default Todo;
