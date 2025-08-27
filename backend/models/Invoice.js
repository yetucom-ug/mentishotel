const mongoose = require('mongoose');
const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  customerName: String,
  customerContact: String,
  items: [{
    description: String,
    quantity: Number,
    unitPrice: Number,
    total: Number
  }],
  totalAmount: Number,
  issuedAt: { type: Date, default: Date.now },
  paid: { type: Boolean, default: false }
});
module.exports = mongoose.model('Invoice', invoiceSchema);