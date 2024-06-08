const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  quizSet: {
    type: String,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  correctAnswers: {
    type: Number,
    required: true,
  },
  wrongAnswers: {
    type: Number,
    required: true,
  },
  percentageScore: {
    type: Number,
    required: true,
  },
  resultMessage: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

module.exports = QuizResult;
