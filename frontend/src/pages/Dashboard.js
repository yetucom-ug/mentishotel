import React from "react";
import { Typography, Container, Grid, Paper, Box } from "@mui/material";
import { 
  Hotel, 
  Restaurant, 
  Payment, 
  CleaningServices,
  TrendingUp 
} from "@mui/icons-material";
import { useApi } from "../hooks/useApi";
import LoadingSpinner from "../components/LoadingSpinner";

function Dashboard() {
  const { data: rooms, loading: roomsLoading } = useApi('/rooms');
  const { data: orders, loading: ordersLoading } = useApi('/restaurant/orders');
  const { data: payments, loading: paymentsLoading } = useApi('/payments');
  const { data: housekeeping, loading: housekeepingLoading } = useApi('/housekeeping');

  if (roomsLoading || ordersLoading || paymentsLoading || housekeepingLoading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  const stats = [
    {
      title: 'Total Rooms',
      value: rooms?.length || 0,
      icon: <Hotel sx={{ fontSize: 40 }} />,
      color: '#1976d2'
    },
    {
      title: 'Pending Orders',
      value: orders?.filter(o => o.status === 'pending').length || 0,
      icon: <Restaurant sx={{ fontSize: 40 }} />,
      color: '#ed6c02'
    },
    {
      title: 'Today\'s Revenue',
      value: `$${payments?.reduce((sum, p) => sum + p.amount, 0) || 0}`,
      icon: <Payment sx={{ fontSize: 40 }} />,
      color: '#2e7d32'
    },
    {
      title: 'Housekeeping Tasks',
      value: housekeeping?.filter(h => h.status !== 'completed').length || 0,
      icon: <CleaningServices sx={{ fontSize: 40 }} />,
      color: '#9c27b0'
    }
  ];

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Mentis Hotel Management System
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 4 }}>
        Here's an overview of your hotel operations
      </Typography>
      
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4
                }
              }}
            >
              <Box sx={{ color: stat.color }}>
                {stat.icon}
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {stat.title}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
              Quick Actions
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Navigate to different sections using the menu above to manage your hotel operations efficiently.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              System Status
            </Typography>
            <Typography variant="body2" color="success.main">
              ✓ All systems operational
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Last updated: {new Date().toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;