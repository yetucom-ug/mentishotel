import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="sticky" color="primary" elevation={2}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mentis Hotel
        </Typography>
        <Button color="inherit" component={NavLink} to="/" sx={{ mx: 1 }}>Dashboard</Button>
        <Button color="inherit" component={NavLink} to="/rooms" sx={{ mx: 1 }}>Rooms</Button>
        <Button color="inherit" component={NavLink} to="/login" sx={{ mx: 1 }}>Login</Button>
		<Button color="inherit" component={NavLink} to="/restaurant">Restaurant</Button>
        <Button color="inherit" component={NavLink} to="/orders">Orders</Button>
        <Button color="inherit" component={NavLink} to="/billing">Billing</Button>
		<Button color="inherit" component={NavLink} to="/roomservice">Room Service</Button>
        <Button color="inherit" component={NavLink} to="/payments">Payments</Button>
		<Button color="inherit" component={NavLink} to="/venue-booking">Venue Booking</Button>
		<Button color="inherit" component={NavLink} to="/venue-booking">Venue Booking</Button>
        <Button color="inherit" component={NavLink} to="/housekeeping">Housekeeping</Button>
        <Button color="inherit" component={NavLink} to="/reports">Reports</Button>
		<Button color="inherit" component={NavLink} to="/hotel-details">Hotel Details</Button>
		<Button color="inherit" component={NavLink} to="/invoices">Invoices</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;