const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');

// Get menu
router.get('/menu', async (req, res) => {
  const menu = await MenuItem.find();
  res.json(menu);
});

// Add menu item
router.post('/menu', async (req, res) => {
  const item = new MenuItem(req.body);
  await item.save();
  res.status(201).json(item);
});

// Place an order
router.post('/order', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).json(order);
});

// List all orders
router.get('/orders', async (req, res) => {
  const orders = await Order.find().populate('items.menuItem');
  res.json(orders);
});

// Update order status
router.patch('/order/:id', async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(order);
});

module.exports = router;