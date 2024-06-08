// controllers/interviewController.js
const Interview = require('../models/interviews');

exports.addInterviewQuestions = async (req, res) => {
  try {
    const { subject, questions } = req.body;
    const interview = new Interview({ subject, questions });
    await interview.save();
    // res.status(201).json(interview);
    res.status(201).json({ message: `${subject} interview questions saved successfully`, interview });

  } catch (error) {
    console.error("Error adding interview questions:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// controllers/interviewController.js
exports.getInterviewQuestionsBySubject = async (req, res) => {
  try {
    const { subject } = req.params;
    const interview = await Interview.find({ subject });
    if (!interview) {
      return res.status(404).json({ message: `Interview questions not found for ${subject}` });
    }
    res.json(interview);
  } catch (error) {
    console.error("Error fetching interview questions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

