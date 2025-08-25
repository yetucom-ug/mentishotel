const mongoose = require('mongoose');
const roomServiceSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true },
  guestName: String,
  request: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('RoomService', roomServiceSchema);