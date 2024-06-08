const Question = require('../models/question');

exports.createQuestion = async (req, res) => {
  const { subjectName, quizSet, question, options, answer } = req.body;
  try {
    if (!subjectName || !quizSet || !question || !options || !answer) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newQuestion = new Question({ subjectName, quizSet, question, options, answer });
    const savedQuestion = await newQuestion.save();
    res.json({
      message: "Question saved successfully",
      question: savedQuestion
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getQuestions = async (req, res) => {
  const { subjectName, quizSet } = req.params;
  try {
    if (!subjectName || !quizSet) {
      return res.status(400).json({ message: "Subject name and quiz set are required." });
    }

    const questions = await Question.find({ subjectName, quizSet });
    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: "No questions found for the specified subject and quiz set." });
    }

    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
