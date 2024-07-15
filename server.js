const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const roleRoutes = require('./routes/role');
const userRoutes = require('./routes/user');
const menuRoutes = require('./routes/menu');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/menus', menuRoutes);

// Define the port
const PORT = process.env.PORT || 3000; // Default to port 3000 if not specified in environment variables

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
