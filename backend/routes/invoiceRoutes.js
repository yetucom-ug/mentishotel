const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// Create invoice
router.post('/', async (req, res) => {
  const data = req.body;
  // Auto-generate invoice number (simple example)
  data.invoiceNumber = "INV" + Date.now();
  data.totalAmount = (data.items || []).reduce((sum, i) => sum + (i.total || 0), 0);
  const invoice = new Invoice(data);
  await invoice.save();
  res.status(201).json(invoice);
});

// List all invoices
router.get('/', async (req, res) => {
  const invoices = await Invoice.find();
  res.json(invoices);
});

// Get invoice by ID
router.get('/:id', async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);
  res.json(invoice);
});

// Mark as paid
router.patch('/:id/pay', async (req, res) => {
  const invoice = await Invoice.findByIdAndUpdate(req.params.id, { paid: true }, { new: true });
  res.json(invoice);
});

module.exports = router;