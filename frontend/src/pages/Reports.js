import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Container, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

function Reports() {
  const [venueBookings, setVenueBookings] = useState([]);
  const [housekeeping, setHousekeeping] = useState([]);

  useEffect(() => {
    API.get("/venues/bookings").then(res => setVenueBookings(res.data));
    API.get("/housekeeping").then(res => setHousekeeping(res.data));
  }, []);

  const totalVenueRevenue = venueBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const completedTasks = housekeeping.filter(t => t.status === "completed").length;

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>Admin Reports</Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Venue Hiring Report</Typography>
        <Typography>Total Venue Bookings: {venueBookings.length}</Typography>
        <Typography>Total Venue Revenue: ${totalVenueRevenue}</Typography>
        <Table sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Venue</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Paid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {venueBookings.map(bk => (
              <TableRow key={bk._id}>
                <TableCell>{bk.venue?.name}</TableCell>
                <TableCell>{bk.customerName}</TableCell>
                <TableCell>{new Date(bk.startTime).toLocaleString()}</TableCell>
                <TableCell>{new Date(bk.endTime).toLocaleString()}</TableCell>
                <TableCell>${bk.totalAmount}</TableCell>
                <TableCell>{bk.paid ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Housekeeping Report</Typography>
        <Typography>Total Tasks: {housekeeping.length}</Typography>
        <Typography>Completed Tasks: {completedTasks}</Typography>
        <Table sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Room</TableCell>
              <TableCell>Assigned</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Completed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {housekeeping.map(task => (
              <TableRow key={task._id}>
                <TableCell>{task.roomNumber}</TableCell>
                <TableCell>{task.assignedTo}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{new Date(task.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  {task.completedAt ? new Date(task.completedAt).toLocaleString() : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
export default Reports;