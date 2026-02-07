const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const todoRoutes = require('./routes/todos');
const { healthCheck, metrics } = require('./middleware/monitoring');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Monitoring endpoints
app.get('/health', healthCheck);
app.get('/metrics', metrics);

// API routes
app.use('/api/todos', todoRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Todo List API - Agile DevOps Demonstration',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      metrics: '/metrics',
      todos: '/api/todos'
    }
  });
});

// Error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
