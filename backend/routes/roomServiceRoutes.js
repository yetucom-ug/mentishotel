const express = require('express');
const router = express.Router();
const RoomService = require('../models/RoomService');

// Submit a room service request
router.post('/', async (req, res) => {
  const service = new RoomService(req.body);
  await service.save();
  res.status(201).json(service);
});

// List all service requests
router.get('/', async (req, res) => {
  const list = await RoomService.find();
  res.json(list);
});

// Update status
router.patch('/:id', async (req, res) => {
  const service = await RoomService.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(service);
});

module.exports = router;