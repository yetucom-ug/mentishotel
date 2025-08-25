import React, { useState, useEffect } from "react";
import API from "../services/api";
import { Container, Typography, Paper, TextField, Button, MenuItem, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

function Payments() {
  const [form, setForm] = useState({ guestName: "", roomNumber: "", amount: "", method: "cash", reference: "" });
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPayments = () => {
    setLoading(true);
    API.get("/payments").then(res => {
      setPayments(res.data);
      setLoading(false);
    });
  };

  useEffect(() => { fetchPayments(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await API.post("/payments", form);
    setForm({ guestName: "", roomNumber: "", amount: "", method: "cash", reference: "" });
    fetchPayments();
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom>Record Payment</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Guest Name" name="guestName" value={form.guestName} onChange={handleChange} required sx={{ mr: 2 }} />
          <TextField label="Room Number" name="roomNumber" value={form.roomNumber} onChange={handleChange} sx={{ mr: 2 }} />
          <TextField label="Amount" name="amount" value={form.amount} onChange={handleChange} required sx={{ mr: 2 }} type="number" />
          <TextField
            select
            label="Payment Method"
            name="method"
            value={form.method}
            onChange={handleChange}
            required
            sx={{ mr: 2, width: 150 }}
          >
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="mobile money">Mobile Money</MenuItem>
            <MenuItem value="card">Card</MenuItem>
          </TextField>
          <TextField label="Reference" name="reference" value={form.reference} onChange={handleChange} sx={{ mr: 2 }} />
          <Button type="submit" variant="contained">Submit</Button>
        </form>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Payment Records</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Guest</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Reference</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map(p => (
              <TableRow key={p._id}>
                <TableCell>{p.guestName}</TableCell>
                <TableCell>{p.roomNumber}</TableCell>
                <TableCell>${p.amount}</TableCell>
                <TableCell>{p.method}</TableCell>
                <TableCell>{p.reference}</TableCell>
                <TableCell>{new Date(p.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
export default Payments;