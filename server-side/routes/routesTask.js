const {createTask, getTasks, getTask, updateTask, deleteTask} = require('../controllers/task');

const express = require('express');

const router = express.Router();

// GET all tasks
router.get('/tasks', getTasks);

// GET one task
router.get('/tasks/:id', getTask);

// POST one task
router.post('/tasks', createTask);

// update one task
router.put('/tasks/:id', updateTask);

// delete one task
router.delete('/tasks/:id', deleteTask);

module.exports = router;