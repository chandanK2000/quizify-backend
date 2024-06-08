// models/Interview.js
const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  questions: [
    {
      question: {
        type: String,
        required: true
      },
      answer: {
        type: String,
        required: true
      }
    }
  ]
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
