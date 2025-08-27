const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' });

// Import routes
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
// ... other route imports

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo connected'))
  .catch(err => { console.error(err); process.exit(1); });

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
// ... other API routes

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Error middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(process.env.PORT || 5000, () => console.log('Server running'));