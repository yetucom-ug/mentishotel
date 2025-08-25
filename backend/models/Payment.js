const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
  guestName: String,
  roomNumber: Number,
  amount: { type: Number, required: true },
  method: { type: String, enum: ['cash', 'mobile money', 'card'], required: true },
  reference: String,
  bill: { type: mongoose.Schema.Types.ObjectId, ref: 'Bill' }, // optional
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Payment', paymentSchema);