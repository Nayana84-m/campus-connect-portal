// Campus Connect Portal - RESTful API Backend Service (Experiment 6)
// Node.js & Express REST API supporting full CRUD operations, Middleware, and CORS

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// -------------------------------------------------------------
// 1. MIDDLEWARE SETUP
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
// 2. IN-MEMORY DATA STORE (Assignments Resource)
// -------------------------------------------------------------
let assignments = [
  {
    id: '1',
    title: 'Lab Assignment 2: React State Management',
    course: 'CS3301 - Full Stack',
    dueDate: '2026-09-12',
    status: 'Pending',
    submittedBy: 'RVU Student'
  },
  {
    id: '2',
    title: 'ER Diagram Project Report',
    course: 'CS3302 - DBMS',
    dueDate: '2026-09-01',
    status: 'Submitted',
    submittedBy: 'RVU Student'
  },
  {
    id: '3',
    title: 'RESTful API Server Implementation',
    course: 'CS3301 - Full Stack',
    dueDate: '2026-09-25',
    status: 'Pending',
    submittedBy: 'Nayana M'
  }
];

// -------------------------------------------------------------
// 3. RESTful API ROUTES (CRUD Operations)
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
app.get('/api/assignments', (req, res) => {
  res.status(200).json({
    success: true,
    count: assignments.length,
    data: assignments
  });
});

// READ SINGLE: GET /api/assignments/:id (Fetches single assignment by ID)
app.get('/api/assignments/:id', (req, res) => {
  const item = assignments.find((a) => a.id === req.params.id);
  if (!item) {
    return res.status(404).json({
      success: false,
      message: `Assignment with ID ${req.params.id} not found.`
    });
  }
  res.status(200).json({
    success: true,
    data: item
  });
});

// CREATE: POST /api/assignments (Creates a new assignment/submission)
app.post('/api/assignments', (req, res) => {
  const { title, course, dueDate, status, submittedBy } = req.body;

  if (!title || !course) {
    return res.status(400).json({
      success: false,
      message: 'Please provide title and course fields.'
    });
  }

  const newAssignment = {
    id: Date.now().toString(),
    title,
    course,
    dueDate: dueDate || new Date().toISOString().split('T')[0],
    status: status || 'Pending',
    submittedBy: submittedBy || 'RVU Student'
  };

  assignments.unshift(newAssignment);

  res.status(201).json({
    success: true,
    message: 'Assignment created successfully',
    data: newAssignment
  });
});

// UPDATE: PUT /api/assignments/:id (Updates status / details of an assignment)
app.put('/api/assignments/:id', (req, res) => {
  const index = assignments.findIndex((a) => a.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Assignment with ID ${req.params.id} not found.`
    });
  }

  const updatedAssignment = {
    ...assignments[index],
    ...req.body
  };

  assignments[index] = updatedAssignment;

  res.status(200).json({
    success: true,
    message: `Assignment ${req.params.id} updated successfully`,
    data: updatedAssignment
  });
});

// DELETE: DELETE /api/assignments/:id (Removes an assignment by ID)
app.delete('/api/assignments/:id', (req, res) => {
  const index = assignments.findIndex((a) => a.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Assignment with ID ${req.params.id} not found.`
    });
  }

  const deletedItem = assignments.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: `Assignment ${req.params.id} deleted successfully`,
    data: deletedItem
  });
});

// -------------------------------------------------------------
// 4. ERROR HANDLING & 404 MIDDLEWARE
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
// 5. SERVER PORT INITIALIZATION
// -------------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Campus Connect REST API Server running at http://localhost:${PORT}`);
});
