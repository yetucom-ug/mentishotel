const mongoose = require('mongoose');
const hotelDetailsSchema = new mongoose.Schema({
  name: { type: String, default: "Hotel Name" },
  address: String,
  phone: String,
  email: String,
  logoUrl: String, // Store logo file URL or base64
  otherInfo: String,
});
module.exports = mongoose.model('HotelDetails', hotelDetailsSchema);