const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const { validateUser } = require('../middleware/validation');
const { auth } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

// Register
router.post('/register', authLimiter, validateUser, asyncHandler(async (req, res) => {
  const { username, password, role } = req.body;
  
  // Check if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new ApiError(400, 'Username already exists');
  }

  const saltRounds = 12;
  const hash = await bcrypt.hash(password, saltRounds);
  
  const user = new User({ 
    username, 
    password: hash, 
    role: role || 'guest' 
  });
  
  await user.save();
  
  res.status(201).json({ 
    message: 'User registered successfully',
    user: {
      id: user._id,
      username: user.username,
      role: user.role
    }
  });
}));

// Login
router.post('/login', authLimiter, asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    throw new ApiError(400, 'Username and password are required');
  }

  const user = await User.findOne({ username }).select('+password');
  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = jwt.sign(
    { id: user._id, role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: '24h' }
  );

  res.json({ 
    token, 
    user: {
      id: user._id,
      username: user.username, 
      role: user.role
    }
  });
}));

// Get current user
router.get('/me', auth, asyncHandler(async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      username: req.user.username,
      role: req.user.role
    }
  });
}));

// Logout (client-side token removal, but we can track it server-side if needed)
router.post('/logout', auth, asyncHandler(async (req, res) => {
  res.json({ message: 'Logged out successfully' });
}));

module.exports = router;