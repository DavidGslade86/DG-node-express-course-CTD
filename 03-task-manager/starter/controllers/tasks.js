const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
});

const createTask = asyncWrapper( async (req, res) => { 
    const task = await Task.create(req.body)
    res.status(201).json({task})
});

const getSingleTask = asyncWrapper( async (req, res, next) => {
    const {id: taskID} = req.params;
    const task = await Task.findOne({_id :taskID});
    if(!task) {
        return next(createCustomError(`No task with id ${taskID} was found`, 404));
    }
    res.status(200).json({ task });
});

const updateTask = asyncWrapper( async (req, res, next) => {
    const {id: taskID} = req.params;
    const {body: data} = req;
    const task = await Task.findOneAndUpdate(
        {_id :taskID},
        data, 
        {new : true, runValidators : true}
    );
    if(!task) {
        return next(createCustomError(`No task with id ${taskID} was found`, 404));
    }
    res.status(200).json({ task, data });
});

const deleteTask = asyncWrapper( async (req, res, next) => {
    const {id: taskID} = req.params;
    const task = await Task.findOneAndDelete({_id :taskID})
    if(!task) {
        return next(createCustomError(`No task with id ${taskID} was found`, 404));
    }
    res.status(200).json({ task });
});

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
}