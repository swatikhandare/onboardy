const {createAssignedTask,getAssignedTasks,getAssignedTask,updateAssignedTask,deleteAssignedTask}=require('../controllers/assignedTask');

const express=require('express');

const router=express.Router();

// GET all assignedTasks
router.get('/assignedTasks',getAssignedTasks);

// GET one assignedTask
router.get('/assignedTasks/:id',getAssignedTask);

// POST one assignedTask
router.post('/assignedTasks',createAssignedTask);

// update one assignedTask
router.put('/assignedTasks/:id',updateAssignedTask);

// delete one assignedTask
router.delete('/assignedTasks/:id',deleteAssignedTask);

module.exports=router;