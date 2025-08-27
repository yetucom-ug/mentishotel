# Mentis Hotel Management System

A comprehensive hotel management system built with Node.js, Express, MongoDB, and React.

## Features

- **Room Management**: Track room availability, types, and pricing
- **Restaurant Management**: Menu management and order processing
- **Billing System**: Comprehensive billing with payment tracking
- **Room Service**: Handle guest service requests
- **Venue Booking**: Manage event venue reservations
- **Housekeeping**: Task management for cleaning staff
- **Reporting**: Generate reports for various operations
- **User Authentication**: Role-based access control
- **Invoice Generation**: Create and manage invoices

## Tech Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT Authentication
- Winston Logging
- Security middleware (Helmet, CORS, Rate Limiting)

### Frontend
- React 18
- Material-UI (MUI)
- React Router
- Axios for API calls
- Context API for state management

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
MONGO_URI=mongodb://localhost:27017/mentishotel
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
NODE_ENV=development
```

5. Start the development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Room Management
- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Create a new room
- `PUT /api/rooms/:id` - Update room
- `DELETE /api/rooms/:id` - Delete room

### Restaurant
- `GET /api/restaurant/menu` - Get menu items
- `POST /api/restaurant/menu` - Add menu item
- `GET /api/restaurant/orders` - Get all orders
- `POST /api/restaurant/order` - Place an order

### Billing & Payments
- `GET /api/billing` - Get all bills
- `POST /api/billing` - Create a bill
- `GET /api/payments` - Get all payments
- `POST /api/payments` - Record a payment

## Security Features

- **Rate Limiting**: Prevents abuse with configurable limits
- **Input Validation**: Comprehensive validation using express-validator
- **Data Sanitization**: Protection against NoSQL injection and XSS
- **Secure Headers**: Helmet.js for security headers
- **Password Hashing**: Bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication

## Deployment

### Production Environment

1. Set environment variables:
```env
NODE_ENV=production
MONGO_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
```

2. Build the frontend:
```bash
cd frontend
npm run build
```

3. Start the production server:
```bash
cd backend
npm start
```

### Docker Deployment

A Docker configuration can be added for containerized deployment.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please create an issue in the repository.