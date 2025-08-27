import React from "react";
import { Typography, Container } from "@mui/material";

function Dashboard() {
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4">Welcome to Mentis Hotel!</Typography>
      <Typography sx={{ mt: 2 }}>This is your main dashboard.</Typography>
    </Container>
  );
}

export default Dashboard;