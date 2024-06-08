const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true
  },
  quizSet: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Question', QuestionSchema);
