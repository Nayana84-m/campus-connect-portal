// Campus Connect Portal backend service.
// Express API with MongoDB persistence, validation, middleware, and CORS.

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const Assignment = require('./models/Assignment');

const app = express();

// -------------------------------------------------------------
// Middleware setup
// -------------------------------------------------------------

// Enable CORS middleware for frontend integration (http://localhost:5173)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request body JSON parsing middleware
app.use(express.json());

// Custom Logger Middleware (logs HTTP method, URL, timestamp)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// -------------------------------------------------------------
// Assignment API routes
// -------------------------------------------------------------

// Root Endpoint - Server Status Check
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Campus Connect RESTful API Server',
    status: 'Server Operational',
    version: '1.0.0'
  });
});

// READ ALL: GET /api/assignments (Fetches list of all assignments)
app.get('/api/assignments', async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: assignments.length, data: assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch assignments', error: error.message });
  }
});

// READ SINGLE: GET /api/assignments/:id (Fetches single assignment by ID)
app.get('/api/assignments/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ success: false, message: 'Assignment not found' });
    res.status(200).json({ success: true, data: assignment });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid assignment ID' });
  }
});

// CREATE: POST /api/assignments (Creates a new assignment/submission)
app.post('/api/assignments', async (req, res) => {
  try {
    const { title, course, dueDate, status, submittedBy } = req.body;
    if (!title || !course) return res.status(400).json({ success: false, message: 'Title and course are required' });
    const assignment = await Assignment.create({ title, course, dueDate, status, submittedBy });
    res.status(201).json({ success: true, message: 'Assignment created successfully', data: assignment });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create assignment', error: error.message });
  }
});

// UPDATE: PUT /api/assignments/:id (Updates status / details of an assignment)
app.put('/api/assignments/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!assignment) return res.status(404).json({ success: false, message: 'Assignment not found' });
    res.status(200).json({ success: true, message: 'Assignment updated successfully', data: assignment });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update assignment', error: error.message });
  }
});

// SUBMIT ASSIGNMENT: PUT /api/assignments/:id/submit (Specifically for Ma'am's syllabus route)
app.put('/api/assignments/:id/submit', async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, { status: 'Submitted' }, { new: true, runValidators: true });
    if (!assignment) return res.status(404).json({ success: false, message: 'Assignment not found' });
    res.status(200).json({ success: true, message: 'Assignment marked as submitted', data: assignment });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to submit assignment', error: error.message });
  }
});

// DELETE: DELETE /api/assignments/:id (Removes an assignment by ID)
app.delete('/api/assignments/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) return res.status(404).json({ success: false, message: 'Assignment not found' });
    res.status(200).json({ success: true, message: 'Assignment deleted successfully', data: assignment });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to delete assignment', error: error.message });
  }
});

// -------------------------------------------------------------
// Error handling and 404 middleware
// -------------------------------------------------------------
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl} - Endpoint Not Found`
  });
});

app.use((err, req, res, next) => {
  console.error('Uncaught Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message
  });
});

// -------------------------------------------------------------
// Server initialization
// -------------------------------------------------------------
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Campus Connect REST API Server running on port ${PORT}`);
  });
};

startServer();
