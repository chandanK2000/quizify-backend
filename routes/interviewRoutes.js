const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');

router.post('/', interviewController.addInterviewQuestions);
router.get('/:subject', interviewController.getInterviewQuestionsBySubject);

module.exports = router;
