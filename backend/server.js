const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// ✅ Use cors package instead of manual headers
app.use(cors({
    origin: [
        'http://localhost:3000',            // local dev
        'https://healthsphereapp.netlify.app' // deployed frontend
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.url}`);
    next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Import routes
const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/health');

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Elderly Health API is running!' });
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🌐 Server URL: http://localhost:${PORT}`);
});
