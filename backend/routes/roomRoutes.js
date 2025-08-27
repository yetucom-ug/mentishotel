const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const { auth, authorize } = require('../middleware/auth');
const { validateRoom } = require('../middleware/validation');

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const { status, type, minPrice, maxPrice } = req.query;
    let filter = {};
    
    if (status) filter.status = status;
    if (type) filter.type = new RegExp(type, 'i');
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    const rooms = await Room.find(filter).sort({ number: 1 });
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// Get room by ID
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({ error: 'Failed to fetch room' });
  }
});

// Create a room (admin/reception only)
router.post('/', auth, authorize('admin', 'reception'), validateRoom, async (req, res) => {
  try {
    const { number, type, status, price } = req.body;
    
    // Check if room number already exists
    const existingRoom = await Room.findOne({ number });
    if (existingRoom) {
      return res.status(400).json({ error: 'Room number already exists' });
    }

    const room = new Room({ number, type, status, price });
    await room.save();
    
    res.status(201).json(room);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Failed to create room' });
  }
});

// Update room
router.put('/:id', auth, authorize('admin', 'reception'), validateRoom, async (req, res) => {
  try {
    const { number, type, status, price } = req.body;
    
    // Check if room number is being changed and already exists
    if (number) {
      const existingRoom = await Room.findOne({ 
        number, 
        _id: { $ne: req.params.id } 
      });
      if (existingRoom) {
        return res.status(400).json({ error: 'Room number already exists' });
      }
    }

    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { number, type, status, price },
      { new: true, runValidators: true }
    );

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json(room);
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ error: 'Failed to update room' });
  }
});

// Delete room (admin only)
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ error: 'Failed to delete room' });
  }
});

module.exports = router;