const {createStaff, getStaffs, getStaff, updateStaff, deleteStaff} = require('../controllers/staff');

const express = require('express');

const router = express.Router();

// GET all staff
router.get('/staff', getStaffs);

// GET one staff
router.get('/staff/:id', getStaff);

// POST one staff
router.post('/staff', createStaff);

// update one staff
router.put('/staff/:id', updateStaff);

// delete one staff
router.delete('/staff/:id', deleteStaff);

module.exports = router;

