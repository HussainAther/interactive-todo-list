// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory task list
let tasks = [];

// Route for the home page
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Route to add a task
app.post('/add', (req, res) => {
    const taskTitle = req.body.task_title;
    if (taskTitle) {
        tasks.push({ title: taskTitle, completed: false });
    }
    res.redirect('/');
});

// Route to remove a task
app.get('/remove/:id', (req, res) => {
    const taskId = req.params.id;
    if (taskId >= 0 && taskId < tasks.length) {
        tasks.splice(taskId, 1); // Remove the task by index
    }
    res.redirect('/');
});

// Route to mark a task as complete
app.get('/complete/:id', (req, res) => {
    const taskId = req.params.id;
    if (taskId >= 0 && taskId < tasks.length) {
        tasks[taskId].completed = true; // Mark the task as completed
    }
    res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

