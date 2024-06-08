const express = require('express');
const router = express.Router();
const quizResultController = require('../controllers/quizResultController');

router.post('/', quizResultController.saveQuizResult);
router.get('/', quizResultController.getQuizResults);  // Fetch all results for a user
router.get('/:subjectName/:quizSet', quizResultController.getQuizResultsBySubjectAndSet);  // Fetch specific results for a user

router.delete('/', quizResultController.deleteQuizResult); // Delete a quiz result

module.exports = router;
