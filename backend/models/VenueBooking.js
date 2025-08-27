const mongoose = require('mongoose');
const venueBookingSchema = new mongoose.Schema({
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  guestName: { type: String, required: true },
  roomNumber: Number,
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  bill: { type: mongoose.Schema.Types.ObjectId, ref: 'Bill' }, // Link to bill
  status: { type: String, enum: ['booked', 'completed', 'cancelled'], default: 'booked' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('VenueBooking', venueBookingSchema);