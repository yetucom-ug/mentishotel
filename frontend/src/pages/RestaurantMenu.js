import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Paper, Container } from "@mui/material";

function RestaurantMenu() {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    API.get("/restaurant/menu").then(res => setMenu(res.data));
  }, []);
  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5">Restaurant Menu</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menu.map(item => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>${item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
export default RestaurantMenu;