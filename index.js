const express = require("express");

const app = express();

// Middleware
app.use(express.json());

const PORT = 3000;

// In-memory tasks
let tasks = [
  {
    id: 1,
    title: "Learn Express",
    done: false,
  },
  {
    id: 2,
    title: "Build CRUD API",
    done: false,
  },
  {
    id: 3,
    title: "Push project to GitHub",
    done: true,
  },
];

// Root Endpoint
app.get("/", (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
  });
});

// Health Endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// Get single task by ID
app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      error: `Task ${id} not found`,
    });
  }

  res.status(200).json(task);
});

// Create a new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  // Validation
  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "Title is required",
    });
  }

  // Create new task
  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title: title,
    done: false,
  };

  // Add task to array
  tasks.push(newTask);

  // Return created task
  res.status(201).json(newTask);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});