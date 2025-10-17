require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const studentsRouter = require('./routes/students');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // parse application/json

// Routes
app.use('/students', studentsRouter);

// Health
app.get('/', (req, res) => res.send({ status: 'ok', timestamp: new Date() }));

// DB connect + start server
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/studentdb';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error', err);
  process.exit(1);
});
