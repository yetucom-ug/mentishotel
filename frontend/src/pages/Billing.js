import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Paper, Container, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from "@mui/material";

function Billing() {
  const [bills, setBills] = useState([]);
  const [payingBill, setPayingBill] = useState(null);
  const [paymentForm, setPaymentForm] = useState({ amount: "", method: "cash", reference: "" });

  useEffect(() => {
    API.get("/billing").then(res => setBills(res.data));
  }, []);

  const handlePayClick = bill => {
    setPayingBill(bill);
    setPaymentForm({
      amount: bill.roomCharges, // or total amount
      method: "cash",
      reference: ""
    });
  };

  const handlePaymentChange = e => setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });

  const handlePaymentSubmit = async () => {
    // Step 1: Create payment
    const payment = await API.post("/payments", {
      guestName: payingBill.guestName,
      roomNumber: payingBill.roomNumber,
      amount: paymentForm.amount,
      method: paymentForm.method,
      reference: paymentForm.reference,
      bill: payingBill._id
    });
    // Step 2: Link payment to bill & mark as paid
    await API.patch(`/billing/${payingBill._id}/pay`, { paymentId: payment.data._id });
    setPayingBill(null);
    // Refresh bills
    API.get("/billing").then(res => setBills(res.data));
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5">Billing</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Guest Name</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Orders</TableCell>
              <TableCell>Room Charges</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Pay</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.map(bill => (
              <TableRow key={bill._id}>
                <TableCell>{bill.guestName}</TableCell>
                <TableCell>{bill.roomNumber}</TableCell>
                <TableCell>
                  {bill.orders.map(order => (
                    <div key={order._id}>
                      Order #{order._id.slice(-4)} ({order.items.length} items)
                    </div>
                  ))}
                </TableCell>
                <TableCell>${bill.roomCharges}</TableCell>
                <TableCell>
                  <Chip label={bill.paid ? "Paid" : "Unpaid"} color={bill.paid ? "success" : "warning"} />
                </TableCell>
                <TableCell>
                  {!bill.paid && (
                    <Button variant="contained" color="success" size="small" onClick={() => handlePayClick(bill)}>
                      Record Payment
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={!!payingBill} onClose={() => setPayingBill(null)}>
        <DialogTitle>Record Payment</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            name="amount"
            value={paymentForm.amount}
            onChange={handlePaymentChange}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="Payment Method"
            name="method"
            value={paymentForm.method}
            onChange={handlePaymentChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="mobile money">Mobile Money</MenuItem>
            <MenuItem value="card">Card</MenuItem>
          </TextField>
          <TextField
            label="Reference"
            name="reference"
            value={paymentForm.reference}
            onChange={handlePaymentChange}
            fullWidth
            margin="normal"
            helperText="Transaction ID for Mobile Money/Card"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPayingBill(null)}>Cancel</Button>
          <Button onClick={handlePaymentSubmit} variant="contained">Pay & Mark as Paid</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
export default Billing;