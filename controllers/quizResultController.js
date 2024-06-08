const QuizResult = require('../models/QuizResult');

exports.saveQuizResult = async (req, res) => {
  try {
    const {
      userId,
      subjectName,
      quizSet,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      percentageScore,
      resultMessage,
      dateTime,
      name,
      email
    } = req.body;

    const quizResult = new QuizResult({
      userId,
      subjectName,
      quizSet,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      percentageScore,
      resultMessage,
      dateTime,
      name,
      email
    });

    console.log('Received data:', req.body);
    // console.log(quizResult);

    await quizResult.save();

    console.log('Quiz result saved successfully:', quizResult);

    res.status(201).json({
      message: `Quiz result for ${subjectName} (${quizSet}) saved successfully.`
    });

  } catch (error) {
    console.error('Error saving quiz result:', error);
    res.status(500).json({ message: 'Internal server error. Failed to save quiz result.' });
  }
};

exports.getQuizResults = async (req, res) => {
  try {
    const { userId } = req.query;  // Get userId from query parameters

    const quizResults = await QuizResult.find({ userId });

    if (quizResults.length === 0) {
      return res.status(404).json({ message: 'No quiz results found for the specified user.' });
    }

    res.status(200).json(quizResults);
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    res.status(500).json({ message: 'Internal server error. Failed to fetch quiz results.' });
  }
};

exports.getQuizResultsBySubjectAndSet = async (req, res) => {
  try {
    let { subjectName, quizSet } = req.params;
    const { userId } = req.query;  // Get userId from query parameters

    // Convert subjectName and quizSet to lowercase for case-insensitive comparison
    subjectName = subjectName.toLowerCase();
    quizSet = quizSet.toLowerCase();

    const quizResults = await QuizResult.find({
      userId,  // Filter by userId
      subjectName: { $regex: new RegExp(subjectName, 'i') },
      quizSet: { $regex: new RegExp(quizSet, 'i') }
    });

    if (quizResults.length === 0) {
      return res.status(404).json({ message: `No quiz results found for ${subjectName} - Set ${quizSet} for the specified user.` });
    }

    res.status(200).json(quizResults);
  } catch (error) {
    console.error('Error fetching quiz results by subject and set:', error);
    res.status(500).json({ message: 'Internal server error. Failed to fetch quiz results.' });
  }
};



//for delete quiz history 
exports.deleteQuizResult = async (req, res) => {
  try {
    const { userId, subjectName, quizSet, _id } = req.query;

    // Delete quiz result based on userId, subjectName, quizSet, and _id
    const result = await QuizResult.deleteOne({ _id, userId, subjectName, quizSet });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Quiz result not found or already deleted.' });
    }

    res.status(200).json({ message: 'Quiz result deleted successfully.' });
  } catch (error) {
    console.error('Error deleting quiz result:', error);
    res.status(500).json({ message: 'Internal server error. Failed to delete quiz result.' });
  }
};