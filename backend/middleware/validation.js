const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

const validateUser = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  body('role')
    .optional()
    .isIn(['admin', 'reception', 'staff', 'guest'])
    .withMessage('Invalid role'),
  handleValidationErrors
];

const validateRoom = [
  body('number')
    .isInt({ min: 1 })
    .withMessage('Room number must be a positive integer'),
  body('type')
    .notEmpty()
    .withMessage('Room type is required')
    .isLength({ max: 50 })
    .withMessage('Room type must be less than 50 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('status')
    .optional()
    .isIn(['available', 'booked', 'maintenance'])
    .withMessage('Invalid room status'),
  handleValidationErrors
];

const validateMenuItem = [
  body('name')
    .notEmpty()
    .withMessage('Menu item name is required')
    .isLength({ max: 100 })
    .withMessage('Name must be less than 100 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),
  body('category')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Category must be less than 50 characters'),
  handleValidationErrors
];

const validatePayment = [
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be greater than 0'),
  body('method')
    .isIn(['cash', 'mobile money', 'card'])
    .withMessage('Invalid payment method'),
  body('guestName')
    .notEmpty()
    .withMessage('Guest name is required')
    .isLength({ max: 100 })
    .withMessage('Guest name must be less than 100 characters'),
  body('roomNumber')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Room number must be a positive integer'),
  handleValidationErrors
];

module.exports = {
  validateUser,
  validateRoom,
  validateMenuItem,
  validatePayment,
  handleValidationErrors
};