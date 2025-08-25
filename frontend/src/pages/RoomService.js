import React, { useState, useEffect } from "react";
import API from "../services/api";
import { Container, Typography, Paper, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, Chip } from "@mui/material";

function RoomService() {
  const [form, setForm] = useState({ roomNumber: "", guestName: "", request: "" });
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = () => {
    setLoading(true);
    API.get("/roomservice").then(res => {
      setRequests(res.data);
      setLoading(false);
    });
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await API.post("/roomservice", form);
    setForm({ roomNumber: "", guestName: "", request: "" });
    fetchRequests();
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom>Request Room Service</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Room Number" name="roomNumber" value={form.roomNumber} onChange={handleChange} required sx={{ mr: 2 }} />
          <TextField label="Guest Name" name="guestName" value={form.guestName} onChange={handleChange} sx={{ mr: 2 }} />
          <TextField label="Request" name="request" value={form.request} onChange={handleChange} required sx={{ mr: 2, width: 300 }} />
          <Button type="submit" variant="contained">Submit</Button>
        </form>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Service Requests</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Room</TableCell>
              <TableCell>Guest</TableCell>
              <TableCell>Request</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Requested At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map(r => (
              <TableRow key={r._id}>
                <TableCell>{r.roomNumber}</TableCell>
                <TableCell>{r.guestName}</TableCell>
                <TableCell>{r.request}</TableCell>
                <TableCell>
                  <Chip label={r.status} color={
                    r.status === "pending" ? "warning" :
                    r.status === "in-progress" ? "info" : "success"
                  } />
                </TableCell>
                <TableCell>{new Date(r.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
export default RoomService;