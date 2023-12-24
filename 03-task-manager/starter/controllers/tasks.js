const Task = require('../models/Task')

const getAllTasks = (req, res) => {
    res.send('get all tasks');
};
const createTask = async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({task})
};
const getSingleTask = (req, res) => {
    res.send('get single task');
};
const updateTask = (req, res) => {
    res.send('update a task');
};
const deleteTask = (req, res) => {
    res.send('delete a task');
};

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
}