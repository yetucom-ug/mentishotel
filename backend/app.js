const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' });

const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const billingRoutes = require('./routes/billingRoutes');
const roomServiceRoutes = require('./routes/roomServiceRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const venueRoutes = require('./routes/venueRoutes');
const housekeepingRoutes = require('./routes/housekeepingRoutes');
const hotelDetailsRoutes = require('./routes/hotelDetailsRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

import RestaurantMenu from "./pages/RestaurantMenu";
import Orders from "./pages/Orders";
import Billing from "./pages/Billing";
import RoomService from "./pages/RoomService";
import Payments from "./pages/Payments";
import VenueBooking from "./pages/VenueBooking";
import VenueBooking from "./pages/VenueBooking";
import Housekeeping from "./pages/Housekeeping";
import Reports from "./pages/Reports";
import HotelDetails from "./pages/HotelDetails";
import Invoice from "./pages/Invoice";



// ... inside <Routes>
<Route path="/restaurant" element={<RestaurantMenu />} />
<Route path="/orders" element={<Orders />} />
<Route path="/billing" element={<Billing />} />
<Route path="/roomservice" element={<RoomService />} />
<Route path="/payments" element={<Payments />} />
<Route path="/venue-booking" element={<VenueBooking />} />
<Route path="/venue-booking" element={<VenueBooking />} />
<Route path="/housekeeping" element={<Housekeeping />} />
<Route path="/reports" element={<Reports />} />
<Route path="/hotel-details" element={<HotelDetails />} />
<Route path="/invoices" element={<Invoice />} />

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo connected'))
  .catch(err => { console.error(err); process.exit(1); });

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/roomservice', roomServiceRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/housekeeping', housekeepingRoutes);
app.use('/api/hotel', hotelDetailsRoutes);
app.use('/api/invoices', invoiceRoutes);

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Error middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(process.env.PORT || 5000, () => console.log('Server running'));