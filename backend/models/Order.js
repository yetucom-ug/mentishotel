const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  guestName: String,
  roomNumber: Number,
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
      quantity: { type: Number, default: 1 }
    }
  ],
  status: { type: String, enum: ['pending', 'served', 'paid'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', orderSchema);