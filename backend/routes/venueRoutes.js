const express = require('express');
const router = express.Router();
const Venue = require('../models/Venue');
const VenueBooking = require('../models/VenueBooking');
const VenueBill = require('../models/VenueBill');

// Get all venues
router.get('/', async (req, res) => {
  const venues = await Venue.find();
  res.json(venues);
});

// Add a new venue
router.post('/', async (req, res) => {
  const venue = new Venue(req.body);
  await venue.save();
  res.status(201).json(venue);
});

// Book a venue (creates independent booking)
router.post('/book', async (req, res) => {
  const { venueId, customerName, contact, startTime, endTime } = req.body;
  const venue = await Venue.findById(venueId);
  if (!venue) return res.status(404).json({ error: "Venue not found" });
  const start = new Date(startTime);
  const end = new Date(endTime);
  const hours = Math.ceil((end - start) / (1000 * 60 * 60));
  const totalAmount = hours * venue.pricePerHour;

  const booking = new VenueBooking({
    venue: venueId,
    customerName,
    contact,
    startTime,
    endTime,
    totalAmount
  });
  await booking.save();

  // Create separate bill for this booking
  const bill = new VenueBill({
    booking: booking._id,
    amount: totalAmount,
    payments: [],
    paid: false
  });
  await bill.save();

  res.status(201).json({ booking, bill });
});

// Get all bookings
router.get('/bookings', async (req, res) => {
  const bookings = await VenueBooking.find().populate('venue');
  res.json(bookings);
});

// Get bill for a booking
router.get('/bill/:bookingId', async (req, res) => {
  const bill = await VenueBill.findOne({ booking: req.params.bookingId }).populate('booking');
  res.json(bill);
});

// Pay a bill
router.post('/bill/:bookingId/pay', async (req, res) => {
  const { amount, method, reference } = req.body;
  const bill = await VenueBill.findOne({ booking: req.params.bookingId });
  if (!bill) return res.status(404).json({ error: "Bill not found" });
  bill.payments.push({ amount, method, reference });
  // Sum all payments
  const totalPaid = bill.payments.reduce((s, p) => s + p.amount, 0);
  if (totalPaid >= bill.amount) bill.paid = true;
  await bill.save();

  // Mark booking as paid if bill is paid
  if (bill.paid) {
    await VenueBooking.findByIdAndUpdate(bill.booking, { paid: true });
  }

  res.json(bill);
});

module.exports = router;