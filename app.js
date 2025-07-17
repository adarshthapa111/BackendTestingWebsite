const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const addFeature = require('./routes/featureRoute')
const addTestCase = require('./routes/testRoute');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define routes (e.g., for features and test cases)
app.use('/api/features', addFeature);
app.use('/api/testcases', addTestCase);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));