const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// Record a payment
router.post('/', async (req, res) => {
  const payment = new Payment(req.body);
  await payment.save();
  res.status(201).json(payment);
});

// List all payments
router.get('/', async (req, res) => {
  const payments = await Payment.find();
  res.json(payments);
});

module.exports = router;