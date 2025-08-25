const express = require('express');
const router = express.Router();
const HotelDetails = require('../models/HotelDetails');

// Get hotel details
router.get('/', async (req, res) => {
  let details = await HotelDetails.findOne();
  if (!details) {
    details = new HotelDetails();
    await details.save();
  }
  res.json(details);
});

// Update hotel details
router.put('/', async (req, res) => {
  let details = await HotelDetails.findOne();
  if (!details) {
    details = new HotelDetails(req.body);
  } else {
    Object.assign(details, req.body);
  }
  await details.save();
  res.json(details);
});
module.exports = router;