const {createStudent, getStudents, getStudent, updateStudent, deleteStudent} = require('../controllers/student');

const express = require('express');

const router = express.Router();

// GET all students
router.get('/students', getStudents);

// GET one student
router.get('/students/:id', getStudent);

// POST one student
router.post('/students', createStudent);

// update one student
router.put('/students/:id', updateStudent);

// delete one student
router.delete('/students/:id', deleteStudent);

module.exports = router;