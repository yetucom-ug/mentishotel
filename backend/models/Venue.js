const mongoose = require('mongoose');
const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  description: String,
  pricePerHour: { type: Number, required: true }
});
module.exports = mongoose.model('Venue', venueSchema);