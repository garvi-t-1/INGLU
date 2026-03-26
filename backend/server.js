const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: "https://inglu-1-5qoe.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());        // Parse incoming JSON request bodies
app.use(express.urlencoded({ extended: false }));

// ── Routes ──────────────────────────────────────────────────
app.use('/api/contacts', contactRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Contact Manager API is running' });
});

// ── Error Handler (must be last) ────────────────────────────
app.use(errorHandler);

// ── Start Server ────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});