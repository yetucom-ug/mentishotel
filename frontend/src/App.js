import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import RestaurantMenu from './pages/RestaurantMenu';
import Orders from './pages/Orders';
import Billing from './pages/Billing';
import RoomService from './pages/RoomService';
import Payments from './pages/Payments';
import VenueBooking from './pages/VenueBooking';
import Housekeeping from './pages/Housekeeping';
import Reports from './pages/Reports';
import HotelDetails from './pages/HotelDetails';
import Invoice from './pages/Invoice';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <NotificationProvider>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={
                <ProtectedRoute>
                  <Navbar />
                  <main className="App-main">
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/rooms" element={<Rooms />} />
                      <Route path="/restaurant" element={<RestaurantMenu />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/billing" element={<Billing />} />
                      <Route path="/roomservice" element={<RoomService />} />
                      <Route path="/payments" element={<Payments />} />
                      <Route path="/venue-booking" element={<VenueBooking />} />
                      <Route path="/housekeeping" element={<Housekeeping />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/hotel-details" element={<HotelDetails />} />
                      <Route path="/invoices" element={<Invoice />} />
                    </Routes>
                  </main>
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;