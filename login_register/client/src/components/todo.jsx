import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar.jsx";
import "../styles/styles.css";
import axios from "axios";
import Stopwatch from "./stopwatch.jsx"; // Import the Stopwatch component

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));

  const styles = {
    button: {

    },
    form: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
    },
    input: {
      width: "300px",
      maxWidth: "40vw",
      padding: "5px",
      borderRadius: "5px",
      border: "2px solid #999",
      paddingLeft: "10px",
    },
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3002/tasks", {
          headers: {
            "User-Email": user.email,
          },
        });
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [user.email]);

  const handleAddTask = async () => {
    if (!input.trim()) return; // Prevent adding empty or whitespace tasks
    const newTask = {
      description: input.trim(),
      completed: false,
      email: user.email,
    };

    try {
      const response = await fetch("http://127.0.0.1:3002/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      const result = await response.json();
      if (response.ok) {
        setTasks([...tasks, result.task]);
        setInput("");
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
        method: "DELETE",
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
    if (!task) return;

    try {
      const response = await fetch(`http://127.0.0.1:3002/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
        <div className="main-content">
          <h1 className="welcome">Study Session</h1>
          <h2 className="welcome">Todo:</h2>
            <form onSubmit={handleAddTask} className="add-task" style={styles.form}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a task"
              className="add-task"
              style={styles.input}
            />
            <button type="submit" className="add-task" style={styles.button}>
              Add Task
            </button>
          </form>

          <h3 className="welcome">Tasks</h3>
          {tasks.length === 0 ? (
            <p>No tasks found. Add a task above!</p>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className="task-card">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task._id)}
                  className="me-2"
                />
                <p
                  className={`task-description ${
                    task.completed ? "completed" : ""
                  }`}
                >
                  {task.description}
                </p>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
        <div className="stopwatch-container">
        <Stopwatch />
      </div>
      </div>
  );
}

export default Todo;
