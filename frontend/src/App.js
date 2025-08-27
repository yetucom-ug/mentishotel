import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RestaurantMenu from "./pages/RestaurantMenu";
import Orders from "./pages/Orders";
import Billing from "./pages/Billing";
import RoomService from "./pages/RoomService";
import Payments from "./pages/Payments";
import VenueBooking from "./pages/VenueBooking";
import Housekeeping from "./pages/Housekeeping";
import Reports from "./pages/Reports";
import HotelDetails from "./pages/HotelDetails";
import Invoice from "./pages/Invoice";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/restaurant" element={<RestaurantMenu />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/roomservice" element={<RoomService />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/venue-booking" element={<VenueBooking />} />
        <Route path="/housekeeping" element={<Housekeeping />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/hotel-details" element={<HotelDetails />} />
        <Route path="/invoices" element={<Invoice />} />
      </Routes>
    </div>
  );
}

export default App;