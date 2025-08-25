const mongoose = require('mongoose');
const housekeepingTaskSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true },
  assignedTo: String, // staff member
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  notes: String,
  createdAt: { type: Date, default: Date.now },
  completedAt: Date
});
module.exports = mongoose.model('HousekeepingTask', housekeepingTaskSchema);