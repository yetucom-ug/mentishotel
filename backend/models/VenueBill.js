const mongoose = require('mongoose');
const venueBillSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'VenueBooking', required: true },
  amount: { type: Number, required: true },
  payments: [{ 
    method: { type: String, enum: ['cash', 'mobile money', 'card'], required: true },
    amount: { type: Number, required: true },
    reference: String,
    paidAt: { type: Date, default: Date.now }
  }],
  paid: { type: Boolean, default: false }
});
module.exports = mongoose.model('VenueBill', venueBillSchema);