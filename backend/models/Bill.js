const mongoose = require('mongoose');
const billSchema = new mongoose.Schema({
  guestName: String,
  roomNumber: Number,
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  roomCharges: { type: Number, default: 0 },
  venueBookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VenueBooking' }], // NEW
  venueCharges: { type: Number, default: 0 }, // NEW
  payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }],
  paid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Bill', billSchema);