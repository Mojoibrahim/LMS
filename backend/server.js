require('dotenv').config(); //[cite: 4]
const express = require('express'); //[cite: 4]
const mongoose = require('mongoose'); //[cite: 4]
const cors = require('cors'); //[cite: 4]

// Import your  Staff routes here once createIndexes
// const StaffRoutes = requ Iire('./routes/authRoutes');
const authRoutes = require('./routes/authRoutes'); // ADDED: Import the auth routes[cite: 4]

const app = express(); //[cite: 4]

// Middleware
app.use(cors()); // Allows frontend React app to make requests to this API[cite: 4]
app.use(express.json()); // Parses incoming JSON payload (e.g., from POST/PUT request)[cite: 4]
app.use(express.urlencoded({extended:true})); // Parses URL-encoded data[cite: 4]

// Database Connection
const connectDB = async()=> {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI); //[cite: 4]
        console.log(`[Database] MongoDB connected Successfully on host: ${conn.connection.host}`); // Updated template literal backticks[cite: 4]
    } catch (error) {
        console.error(`[Database] Connection Error: ${error.message}`); // Updated template literal backticks[cite: 4]
        // Exit the Node process if the database connection fails to avoid silent errors
        process.exit(1); //[cite: 4]
    }
};

// Initialize connection
connectDB(); //[cite: 4]
// API Routes
// Mount your staff routes to a specific endpoint path
// app.use('/api/staff', staffRoutes);

// ADDED: Mount the auth routes to handle login and register requests
app.use('/api/auth', authRoutes); // Fixed: Added leading slash[cite: 4]

// Basic health check route to verify server is up
app.get('/', (req, res) => {
    res.status(200).json({message:'WorkApp System is running...'}); //[cite: 4]
});

// Catch-all routes for undefined endpoints
app.use((req, res, next) => {
    res.status(404).json({error: 'Endpoint not found'}); //[cite: 4]
});

// Global Error Hnandler (Catches errors thrown in routes)
app.use((err, req, res, next) => {
    console.error(err.stack); //[cite: 4]
    res.status(500).json({
        error:'Server Error', //[cite: 4]
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong' //[cite: 4]
    });
});

// Server Initialisation
const PORT = process.env.PORT || 5000; //[cite: 4]
app.listen(PORT, () => {
    console.log(`[Server] Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`); // Updated template literal backticks[cite: 4]
});