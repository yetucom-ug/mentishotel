import React, { useEffect, useState } from "react";
import API from "../services/api";
import {
  Container, Typography, Paper, TextField, Button, MenuItem,
  Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";

function VenueBooking() {
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    venueId: "", customerName: "", contact: "", startTime: "", endTime: ""
  });
  const [billDialog, setBillDialog] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [bill, setBill] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    amount: "", method: "cash", reference: ""
  });

  useEffect(() => {
    API.get("/venues").then(res => setVenues(res.data));
    API.get("/venues/bookings").then(res => setBookings(res.data));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await API.post("/venues/book", form);
    setForm({ venueId: "", customerName: "", contact: "", startTime: "", endTime: "" });
    API.get("/venues/bookings").then(res => setBookings(res.data));
  };

  const handleBill = async bookingId => {
    const res = await API.get(`/venues/bill/${bookingId}`);
    setBill(res.data);
    setPaymentForm({ amount: res.data.amount, method: "cash", reference: "" });
    setSelectedBookingId(bookingId);
    setBillDialog(true);
  };

  const handlePayment = async () => {
    await API.post(`/venues/bill/${selectedBookingId}/pay`, paymentForm);
    setBillDialog(false);
    API.get("/venues/bookings").then(res => setBookings(res.data));
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom>Venue Hiring / Booking</Typography>
        <form onSubmit={handleSubmit}>
          <TextField select label="Venue" name="venueId" value={form.venueId}
            onChange={handleChange} required sx={{ mr: 2, width: 200 }}>
            {venues.map(v => (
              <MenuItem value={v._id} key={v._id}>
                {v.name} (Capacity: {v.capacity}) - ${v.pricePerHour}/hr
              </MenuItem>
            ))}
          </TextField>
          <TextField label="Customer Name" name="customerName" value={form.customerName}
            onChange={handleChange} required sx={{ mr: 2 }} />
          <TextField label="Contact" name="contact" value={form.contact}
            onChange={handleChange} sx={{ mr: 2 }} />
          <TextField type="datetime-local" label="Start Time" name="startTime" value={form.startTime}
            onChange={handleChange} required sx={{ mr: 2, width: 220 }} InputLabelProps={{ shrink: true }} />
          <TextField type="datetime-local" label="End Time" name="endTime" value={form.endTime}
            onChange={handleChange} required sx={{ mr: 2, width: 220 }} InputLabelProps={{ shrink: true }} />
          <Button type="submit" variant="contained">Book Venue</Button>
        </form>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Venue Bookings</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Venue</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Bill/Pay</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map(bk => (
              <TableRow key={bk._id}>
                <TableCell>{bk.venue?.name}</TableCell>
                <TableCell>{bk.customerName}</TableCell>
                <TableCell>{bk.contact}</TableCell>
                <TableCell>{new Date(bk.startTime).toLocaleString()}</TableCell>
                <TableCell>{new Date(bk.endTime).toLocaleString()}</TableCell>
                <TableCell>${bk.totalAmount}</TableCell>
                <TableCell>{bk.paid ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button size="small" variant="outlined" onClick={() => handleBill(bk._id)}>
                    View Bill / Pay
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog open={billDialog} onClose={() => setBillDialog(false)}>
        <DialogTitle>Venue Bill</DialogTitle>
        <DialogContent>
          {bill && (
            <>
              <Typography>
                Amount Due: <b>${bill.amount}</b>
              </Typography>
              {bill.payments.length > 0 && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Previous payments:
                  {bill.payments.map((p, idx) => (
                    <div key={idx}>- {p.method}: ${p.amount} {p.reference && "(Ref: " + p.reference + ")"}</div>
                  ))}
                </Typography>
              )}
              <TextField
                label="Amount"
                name="amount"
                value={paymentForm.amount}
                onChange={e => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                fullWidth margin="normal"
              />
              <TextField
                select label="Payment Method" name="method"
                value={paymentForm.method}
                onChange={e => setPaymentForm({ ...paymentForm, method: e.target.value })}
                fullWidth margin="normal"
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="mobile money">Mobile Money</MenuItem>
                <MenuItem value="card">Card</MenuItem>
              </TextField>
              <TextField
                label="Reference"
                name="reference"
                value={paymentForm.reference}
                onChange={e => setPaymentForm({ ...paymentForm, reference: e.target.value })}
                fullWidth margin="normal"
                helperText="Transaction ID for Mobile Money/Card"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBillDialog(false)}>Cancel</Button>
          <Button onClick={handlePayment} variant="contained">Pay</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
export default VenueBooking;