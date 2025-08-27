import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import API from "../services/api";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      window.location = "/";
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <Container sx={{ mt: 4 }} maxWidth="xs">
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            fullWidth
            margin="normal"
            value={form.username}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;