import React, { useEffect, useState } from "react";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, Chip, Container } from "@mui/material";
import API from "../services/api";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    API.get("/rooms").then(res => setRooms(res.data));
  }, []);

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Rooms</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map(room => (
              <TableRow key={room._id}>
                <TableCell>{room.number}</TableCell>
                <TableCell>{room.type}</TableCell>
                <TableCell>
                  <Chip label={room.status} color={
                    room.status === "available" ? "success" : room.status === "booked" ? "warning" : "error"
                  } />
                </TableCell>
                <TableCell>${room.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default Rooms;