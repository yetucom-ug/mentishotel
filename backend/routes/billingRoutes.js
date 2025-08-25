const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');
const Order = require('../models/Order');
const Payment = require('../models/Payment');

// Create a bill
router.post('/', async (req, res) => {
  const bill = new Bill(req.body);
  await bill.save();
  res.status(201).json(bill);
});

// Get all bills
router.get('/', async (req, res) => {
  const bills = await Bill.find()
    .populate({
      path: 'orders',
      populate: { path: 'items.menuItem' }
    })
    .populate('payments');
  res.json(bills);
});

// Mark bill as paid and link payment
router.patch('/:id/pay', async (req, res) => {
  // Expecting { paymentId } in body
  const { paymentId } = req.body;
  const bill = await Bill.findById(req.params.id);
  if (!bill) return res.status(404).json({ error: "Bill not found" });

  if (paymentId) {
    bill.payments.push(paymentId);
  }
  bill.paid = true;
  await bill.save();

  // Mark all linked orders as "paid"
  await Order.updateMany(
    { _id: { $in: bill.orders } },
    { $set: { status: "paid" } }
  );

  const updated = await Bill.findById(bill._id)
    .populate({
      path: 'orders',
      populate: { path: 'items.menuItem' }
    })
    .populate('payments');
  res.json(updated);
});

module.exports = router;