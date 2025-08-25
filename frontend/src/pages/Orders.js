import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Paper, Container, Chip } from "@mui/material";

function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    API.get("/restaurant/orders").then(res => setOrders(res.data));
  }, []);
  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5">Restaurant Orders</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Guest Name</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order._id}>
                <TableCell>{order.guestName}</TableCell>
                <TableCell>{order.roomNumber}</TableCell>
                <TableCell>
                  {order.items.map(i => (
                    <div key={i.menuItem?._id}>
                      {i.menuItem?.name} x {i.quantity}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  <Chip label={order.status} color={
                    order.status === "pending" ? "warning" : order.status === "served" ? "info" : "success"
                  } />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
export default Orders;