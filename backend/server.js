const compression = require('compression');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

dotenv.config();

// ✅ Initialize app before any middleware
const app = express();

// ✅ Use middleware
app.use(helmet());           // Security headers
app.use(cors());             // Enable CORS
app.use(express.json());     // Parse JSON
app.use(compression());      // Compress responses

// ✅ Routes
app.use('/api/books', require('./routes/bookRoutes'));

// ✅ Temporary test route for GZIP compression verification
app.get('/api/test-big', (req, res) => {
  const bigPayload = Array(500).fill({ title: "Test", author: "Many" });
  res.json(bigPayload);
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { dbName: "bookDB" })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// ✅ Start server
app.listen(5000, () => console.log("Server running on port 5000"));
