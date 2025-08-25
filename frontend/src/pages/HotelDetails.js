import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Container, Typography, Paper, TextField, Button } from "@mui/material";

function HotelDetails() {
  const [details, setDetails] = useState({
    name: "", address: "", phone: "", email: "", logoUrl: "", otherInfo: ""
  });

  useEffect(() => {
    API.get("/hotel").then(res => setDetails(res.data));
  }, []);

  const handleChange = e => setDetails({ ...details, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await API.put("/hotel", details);
    alert("Hotel details updated!");
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5">Hotel Details & Customization</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Hotel Name" name="name" value={details.name || ""} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Address" name="address" value={details.address || ""} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Phone" name="phone" value={details.phone || ""} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Email" name="email" value={details.email || ""} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Logo URL" name="logoUrl" value={details.logoUrl || ""} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Other Info" name="otherInfo" value={details.otherInfo || ""} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <Button type="submit" variant="contained">Save</Button>
        </form>
      </Paper>
    </Container>
  );
}
export default HotelDetails;