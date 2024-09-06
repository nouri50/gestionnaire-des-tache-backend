const Task = require('../models/taskModel');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.id } });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
};

exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTask = await Task.create({ title, description, userId: req.user.id });
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create task' });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        const task = await Task.findByPk(id);
        if (task.userId !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update task' });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id);
        if (task.userId !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        await task.destroy();
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
};
