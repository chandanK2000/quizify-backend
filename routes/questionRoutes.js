const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Create a new question
router.post('/', questionController.createQuestion);

// Fetch questions by category and set
router.get('/:subjectName/:quizSet', questionController.getQuestions);

module.exports = router;
