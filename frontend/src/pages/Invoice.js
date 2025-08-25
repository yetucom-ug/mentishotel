import React, { useEffect, useState } from "react";
import API from "../services/api";
import {
  Container, Typography, Paper, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody
} from "@mui/material";

function Invoice() {
  const [invoices, setInvoices] = useState([]);
  const [form, setForm] = useState({
    customerName: "", customerContact: "", items: [{ description: "", quantity: 1, unitPrice: 0, total: 0 }]
  });

  useEffect(() => {
    API.get("/invoices").then(res => setInvoices(res.data));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleItemChange = (idx, field, val) => {
    const items = [...form.items];
    items[idx][field] = val;
    if (field === "quantity" || field === "unitPrice") {
      items[idx].total = (items[idx].quantity || 0) * (items[idx].unitPrice || 0);
    }
    setForm({ ...form, items });
  };

  const addItem = () => setForm({ ...form, items: [...form.items, { description: "", quantity: 1, unitPrice: 0, total: 0 }] });

  const handleSubmit = async e => {
    e.preventDefault();
    await API.post("/invoices", form);
    setForm({ customerName: "", customerContact: "", items: [{ description: "", quantity: 1, unitPrice: 0, total: 0 }] });
    API.get("/invoices").then(res => setInvoices(res.data));
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5">Create Invoice</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Customer Name" name="customerName" value={form.customerName} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Customer Contact" name="customerContact" value={form.customerContact} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <Typography variant="subtitle1">Items</Typography>
          {form.items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <TextField label="Description" value={item.description} onChange={e => handleItemChange(idx, "description", e.target.value)} sx={{ flex: 2 }} />
              <TextField type="number" label="Qty" value={item.quantity}
                onChange={e => handleItemChange(idx, "quantity", parseInt(e.target.value) || 0)} sx={{ width: 80 }} />
              <TextField type="number" label="Unit Price" value={item.unitPrice}
                onChange={e => handleItemChange(idx, "unitPrice", parseFloat(e.target.value) || 0)} sx={{ width: 120 }} />
              <TextField type="number" label="Total" value={item.total} InputProps={{ readOnly: true }} sx={{ width: 120 }} />
            </div>
          ))}
          <Button onClick={addItem} sx={{ mb: 2 }}>Add Item</Button>
          <Button type="submit" variant="contained">Save Invoice</Button>
        </form>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Invoices</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice #</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Issued</TableCell>
              <TableCell>Paid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map(inv => (
              <TableRow key={inv._id}>
                <TableCell>{inv.invoiceNumber}</TableCell>
                <TableCell>{inv.customerName}</TableCell>
                <TableCell>{inv.customerContact}</TableCell>
                <TableCell>
                  {inv.items.map((it, idx) => (
                    <div key={idx}>{it.description} x{it.quantity} @ ${it.unitPrice} = ${it.total}</div>
                  ))}
                </TableCell>
                <TableCell>${inv.totalAmount}</TableCell>
                <TableCell>{new Date(inv.issuedAt).toLocaleString()}</TableCell>
                <TableCell>{inv.paid ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
export default Invoice;