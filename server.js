const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const quizResultRoutes = require('./routes/quizResultRoutes');
const adminRoutes = require('./routes/adminRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const bookingRoutes = require('./routes/Bookingroutes');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const DB = process.env.DATABASE;

mongoose.connect(DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.log("Database connected successfully");

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((error) => {
  console.error("Database connection failed:", error);
});

app.use('/api/questions', questionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/quizResults', quizResultRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api', bookingRoutes);

app.use('/api/admin', adminRoutes);
