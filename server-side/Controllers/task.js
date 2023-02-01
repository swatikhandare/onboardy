const {Task} = require('../Models/models.js');

const createTask = async (req, res) => {
    const task = new Task({
        ...req.body
    });
    
    try {
        const savedTask = await task.save();
        res.status(201).send(savedTask);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
    }

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const getTask = async (req, res) => {

    const {id} = req.params;

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).send({ error: "task not found" });
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const updateTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByIdAndUpdate(id, req.body, {
          new: true
        });
        if (!task) {
          return res.status(404).send({ error: "task not found" });
        }
        res.status(200).send(task);
      } catch (error) {
        res.status(400).send({ error: error.message });
      }
    };

const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).send({ error: "task not found" });
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
}