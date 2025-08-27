import React, { useEffect, useState } from "react";
import API from "../services/api";
import {
  Container, Typography, Paper, TextField, Button, MenuItem,
  Table, TableHead, TableRow, TableCell, TableBody, Chip
} from "@mui/material";

function Housekeeping() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    roomNumber: "", assignedTo: "", notes: ""
  });

  useEffect(() => {
    API.get("/housekeeping").then(res => setTasks(res.data));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await API.post("/housekeeping", form);
    setForm({ roomNumber: "", assignedTo: "", notes: "" });
    API.get("/housekeeping").then(res => setTasks(res.data));
  };

  const handleStatus = async (id, status) => {
    await API.patch(`/housekeeping/${id}`, { status });
    API.get("/housekeeping").then(res => setTasks(res.data));
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom>Housekeeping Tasks</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Room Number" name="roomNumber"
            value={form.roomNumber} onChange={handleChange} required sx={{ mr: 2, width: 120 }} />
          <TextField label="Assigned Staff" name="assignedTo"
            value={form.assignedTo} onChange={handleChange} sx={{ mr: 2, width: 180 }} />
          <TextField label="Notes/Task" name="notes"
            value={form.notes} onChange={handleChange} sx={{ mr: 2, width: 260 }} />
          <Button type="submit" variant="contained">Add Task</Button>
        </form>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Task List</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Room</TableCell>
              <TableCell>Assigned</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map(task => (
              <TableRow key={task._id}>
                <TableCell>{task.roomNumber}</TableCell>
                <TableCell>{task.assignedTo}</TableCell>
                <TableCell>{task.notes}</TableCell>
                <TableCell>
                  <Chip label={task.status}
                    color={task.status === "pending" ? "warning" : task.status === "in-progress" ? "info" : "success"} />
                </TableCell>
                <TableCell>{new Date(task.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  {task.completedAt ? new Date(task.completedAt).toLocaleString() : "-"}
                </TableCell>
                <TableCell>
                  {task.status !== "completed" && (
                    <>
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ mr: 1 }}
                        onClick={() => handleStatus(task._id, "in-progress")}
                        disabled={task.status === "in-progress"}
                      >Start</Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => handleStatus(task._id, "completed")}
                      >Complete</Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
export default Housekeeping;