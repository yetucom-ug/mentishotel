const express = require('express');
const router = express.Router();
const HousekeepingTask = require('../models/HousekeepingTask');
const Room = require('../models/Room');

// Create a task
router.post('/', async (req, res) => {
  const task = new HousekeepingTask(req.body);
  await task.save();
  res.status(201).json(task);
});

// List all tasks
router.get('/', async (req, res) => {
  const tasks = await HousekeepingTask.find();
  res.json(tasks);
});

// Update task status
router.patch('/:id', async (req, res) => {
  const { status, assignedTo, notes } = req.body;
  const update = { status };
  if (status === 'completed') update.completedAt = new Date();
  if (assignedTo) update.assignedTo = assignedTo;
  if (notes) update.notes = notes;
  const task = await HousekeepingTask.findByIdAndUpdate(req.params.id, update, { new: true });

  // Optionally update room status based on housekeeping
  if (status === 'completed') {
    await Room.findOneAndUpdate({ number: task.roomNumber }, { status: 'available' });
  } else if (status === 'in-progress') {
    await Room.findOneAndUpdate({ number: task.roomNumber }, { status: 'maintenance' });
  }
  res.json(task);
});

module.exports = router;