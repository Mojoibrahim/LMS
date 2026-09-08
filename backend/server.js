require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import your  Staff routes here once createIndexes
// const StaffRoutes = requ Iire('./routes/authRoutes');
const authRoutes = require('./routes/authRoutes'); // ADDED: Import the auth routes

const app = express();

// Middleware
app.use(cors()); // Allows frontend React app to make requests to this API
app.use(express.json()); // Parses incoming JSON payload (e.g., from POST/PUT request)
app.use(express.urlencoded({extended:true})); // Parses URL-encoded data

// Database Connection
const connectDB = async()=> {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('[Database] MongoDB connected Successfully on host: ${conn.connection.host}');
    } catch (error) {
        console.error('[Database] Connection Error: ${error.message}');
        // Exit the Node process if the database connection fails to avoid silent errors
        process.exit(1);
    }
};

// Initialize connection
connectDB();
// API Routes
// Mount your staff routes to a specific endpoint path
// app.use('/api/staff', staffRoutes);

// ADDED: Mount the auth routes to handle login and register requests
app.use('api/auth', authRoutes);

// Basic health check route to verify server is up
app.get('/', (req, res) => {
    res.status(200).json({message:'WorkApp System is running...'});
});

// Catch-all routes for undefined endpoints
app.use((req, res, next) => {
    res.status(404).json({error: 'Endpoint not found'});
});

// Global Error Hnandler (Catches errors thrown in routes)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error:'Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// Server Initialisation
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('[Server] Server is running in ${process.env.NODE_ENV} mode on port ${PORT}');
});